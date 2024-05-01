r(xr(B, C),B,C).
r(A,B,C) :- r(A,C,B).
g(A,B) :- r(C,A,B), r(C,B,A).

:- g(1,2).