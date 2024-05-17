b(2,1).
b(2,3).
b(6,5).
r(7,5).
g(9,5,3).
g(11,9,7).
g(A,A,1).
g(A,1,A).
g(xg(A,B),A,B).
r(xr(A),A).
b(xb(A),A).
r(A,B) :- r(B,A).
g(1,A,B) :- r(A,B).
r(A,B) :- g(1,A,B).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
y(A,A,2).
y(A,2,A).
y(xy(A,B),A,B).
w(xw(A),A).
w(A,B) :- w(B,A).
y(2,A,B) :- w(A,B).
w(A,B) :- y(2,A,B).
y(E,A,F) :- y(D,A,B), y(E,D,C), y(F,B,C).
y(E,D,C) :- y(D,A,B), y(E,A,F), y(F,B,C).
b(Z,C) :- b(X,A), b(Y,B), g(C,A,B), y(Z,X,Y). 
y(Z,X,Y) :- b(X,A), b(Y,B), b(Z,C), g(C,A,B).
:- b(2,11).
