g(1,2,3).
b(4,2,3).
:- y(1,2).
:- y(A,B), g(B,A,C).
:- y(A,B), b(A,B,C).
y(A,C), y(C,B) :- y(A,B).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
w(A,B) :- g(A,C,D), g(B,D,C).
w(A,B) :- b(A,C,D), b(B,D,C).
:- y(A,B), w(A,B).
:- y(A,B), w(B,A).
y(A,C), y(A,D) :- y(A,B), b(B,C,D).
:- y(A,A).
y(3,4).
