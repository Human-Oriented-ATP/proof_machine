r(2,1).
r(3,2).
r(4,3).
g(A,B,1) :- r(A,B).
g(A,B,C) :- g(E,B,D), r(C,D), r(A,E).
:- g(4,2,2).

