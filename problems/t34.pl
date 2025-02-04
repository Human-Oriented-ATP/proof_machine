b(1,2,3).
g(4,2,3).
g(xg(A,B),A,B).
r(xr(A),A).
g(A,G,E) :- r(D,B), r(E,C), g(F,B,C), g(G,F,D), b(A,B,C).
g(A,1,A).
g(A,A,1).
r(A,B) :- r(B,A).
g(1,A,B) :- r(A,B).
r(A,B) :- g(1,A,B).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
g(F,E,D) :- g(A,B,C), r(D,B), r(E,C), r(F,A).
:- g(4,3,2).
