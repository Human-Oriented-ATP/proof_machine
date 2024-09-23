w(A) :- r(B,A), w(B).
r(xr(A), A).
w(A) :- r(A,B), r(B,C), r(C,2).
g(2) :- w(A), w(B), w(C), w(D), w(E).
b(1) :- w(A), g(A).
:- b(1).