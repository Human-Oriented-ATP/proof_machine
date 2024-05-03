r(3,1,2).
r(xr(A,B),A,B).
b(xb(A),A).
g(xg(A,B),A,B).
g(A,1,A).
g(A,A,1).
g(A,B,C) :- g(A,C,B).
r(A,B,C) :- r(A,C,B).
w(A,B) :- w(B,A).
w(A,C) :- w(A,B), w(B,C).
b(A,B) :- b(B,A). 
w(A,B) :- g(A,B,1).
w(1,A) :- b(B,C), g(A,B,C).
g(1,A,B) :- b(A,B).
w(A,B) :- g(A,C,D), g(B,C,E), w(D,E). 
w(A,B) :- g(A,C,E), g(B,D,E), w(C,D).
w(A,B) :- r(A,C,D), r(B,C,E), w(D,E).
w(A,B) :- r(A,C,E), r(B,D,E), w(C,D).
w(E,H) :- g(A,B,C), r(E,A,D), r(F,B,D), r(G,C,D), g(H,F,G).
w(E,G) :- g(D,A,B), g(E,D,C), g(F,B,C), g(G,A,F).
:- w(1,3).


