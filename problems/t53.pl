r(1,2).
r(2,3).
r(3,1).
g(X,Y,C) :- r(A,X), r(B,Y), g(A,C,B).
g(A,B,Z) :- r(C,Z), g(B,A,C).
:- g(1,2,3).
