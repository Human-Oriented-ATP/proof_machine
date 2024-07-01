y(1,2).
y(2,3).
b(A,xb(A),yb(A)).
r(xr(A,B),A,B).
r(A,B,C) :- r(A,C,B).
r(E,A,F) :- r(E,D,C), r(D,A,B), r(F,B,C).
r(E,D,C) :- r(E,A,F), r(D,A,B), r(F,B,C).
y(X,Y) :- b(X,A,B), b(Y,C,D), r(E,A,D), r(F,B,C), g(E,F).
g(E,F) :- y(X,Y), b(X,A,B), b(Y,C,D), r(E,A,D), r(F,B,C).
g(A,C) :- g(A,B), g(B,C).
g(X,Y) :- r(X,A,B), r(Y,A,C), g(B,C).
g(B,C) :- r(X,A,B), r(Y,A,C), g(X,Y). 
:- y(1,3).