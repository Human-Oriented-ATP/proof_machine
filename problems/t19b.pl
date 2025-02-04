w(1,2,5).
b(5,3,4).
b(6,7,8).
g(3,7).
g(4,8).
w(X,Y,B) :- w(X,Y,A), g(A,B).
r(Y,B) :- r(Y,A), g(A,B).
w(X,Y,C) :- r(X,A), r(Y,B), b(C,A,B).
r(X,A) :- w(X,Y,C), b(C,A,B).
r(Y,B) :- w(X,Y,C), b(C,A,B).
:- w(1,2,6).