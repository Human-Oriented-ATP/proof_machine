import GadgetGameSolver.Jovan.Term


namespace JovanGadgetGame.DiscrTree

structure Function where
  f       : String
  numArgs : Nat
  deriving BEq

inductive Key where
| star (idx : Nat)
| app (f : Function)

inductive Trie (α : Type) where
| node
  (stars    : Lean.AssocList Nat (Trie α))
  (children : Lean.AssocList Function (Trie α))
  (values   : Array α)
deriving Inhabited

end DiscrTree

structure CellColour where
  f       : String
  numArgs : Nat
  deriving BEq, Hashable

open DiscrTree

structure DiscrTree (α : Type) where
  root : Std.HashMap CellColour (Trie α) := {}
namespace DiscrTree

section Encode

class DiscrTreeEntry (α : Type) where
  LazyEntry  : Type
  cellColour : α → CellColour
  init       : α → LazyEntry
  next       : LazyEntry → Option (Key × LazyEntry)

export DiscrTree.DiscrTreeEntry (LazyEntry cellColour init next)

/-- A `LazyExprEntry` represents a snapshot of the computation of encoding an `Expr` as `Array Key`.
This is used for computing the keys one by one. -/
structure LazyExprEntry where
  /-- The stack, used to emulate recursion. -/
  stack    : List Expr
  /-- The `MVarId` assignments for converting into `.star` keys. -/
  stars    : Lean.AssocList MVarId Key := {}
  /-- The number to be used for the next new `.star` key. -/
  nStars   : Nat := 0


def pushExpr (e : Expr) (entry : LazyExprEntry) : Key × LazyExprEntry :=
  match e with
  | .app f args =>
    let key := .app { f, numArgs := args.size }
    let stack := args.toList ++ entry.stack
    let entry := { entry with stack }
    (key, entry)
  | .mvar mvarId =>
    match entry.stars.find? mvarId with
    | some key => (key, entry)
    | none =>
      let key := .star entry.nStars
      let entry := { entry with nStars := entry.nStars + 1, stars := entry.stars.insert mvarId key }
      (key, entry)

@[inline]
def LazyExprEntry.next (entry : LazyExprEntry) : Option (Key × LazyExprEntry) :=
  match entry.stack with
  | [] => none
  | e :: stack =>
    let entry := { entry with stack }
    pushExpr e entry

@[inline]
instance : DiscrTreeEntry Cell where
  LazyEntry    := LazyExprEntry
  cellColour c := { f := c.f, numArgs := c.args.size }
  init c       := { stack := c.args.toList }
  next entry   := entry.next

@[inline]
instance : DiscrTreeEntry AbstractedCell where
  LazyEntry    := List AbstractedExpr
  cellColour c := { f := c.f, numArgs := c.args.size }
  init c       := c.args.toList
  next
    | []                   => none
    | .mvar idx   :: stack => some (.star idx, stack)
    | .app f args :: stack => some (.app { f, numArgs := args.size }, args.toList ++ stack)

end Encode

variable {α : Type}

section Insert

variable {β : Type} [DiscrTreeEntry β]

@[specialize] partial def Trie.mkNew (entry : LazyEntry β) (v : α) : Trie α :=
  match next entry with
  | none              => .node {} {} #[v]
  | some (key, entry) =>
    let trie := Trie.mkNew entry v
    match key with
    | .star idx => .node (.insert {} idx trie) {} #[]
    | .app f    => .node {} (.insert {} f trie) #[]

@[specialize] partial def Trie.insert (entry : LazyEntry β) (v : α) : Trie α → Trie α
| .node stars children values =>
  match next entry with
  | none              => .node stars children (values.push v)
  | some (key, entry) =>
    match key with
    | .star idx =>
      let (trie, stars) :=
        match stars.find? idx with
        | some trie =>
          let stars := stars.erase idx -- use value linearly, for performance
          (trie.insert entry v, stars)
        | none =>
          (Trie.mkNew entry v, stars)
      .node (stars.insert idx trie) children values
    | .app f =>
      let (trie, children) :=
        match children.find? f with
        | some trie =>
          let children := children.erase f -- use value linearly, for performance
          (trie.insert entry v, children)
        | none =>
          (Trie.mkNew entry v, children)
      .node stars (children.insert f trie) values

@[specialize] def insert (c : β) (v : α) (tree : DiscrTree α) : DiscrTree α :=
  let { root } := tree
  let colour := cellColour c
  let entry := init c
  let (trie, root) :=
    match root[colour]? with
    | some trie =>
      let root := root.erase colour -- use value lineraly, for performance
      (trie.insert entry v, root)
    | none =>
      (Trie.mkNew entry v, root)
  { root := root.insert colour trie }


def insertCell (c : Cell) (v : α) (tree : DiscrTree α) : DiscrTree α :=
  insert c v tree

def insertAbstractedCell (c : AbstractedCell) (v : α) (tree : DiscrTree α) : DiscrTree α :=
  insert c v tree

end Insert

structure PartialMatch where
  assignments : Lean.RBMap Nat Expr compare := {}
  todo        : List Expr

partial def getMatchLoop (p : PartialMatch) (results : Array α) (trie : Trie α) : Array α :=
  let .node stars children values := trie
  match p.todo with
  | []        => results ++ values
  | e :: todo =>
    let p := { p with todo }
    /- star matches -/
    let results := stars.foldl (init := results) fun results idx trie =>
      match p.assignments.find? idx with
      | none =>
        let p := { p with assignments := p.assignments.insert idx e }
        getMatchLoop p results trie
      | some e' =>
        if e' == e then
          getMatchLoop p results trie
        else
          results
    match e with
    | .mvar _ => results
    | .app f args =>
      /- constant matches -/
      let f : Function := { f, numArgs := args.size }
      match children.find? f with
      | some trie =>
        let p := { p with todo := args.toList ++ p.todo }
        getMatchLoop p results trie
      | none =>
        results

def getMatch (c : Cell) (tree : DiscrTree α) : Array α :=
  match tree.root[cellColour c]? with
  | none      => #[]
  | some trie =>
    getMatchLoop { todo := c.args.toList } #[] trie

partial def Trie.size : Trie α → Nat
| .node stars children values =>
  let s := values.size
  let s := stars.foldl (init := s) fun s _ t => s + t.size
  children.foldl (init := s) fun s _ t => s + t.size

def size (tree : DiscrTree α) : Nat :=
  tree.root.fold (init := 0) fun s _ t => s + t.size
