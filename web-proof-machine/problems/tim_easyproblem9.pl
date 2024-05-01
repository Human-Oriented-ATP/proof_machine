r(1,2).
r(2,3).
g(A,B,xg(A,B)).
g(F,D,E) :- g(A,B,D), g(B,C,E), g(A,C,F).
w(C) :- r(A,B), g(A,B,C).
r(A,B) :- w(C), g(A,B,C).
w(C) :- w(A), w(B), g(C,A,B).
:- r(1,3).
