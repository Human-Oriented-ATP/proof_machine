r(xr(A),A).
g(A,A).
g(A,D) :- r(A,B), g(B,C), r(C,D).
w(B) :- g(A,B), w(A).
w(A) :- r(A,B), r(B,C), r(C,D), r(D,E), r(E,F).
:- w(1).