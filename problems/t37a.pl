g(5,2,3).
g(5,2,4).
g(7,3,6).
g(A,xg(A,B),B).
g(A,B,A) :- g(C,B,C).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- g(7,4,6).
