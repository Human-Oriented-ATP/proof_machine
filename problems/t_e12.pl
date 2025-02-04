r(1,3).
r(2,4).
g(5,1,2).
g(6,3,4).
g(xg(A,B),A,B).
r(A,C) :- r(A,B), r(B,C).
r(D,E) :- r(A,B), g(D,A,C), g(E,B,C).
r(D,E) :- r(B,C), g(D,A,B), g(E,A,C).
:- r(5,6).