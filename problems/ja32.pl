g(1).
g(2).
g(3).

b(4,1,2).
b(5,1,3).
b(6,2,5).
b(7,1,6).
b(8,4,3).

b(xb(A,B),A,B).

b(A,B,C) :- b(B,D,F), b(A,D,E), b(E,F,C).
b(A,D,E) :- b(B,D,F), b(A,B,C), b(E,F,C).

r(A,B) :- b(A,D,E), b(B,C,F), g(D), g(C), r(E,F).
r(A,B) :- g(B).

w(A,B) :- b(A,C,D), b(B,E,D), r(C,E).

:- w(7,8).