r(xr(A),A).
y(xy(A),A).

g(A,B) :- g(C,A), g(C,B).
g(A,B) :- r(A,B), y(C,B).
r(A,B) :- r(A,C).

:- g(1,2).