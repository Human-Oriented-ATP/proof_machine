w(1).
w(2).
r(1,2).
g(3,1,1).
g(4,2,2).
g(A,B,C) :- g(A,C,B).
r(D,E) :- w(A), r(B,C), g(D,A,B), g(E,A,C).
r(A,C) :- r(A,B), r(B,C).
g(xg(A,B),A,B).
:- r(3,4).