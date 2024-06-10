w(1,4).
w(2,5).
w(3,6).

r(7,1,2).
r(8,2,6).
r(9,4,3).


b(12,11).
b(13,12).

g(xw(A),A,10,11).
g(xww(A,F),F,A,E) :- g(A,B,C,D), b(E,D).

g(A,B) :- g(B,A,C,D).
g(A,B) :- g(B,D,E,F), g(A,E).

r(A,B) :- g(A,B).
r(A,B) :- g(C,B), w(A,C).
w(A,B) :- w(B,A).

y(A,B) :- r(A,C,D), g(C,B).
y(A,B) :- r(A,C,D), g(D,B).

y(A,B,C) :- y(A,D), y(B,D), y(C,D), r(1,D), r(2,D), r(3,D), g(D,E,F,13).

:- y(7,8,9).