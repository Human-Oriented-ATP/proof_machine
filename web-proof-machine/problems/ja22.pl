w(1,4).
w(2,5).
w(3,6).

w(14,1,10).
w(15,2,14).
w(16,3,15).

r(7,4,6).
r(8,1,2).
r(9,2,6).

b(17,7,10).
b(18,8,17).
b(19,9,18).

y(10,10,10).
w(xw(A,B),A,B).

g(xg(A),A,10).
g(xgg(A,F),F,A) :- g(A,B,C).

w(A,B,C) :- w(A,F,E), w(C,F,G), w(E,B,G).

g(A,B) :- g(B,A,C).
g(A,B) :- g(B,D,E), g(A,E).

r(A,A).
r(A,B) :- w(A,B).
w(A,B) :- w(B,A).

y(A,B) :- r(A,C,D), g(C,B).
y(A,B) :- r(A,C,D), g(D,B).

y(A,E,D) :- b(A,B,C), y(C,E,D), y(B,D).
y(10,E,A) :- g(A,B,C), w(E,D,F), r(B,D), y(10,F,C).


b(A,B) :- y(A,B,C).

:- b(19,16).