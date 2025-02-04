w(1).
b(2,1).
b(3,2).
b(4,3).
g(xg(A,B),A,B).
r(xr(A),A).
w(B) :- w(A), r(B,A).
b(B,A) :- g(B,A,A).
g(B,A,A) :- b(B,A).
r(B,A) :- g(B,A,1).
r(E,D) :- g(E,A,C), r(C,B), g(D,A,B).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- w(4).