b(4,1,2).
b(5,2,3).
b(6,1,3).
r(4,7).
r(5,8).
g(9,7,8).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
r(A,C) :- r(A,B), r(B,C).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
r(D,E) :- g(D,A,C), g(E,B,C), r(A,B).
r(D,E) :- g(D,A,B), g(E,A,C), r(B,C).
r(C,D) :- b(A,X,Y), b(B,Y,Z), b(C,X,Z), g(D,A,B).
:- r(6,9).