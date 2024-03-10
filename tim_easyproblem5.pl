w(1).
r(2).
g(3,1,2).
w(C) :- w(A), w(B), g(C,A,B). 
b(xb(A),A).
r(A) :- w(B), b(A,B).
r(A) :- w(B), b(B,A).
w(A) :- r(B), b(A,B).
w(A) :- r(B), b(B,A).
g(xg(A,B),A,B).
b(A,F) :- g(A,B,D), b(D,E), g(F,B,E).
:- r(3).