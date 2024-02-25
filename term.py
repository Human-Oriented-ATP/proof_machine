from weakref import WeakValueDictionary
from collections import defaultdict
from helpers import UnionFind
import heapq

class Term:
    def subterms(self):
        s = set()
        self.collect_subterms(s)
        return s
    def subst(self, subst):
        if not isinstance(subst, Substitution): subst = Substitution(subst)
        return subst(self)
    def fresh_var_copy(self):
        return self.subst({ v : TermVar(v.name) for v in self.free_vars })
    def __repr__(self):
        assert isinstance(self, TermApp) or isinstance(self, TermVar)
        return "Term({})".format(self)
    @property
    def is_numeric(self):
        return isinstance(self, TermApp) and not self.args and isinstance(self.f, int)

class TermApp(Term):
    _cache = WeakValueDictionary()

    def __new__(self, f, args):
        args = tuple(args)
        res = TermApp._cache.get((f, args))
        if res is not None: return res
        res = super().__new__(TermApp)

        res.f = f
        res.args = args
        res._free_vars = None
        TermApp._cache[f,args] = res
        return res

    def __str__(self):
        if len(self.args) == 0: return str(self.f)
        else: return self.f + '(' + ','.join(map(str, self.args)) + ')'

    @property
    def free_vars(self):
        if self._free_vars is None:
            self._free_vars = frozenset().union(*(t.free_vars for t in self.args))
        return self._free_vars

    def collect_subterms(self, s):
        if self in s: return
        s.add(self)
        for arg in self.args: arg.collect_subterms(s)

    @staticmethod
    def next_numeric():
        res = 0
        for t in TermApp._cache.values():
            if t.is_numeric:
                res = max(res, t.f+1)
        return res

class TermVar(Term):
    _cache = WeakValueDictionary()

    def __init__(self, name):
        assert isinstance(name, str), name
        self.name = name
        self.free_vars = frozenset((self,))

    def __str__(self):
        return self.name

    def collect_subterms(self, s):
        s.add(self)

    @staticmethod
    def cached(name):
        res = TermVar._cache.get(name)
        if res is None:
            res = TermVar(name)
            TermVar._cache[name] = res
        return res

class Substitution:
    def __init__(self, d):
        self.cache = dict()
        self.d = d
    def __call__(self, t):
        res = self.cache.get(t)
        if res is not None: return res
        res = self.d.get(t)
        if res is None:
            if isinstance(t, TermApp):
                res = TermApp(t.f, tuple(self(arg) for arg in t.args))
            else:
                res = t
        self.cache[t] = res
        return res

def unify(to_merge):
    processed = set()
    res = dict()
    revdep = defaultdict(set)
    def sanity_check():
        res_vars = set(res.keys())
        res_vvars = set().union(*(x.free_vars for x in res.values()))
        assert not (res_vars & res_vvars), (res_vars, res_vvars, res_vars & res_vvars)
        for v,x in res.items():
            for vv in x.free_vars:
                assert v in revdep[vv]
            for vv,s in revdep.items():
                for v in s:
                    assert vv in res[v].free_vars
    uf = UnionFind()
    while to_merge:
        a,b = to_merge.pop()
        if (a,b) in processed: continue
        processed.add((a,b))
        a = uf.root(a)
        b = uf.root(b)
        processed.add((a,b))
        a = res.get(a,a)
        b = res.get(b,b)
        if a == b: continue
        if isinstance(b, TermVar) and not isinstance(a, TermVar):
            a,b = b,a
        if isinstance(b, TermVar):
            uf.join(a,b)
        elif isinstance(a, TermVar):
            b = b.subst(res)
            a_cl = set(uf.get_class(a))
            strict_rev = set().union(*(revdep[a_eq] for a_eq in a_cl))
            all_rev = a_cl | strict_rev
            occur_check = not (all_rev & b.free_vars)
            if occur_check:
                for b_var in b.free_vars:
                    revdep[b_var].update(all_rev)
                cur_subst_d = {
                    a_eq : b
                    for a_eq in a_cl
                }
                res.update(cur_subst_d)
                cur_subst = Substitution(cur_subst_d)
                for rev in strict_rev:
                    res[rev] = cur_subst(res[rev])
                for a_eq in a_cl:
                    revdep[a_eq] = set()

                res_vars = set(res.keys())
                res_vvars = set().union(*(x.free_vars for x in res.values()))

        elif a.f == b.f and len(a.args) == len(b.args):
            to_merge.extend(zip(a.args, b.args))

    uf_subst_d = {}
    for root, elems in uf.iter_classes():
        if root not in res:
            for el in elems:
                if el != root:
                    uf_subst_d[el] = root
    uf_subst = Substitution(uf_subst_d)
    res = { v : uf_subst(x) for v,x in res.items() }
    for v,x in uf_subst_d.items():
        res.setdefault(v,x)
    return res

# we need to systematically assign numbers to terms for TIM
def enumerate_terms(terms, start):
    # print("Enumerate terms:")
    # print("terms = [")
    # for term in terms:
    #     print(f"    parse_term(\"{term}\"),")
    # print(']')
    family = set()
    for term in terms:
        assert not term.free_vars
        term.collect_subterms(family)
    res = {
        t : t.f
        for t in family
        if t.is_numeric
    }

    # always take the smallest active element
    heap = []
    term_to_num_missing = dict()
    def set_num_missing(t, n):
        term_to_num_missing[t] = n
        if n == 0:
            score = (t.f, [res[arg] for arg in t.args])
            heapq.heappush(heap, (score, t))

    arg_to_parents = defaultdict(list)
    for t in family:
        if t.is_numeric: continue
        for arg in t.args: arg_to_parents[arg].append(t)
        set_num_missing(t, sum(1 for arg in t.args if arg not in res))

    cur = start
    while heap:
        _, t = heapq.heappop(heap)
        res[t] = cur
        cur += 1
        for parent in arg_to_parents[t]:
            set_num_missing(parent, term_to_num_missing[parent]-1)

    return res

class Inference:
    def __init__(self, goals, requirements):
        self.goals = goals
        self.requirements = requirements

    def __str__(self):
        return ', '.join(map(str, self.goals)) + ' :- ' + ', '.join(map(str, self.requirements))

    @property
    def free_vars(self):
        res = set()
        for x in self.goals: res.update(x.free_vars)
        for x in self.requirements: res.update(x.free_vars)
        return res
    def fresh_var_copy(self):
        subst = Substitution({
            v : TermVar(v.name)
            for v in self.free_vars
        })
        return Inference(
            goals = [subst(x) for x in self.goals],
            requirements = [subst(x) for x in self.requirements],
        )
