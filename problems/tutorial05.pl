r(1, 2).
r(2, 3).
r(3, 4).
r(A, B) :- r(A, C), r(C, B).
g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).
:- r(1, 4).
