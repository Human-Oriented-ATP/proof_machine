r(xr(B, C),B,C).
b(xb(B, C),B,C).
b(A,B,C) :- b(B,A,C).
g(A,B) :- r(C,A,B), b(C,D,B).
:- g(1,2).