w(3,1,2).
b(4,1,2).
r(5,2).
r(6,1).
r(8,3).
g(7,6,5).
r(xr(A),A).
b(xb(A,B),A,B).
g(xg(A,B),A,B).
g(A,B,C) :- g(A,C,B).
y(A,B) :- b(A,X,Y), r(B,X).
g(A,B,C) :- w(Z,X,Y), r(A,Z), r(B,Y), b(C,X,Y).
y(A,D) :- g(A,B,C), g(D,B,E), y(C,E).
:- y(8,7).



