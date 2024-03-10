r(1).
r(2).
g(3,1,2).
w(C) :- w(A), w(B), g(C,A,B). 
b(xb(A),A).
r(A) :- w(B), b(B,A).
r(A) :- w(B), b(A,B).
w(A) :- r(B), b(B,A).
w(A) :- r(B), b(A,B).
g(xg(A,B),A,B).
g(C,A,B) :- g(C,B,A).
b(A,F) :- g(A,B,D), b(D,E), g(F,B,E).
:- w(3).