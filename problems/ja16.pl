g(1,2,2).
g(4,3,3).
g(1,4,3).
g(6,3,2).
g(6,2,4).
g(7,4,2).

g(A,A,1).
g(A,1,A).

g(xg(A,B),A,B).
g(A,B,xr(A,B)).


g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- g(7,2,3).
