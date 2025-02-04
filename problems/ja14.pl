g(2,1,1).
r(3,2,2).
r(4,3,2).
g(5,2,1).
g(3,5,1).
r(6,5,5).
w(A,A).
r(A,1,A).

r(xr(A,B),A,B).
r(A,B,C) :- r(A,C,B).
g(A,B,C) :- g(A,C,B).

g(C,E,D) :- g(B,A,1), r(C,B,D), r(E,A,D).
w(A,B) :- g(A,B,C).
w(A,B) :- g(A,C,D), g(B,E,F), w(C,E), w(D,F).


:- w(6,4).