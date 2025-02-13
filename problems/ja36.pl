g(3,1,1).
g(2,1,3).
r(3,3,3).
r(1,2,3).

g(xg(A,B),A,B).
r(A,B,C) :- r(A,C,B).
r(A,B,C) :- r(A,D,E), r(D,B,F), r(C,F,E).
r(A,B,C) :- g(A,B,C).


w(A,X) :- r(A,B,X), r(X,A,E), r(F,X,A), g(B,E,F).

:- w(2,1).