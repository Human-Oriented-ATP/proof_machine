g(f(X), X).
g(A, B) :- g(B, A).
r(D, B) :- g(D, C), g(C, D), g(A, B).
:-r(1, 2).