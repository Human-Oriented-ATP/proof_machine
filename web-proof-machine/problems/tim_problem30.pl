r(2,1).
r(3,2).
g(4,2,1).
g(5,3,4).
r(6,5).
r(7,6).
g(8,7,5).
g(9,8,1).
r(10,4).
r(11,10).
r(12,11).
g(xg(A,B),A,B).
r(xr(A),A).
g(A,B,C) :- g(A,C,B).
g(A,B,B) :- r(A,B).
r(A,B) :- g(A,B,B).
g(D,E,F) :- g(A,B,C), r(D,A), r(E,B), r(F,C).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
:- g(9,12,11).
