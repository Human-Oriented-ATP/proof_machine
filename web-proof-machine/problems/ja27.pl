y(2,1).
r(3,2).
r(4,3).


g(xg(A,B),A,B).

y(5,X) :- y(A,X), y(B,X), r(A,B).
y(A,X) :- y(5,X).
y(A,1) :- g(A,B,C), r(B,C).


w(xw(X,Y),X,Y).

g(C,A,B) :- g(C,B,A).

y(X,A) :- w(A,B,X).
y(A,X) :- w(X,Y,Z), y(A,Y).
y(D,X) :- g(A,B,C), w(Y,X,B), w(Z,X,C), y(A,X), y(D,Y), y(D,Z).


y(C,X) :- y(A,X), g(C,A,B).


:- y(4,1).
