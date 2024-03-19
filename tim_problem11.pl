g(1,3).
g(2,4).
w(3,4).
b(xb(X,Y),X,Y).
r(X) :- g(X,Y), r(Y).
r(Z) :- w(X,Y), b(Z,X,Y).
g(V,U) :- b(U,W,Z), g(X,W), g(Y,Z), b(V,X,Y).
w(X,Y) :- b(Z,X,Y), r(Z).
:- w(1,2).
