w(1).
g(1).
r(A, xr(A)).
w(A) :- w(F), r(F,E), r(E,D), r(D,C), r(C,B), r(B,A).
g(A) :- g(D), r(D,C), r(C,B), r(B,A).
b(1) :- w(A), r(B,A), g(B).
:- b(1).