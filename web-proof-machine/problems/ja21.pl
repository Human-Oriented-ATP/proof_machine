w(1,4).
w(2,5).
w(3,6).

r(7,1,2,6).
r(8,1,5,3).
r(9,4,5,6).
r(10,1,2,3).

b(13,12).
b(14,13).

g(xw(A),A,11,12).
g(xww(A,F),F,A,E) :- g(A,B,C,D), b(E,D).

g(A,B) :- g(B,A,C,D).
g(A,B) :- g(B,D,E,F), g(A,E).

r(A,B) :- g(A,B).
r(A,B) :- g(C,B), w(A,C).
w(A,B) :- w(B,A).

y(A,B) :- r(A,C,D,E), g(C,B).
y(A,B) :- r(A,C,D,E), g(D,B).
y(A,B) :- r(A,C,D,E), g(E,B).

y(A,B,C,G) :- y(A,D), y(B,D), y(C,D), y(G,D), r(1,D), r(2,D), r(3,D), g(D,E,F,14).

:- y(7,8,9,10).