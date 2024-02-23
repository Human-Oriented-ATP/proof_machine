from term import TermVar, TermApp, Inference

tokens = (
    'NUMBER',
    'VARIABLE',
    'CONSTANT',
    'FOLLOWSFROM'
)

literals = [',', '(', ')', '.']

def t_NUMBER(t):
    r'-?\d+'
    t.value = TermApp(int(t.value), ())
    return t

def t_VARIABLE(t):
    r'[A-Z]\w*'
    t.value = TermVar.cached(t.value)
    return t

def t_CONSTANT(t):
    r'[a-z_]\w*'
    return t

def t_FOLLOWSFROM(t):
    r':-'
    return t

t_ignore = " \t"

# Define a rule so we can track line numbers
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)

# Build the lexer
import ply.lex as lex
lex.lex()

def p_inflist_base(p):
    "inflist : inference"
    p[0] = [p[1]]
def p_termlist_next(p):
    "inflist : inflist inference"
    p[0] = p[1]
    p[0].append(p[2])

def p_inference_from(p):
    "inference : termlist FOLLOWSFROM termlist '.'"
    p[0] = Inference(goals = list(p[1]), requirements = list(p[3]))
def p_inference_axiom(p):
    "inference : term '.'"
    p[0] = Inference(goals = [p[1]], requirements = [])

def p_termlist_base(p):
    "termlist : term"
    p[0] = [p[1]]
def p_termlist_comma(p):
    "termlist : termlist ',' term"
    p[0] = p[1]
    p[0].append(p[3])

def p_term_number(p):
    "term : NUMBER"
    p[0] = p[1]
def p_term_variable(p):
    "term : VARIABLE"
    p[0] = p[1]
def p_term_constant(p):
    "term : CONSTANT"
    p[0] = TermApp(p[1], ())
def p_term_function(p):
    "term : CONSTANT '(' termlist ')'"
    p[0] = TermApp(p[1], p[3])

def p_error(p):
    if p:
        print("Syntax error at '%s'" % p.value)
    else:
        print("Syntax error at EOF")

import ply.yacc as yacc
term_parser = yacc.yacc(debug=0, write_tables=0, errorlog=yacc.NullLogger(), start = 'term')
prolog_parser = yacc.yacc(debug=0, write_tables=0, start = 'inflist')

def parse_term(s):
    return term_parser.parse(s)
def parse_file(fname):
    with open(fname, 'r') as f:
        data = f.read()
    return prolog_parser.parse(data)

if __name__ == "__main__":
    from term import unify
    inferences = parse_file("color-game.pl")
    for inference in inferences:
        print("Goals:", inference.goals)
        print("Requirements:", inference.requirements)
        print()
    i1 = inferences[9].fresh_var_copy()
    i2 = inferences[9].fresh_var_copy()
    i3 = inferences[9].fresh_var_copy()
    print(unify([
        [i1.goals[0], i2.requirements[1]],
        [i2.goals[0], i3.requirements[1]],
    ]))
