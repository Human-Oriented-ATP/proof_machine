r(2,1,1).
r(3,2,1).

w(1,4).
g(5,4,4).
g(6,4,5).
r(7,5,5).
r(8,7,5).


r(xr(A,B),A,B).

r(A,B,C) :- r(A,C,B).
g(A,B,C) :- g(A,C,B).
g(A,1,A).

w(H,E) :- w(A,B), w(C,D), g(E,B,D), g(F,A,D), g(G,B,C), r(H,F,G).
g(A,B,C) :- r(A,E,E), g(E,B,D), r(C,D,D).


:- w(8,6).