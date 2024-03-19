r(3,1,2).
b(4).
g(5).
g(7,4,5).
g(A,6,A).
b(xb(A,B),A,B).
g(xg(A,B),A,B).

b(C) :- b(C,B,A), b(A).
g(C) :- b(C,B,A), g(A).
b(6,1,B) :- g(B).
b(6,2,B) :- b(B).
g(C,B,A) :- g(C,A,B).
b(G,B,F) :- b(A,B,C), b(D,B,E), g(F,C,E), g(G,A,D).
b(E,A,F) :- r(A,B,C), b(D,C,F), b(E,B,D).

:- b(6,3,7).