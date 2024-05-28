b(4,3).
b(3,2).
b(2,1).
b(s(X),X).
y(M,1,N) :- b(M,N).
y(X,M,1) :- y(X,N,2), b(M,N).
y(X,C,D) :- y(X,A,Y), y(Y,C,B), b(C,A), b(D,B).
g(X) :- y(Y,X,X).
:- g(4).
