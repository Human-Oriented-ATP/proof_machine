b(5,1,2).
b(6,1,3).

b(7,5,3).
b(8,6,1).

b(xb(A,B),A,B).

b(A,B,C) :- b(B,D,F), b(A,D,E), b(E,C,F).
b(A,D,E) :- b(B,D,F), b(A,B,C), b(E,C,F).

r(A,B) :- b(A,B,C).
r(A,B) :- b(B,C,A).
r(A,B) :- r(A,C), r(C,B).
w(A,B) :- b(A,C,D), b(B,C,E), r(D,E).

:- w(7,8).