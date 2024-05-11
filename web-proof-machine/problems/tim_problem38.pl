g(1,2,3).
g(1,3,2).
g(4,3,3).
g(5,4,3).
g(6,5,2).
g(xg(A,B),A,B).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- g(6,2,5).

