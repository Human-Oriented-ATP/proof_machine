b(4,1,2).
b(5,2,3).
b(6,1,3).
g(7,4,5).
y(xy(A,B),A,B).
g(xg(A,B),A,B).
r(W,Z) :- b(W,X,Y), y(Z,X,Y).
b(W,X,Y) :- r(W,Z), y(Z,X,Y). 
o(W,T) :- r(U,X), r(V,Y), r(W,Z), g(Z,X,Y), g(T,U,V).
y(C,X,Z) :- y(A,X,Y), y(B,Y,Z), g(C,A,B).
g(C,A,B) :- y(A,X,Y), y(B,Y,Z), y(C,X,Z).
:- o(6,7).