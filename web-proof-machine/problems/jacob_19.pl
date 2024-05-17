y(1).
y(2).
y(3).
y(4).
y(5).
r(6,1,2).
r(7,6,3).
r(8,4,5).
w(7,8).

r(A,A).
b(bx(A),A).
w(xw(A),A).
y(xy(A),A).
g(xg(B,C),B,C).
b(xb(B,C),B,C).

b(A,10,A).

b(10,A) :- y(A).
y(10,A) :- y(A).

w(xww(A,B),A,B,11) :- w(A,B), y(B).
b(10,A) :- w(A,B,C,11).
b(10,C) :- w(A,B,C,11).
y(B,A) :- w(A,D,X,Y), b(B,D).

g(A,B) :- g(A,B,C).
r(A,B,C) :- r(A,C,B).

b(A,D) :- g(A,B,C), r(D,E,F), b(B,E), b(C,F).
y(A,D) :- g(A,B,C), r(D,E,F), y(B,E), y(C,F).

b(E,A,D) :- g(E,C,D), g(A,B,10), b(C,B,D).
g(D,E,F) :- r(A,B,C), b(D,A), b(E,B), b(F,C).
r(D,E,F) :- r(A,B,C), w(D,A), w(E,B), w(F,C).
r(xrn(E,F),E,F) :- r(A,B,C), w(E,B,Z,W), w(F,C,U,V).

g(E) :- w(B,C), b(D,B), g(D,E), b(10,C).

w(mx(C,E),A,E) :- b(B,A), y(C,A), b(D,B,E), g(C,D).
g(D,C) :- w(A,B,C), y(D,A).
r(A,B) :- r(A,B,C).


w(A,W,Z,12) :- r(A,B,C), w(B,D,X,E), w(C,F,Y,G), r(Z,X,Y), w(W,Z).

w(A,mw(A),mmw(A),11) :- w(A,B,C).
w(B,C) :- w(A,B,C,11).
r(C,E) :- w(A,B,C,D), w(B,E).

:- g(10).
