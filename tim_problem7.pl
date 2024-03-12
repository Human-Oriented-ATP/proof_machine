g(3,1).
g(4,2).
r(3,4).
b(2) :- w(1).
w(A) :- r(A,B).
w(B) :- w(A), g(A,B).
r(A,xr(A)) :- w(A).
r(xr(A),A).
g(xg(A),A).
r(C,E) :- r(A,B), g(C,A), g(D,B), r(E,D).
r(C,D) :- r(A,B), r(A,C), r(B,D).
y(A) :- w(A), b(A).
:- y(2).