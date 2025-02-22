b(4,1,2).
b(5,2,3).
b(6,1,3).
g(s,4,5).
r(W,Z) :- b(W,X,Y), y(Z,X,Y).
b(W,X,Y) :- r(W,Z), y(Z,X,Y). 
o(W,T) :- r(U,X), r(V,Y), r(W,Z), g(Z,X,Y), g(T,U,V).
y(C,X,Z) :- y(A,X,Y), y(B,Y,Z), y(C,A,B).
:- o(6,7).