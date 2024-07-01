w(1).
g(2,1,3).
g(B) :- w(A), y(B,A).
w(B) :- g(A), y(B,A).
r(D,G) :- b(B,C), w(D,B,F), w(E,C,F), b(G,E).
r(A,C) :- r(A,B), r(B,C).
g(A) :- b(B,A), r(B,A).
y(A,B) :- y(B,A).
b(A,A) :- g(A).
r(B,A) :- g(A), b(B,A).
r(C,A) :- g(B,A,F), w(C,B,F).
r(C,D) :- b(C,A), b(D,B), r(A,B).
g(D,C,F) :- y(C,A), y(D,B), g(B,A,F).
r(C,D) :- r(A,B), w(A,C,F), g(D,B,F).
y(xy(A),A).
g(xg(A,F),A,F).
w(xw(A,F),A,F).
b(xb(A),A). 
:- w(2).

