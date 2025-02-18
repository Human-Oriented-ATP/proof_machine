g(2,1,1).
g(3,2,2).
r(1,3,1).

g(xg(A,B),A,B).
r(A,B,C) :- r(A,C,B).
r(A,B,C) :- r(A,D,E), r(D,B,F), r(C,F,E).
r(A,B,C) :- g(A,B,C).


w(A) :- r(A,B,C), r(D,A,E), r(F,G,A), g(B,E,F).

:- w(2).