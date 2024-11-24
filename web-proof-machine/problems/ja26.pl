y(6,1).

b(2,4).
b(3,5).

g(6,2,3).
g(7,4,5).

w(xw(X,Y),X,Y).

g(C,A,B) :- g(C,B,A).

y(X,A) :- w(A,B,X).
y(D,X) :- g(A,B,C), w(Y,X,B), w(Z,X,C), y(A,X), y(D,Y), y(D,Z).


y(B,X) :- y(A,X), b(A,B).
y(C,X) :- y(A,X), g(C,A,B).


:- y(7,1).
