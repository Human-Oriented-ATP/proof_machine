r(1,2,3).
r(4,5,6).
g(2,5).
g(3,7).
g(7,6).

r(xr(B,C),B,C).
r(A,B,C) :- r(A,C,B).
g(A,B) :- r(A,C,D), r(B,E,D), g(C,E).
g(A,C) :- g(A,B), g(B,C).

:- g(1,4).