w(1).
w(2).
g(3,1,2).
r(A,xr(A)) :- w(A).
w(A) :- r(A,B).
g(xg(A,B),A,B).
r(F,E) :- r(A,B), r(C,D), g(F,A,C), g(E,B,D).
:- w(3).