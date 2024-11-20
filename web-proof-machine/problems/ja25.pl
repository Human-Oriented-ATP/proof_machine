y(8,1).

b(2,9).
b(4,6).
b(10,7).
b(3,11).
b(12,5).

g(8,2,3).
r(9,4,5).
r(10,5,6).
g(11,4,6).
r(12,3,6).
w(xw(X,Y),X,Y).

g(C,A,B) :- g(C,B,A).
r(C,A,B) :- r(C,B,A).

y(A,X) :- w(X,Y,Z), y(A,Y).
y(X,A) :- w(A,B,X).
y(D,X) :- g(A,B,C), w(Y,X,B), w(Z,X,C), y(A,X), y(D,Y), y(D,Z).


y(B,X) :- y(A,X), b(A,B).
y(C,X) :- y(A,X), y(B,X), r(C,A,B).
y(C,X) :- y(A,X), g(C,A,B).
y(A,X) :- y(C,X), r(C,A,B).



:- y(7,1).