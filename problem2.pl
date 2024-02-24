r(1,2,3).
r(6,3,5).
g(4,5,1).
g(7,5,2).
r(xr(A,B),A,B).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
w(xw(A),A).
b(A,B,C) :- r(A,B,D), w(C,D).
w(A,B) :- w(B,A).
r(A,B,C) :- b(A,B,D), w(C,D).
b(A,B,C) :- b(A,C,B).
b(A,B,C) :- g(A,D,E), b(E,F,G), g(B,D,F), g(C,D,G).
w(A,B) :- g(A,C,D), w(E,C), w(F,D), b(B,E,F).
g(A,B,C) :- b(D,E,F), w(D,A), w(B,E), w(C,F).
:- r(4,7,6).
