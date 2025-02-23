b(1,2).
y(A,3,A).
b(3).
r(A,A).


g(fg(A,B),A,B).
y(fy(A,B),A,B).
g(A,ig(A,B),B).
y(A,iy(A,B),B).

g(A,B,C) :- g(A,C,B).
y(A,B,C) :- y(A,C,B).

b(A) :- g(A,B,C), b(B), b(C).

g(C,A,B) :- y(C,D,G), y(A,D,E), y(B,D,F), g(G,E,F).
y(C,D,G) :- g(C,A,B), y(A,D,E), y(B,D,F), g(G,E,F).

b(A,B) :- b(C,D), y(A,C,E), y(B,D,E), b(E).
b(C,D) :- b(A,B), y(A,C,E), y(B,D,E), b(E).
b(A,B) :- g(A,C,D), g(B,E,F), r(C,E), b(D,F).
r(A,B) :- b(A,B).
w(A,B) :- b(A,C), b(C,B).
:- w(1,2).