r(A, xr(A)).
g(A,B) :- r(C,A), g(C,D), r(D,B).
g(A,B) :- r(A,B).
w(A) :- g(A,B), w(B).
w(1) :- w(A), w(A), w(A), w(A), w(A), w(A), w(A), w(A).
w(2).
:- w(1).