r(1,3).
r(2,4).
b(5,3,4).
b(6,7,8).
g(5,6).
w(X,Y,B) :- w(X,Y,A), g(A,B).
r(Y,B) :- r(Y,A), g(A,B).
w(X,Y,C) :- r(X,A), r(Y,B), b(C,A,B).
r(X,A) :- w(X,Y,C), b(C,A,B).
r(Y,B) :- w(X,Y,C), b(C,A,B).
:- r(2,8). 


