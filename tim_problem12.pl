b(1).
b(2).
g(3,1,2).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
w(xw(A),A).
b(X) :- w(X,Y), r(Y).
r(X) :- w(X,Y), b(Y).
g(Z,X,Y) :- w(X,A), w(Y,B), b(W,A,B), w(Z,W).
w(Z,W) :- w(X,A), w(Y,B), g(Z,X,Y), b(W,A,B).
b(Z,X,Y) :- w(X,A), w(Y,B), g(W,A,B), w(Z,W).
w(Z,W) :- w(X,A), w(Y,B), b(Z,X,Y), g(W,A,B).
g(Z,X,Y) :- g(Z,Y,X).
b(Z,X,Y) :- b(Z,Y,X).
w(X,Y) :- w(Y,X).
r(Z) :- r(X), r(Y), b(Z,X,Y).
:- b(3).