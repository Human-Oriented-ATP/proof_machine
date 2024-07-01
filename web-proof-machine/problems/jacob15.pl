g(2,1,1).
g(3,2,1).
g(4,3,2).
r(5,3,3).
r(6,4,2).

w(A,A).
r(A,1,A).

r(xr(A,B),A,B).
r(A,B,C) :- r(A,C,B).
g(A,B,C) :- g(A,C,B).

g(C,E,D) :- g(B,A,1), r(C,B,D), r(E,A,D).
g(A,E,F) :- r(A,B,2), g(B,C,D), g(E,C,C), g(F,D,D).

w(A,B) :- g(A,B,C).
w(A,B) :- g(A,C,D), g(B,E,F), w(C,E), w(D,F).



:- w(6,5).