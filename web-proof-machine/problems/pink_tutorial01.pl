b(f(X), X).
b(A, B) :- b(B, A).
r(A) :- b(B, A), b(A, B).
:- r(1).