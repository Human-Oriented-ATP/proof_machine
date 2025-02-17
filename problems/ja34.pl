b(1,4,5,6,7).

r(5,4).
g(2,4,5).
g(3,5,4).
g(6,2,4).
g(7,3,5).
g(xg(A,B),A,B).

g(A,B,C) :- g(A,C,B).

r(A,B) :- g(A,B,C).
r(A,B) :- g(A,D,C), g(B,E,F), r(D,E), r(C,F).
r(A,A).

b(A,B,C,D,E) :- b(A,C,B,D,E).
b(A,B,C,D,E) :- b(A,B,D,C,E).
b(A,B,C,D,E) :- b(A,B,C,E,D).

g(A,B,C) :- g(B,D,F), g(A,D,E), g(E,F,C).
g(A,D,E) :- g(B,D,F), g(A,B,C), g(E,F,C).

y(A) :- b(A,B,C,D,E), r(B,C), r(C,D), r(D,E).

:- y(1).