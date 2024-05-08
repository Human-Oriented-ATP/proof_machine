r(3,1,1).
r(4,2,2).
r(5,1,2).

g(xg(A,B),A,B).
r(xr(A,B),A,B).

r(A,B,C) :- r(A,C,B).
b(A,B,C,D) :- b(B,A,C,D).
b(A,B,C,D) :- b(A,C,B,D).
b(A,B,C,D) :- b(A,B,D,C).

b(A,6,6,6) :- r(A,B,B).
g(A,F,G) :- r(A,B,C), g(C,D,E), r(F,B,D), r(G,B,E).
b(D,E,B,C) :- g(A,D,E), b(A,6,B,C).

:- b(3,4,5,5).