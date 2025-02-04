
b(5,1,2).
b(6,2,3).
b(7,3,4).
b(8,1,4).
g(9,5,6).
g(10,9,7).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
r(A,C) :- r(A,B), r(B,C).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(E,A,F), g(F,B,C).
r(D,E) :- g(D,A,B), g(E,A,C), r(B,C).
r(C,D) :- b(A,X,Y), b(B,Y,Z), b(C,X,Z), g(D,A,B).
:- r(8,10).