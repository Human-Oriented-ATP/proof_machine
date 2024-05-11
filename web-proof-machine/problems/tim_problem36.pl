g(3,1,2).
g(4,1,2).
g(6,3,5).
g(xg(A,B),A,B).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- g(6,4,5).
