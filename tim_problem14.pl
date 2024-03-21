g(4,3,1).
g(5,3,2).
w(4,5).
r(xr(A),A).
g(xg(A,B),A,B).
g(6,A,B) :- r(A,B).
r(A,B) :- r(B,A).
g(A,6,A).
g(A,A,6).
g(E,A,F) :- g(D,A,B), g(E,D,C), g(F,B,C).
g(E,D,C) :- g(D,A,B), g(F,B,C), g(E,A,F).
w(A,B) :- g(A,C,D), g(B,C,E), w(D,E).
:- w(1,2). 