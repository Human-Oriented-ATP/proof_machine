b(f(X), X).
r(A, D) :- b(A, B), b(B, C), b(C, D).
b(A, B) :- b(A, C), b(C, B).
g(A, B) :- b(A, B).
bl(X) :- r(A, X), g(A, X).
:-bl(1).