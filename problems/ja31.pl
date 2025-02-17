r(2,3).
b(4,1,2).
b(5,1,3).
b(6,4,3).
b(8,6,1).
b(9,5,2).
b(10,9,1).

b(xb(A,B),A,B).

b(A,B,C) :- b(B,D,F), b(A,D,E), b(E,F,C).
b(A,D,E) :- b(B,D,F), b(A,B,C), b(E,F,C).

r(C,D) :- r(A,B), b(C,A,B), b(D,B,A).
r(C,D) :- b(C,A,E), b(D,B,E), r(A,B).

w(A,B) :- b(A,C,D), b(B,C,E), r(D,E).

:- w(8,10).