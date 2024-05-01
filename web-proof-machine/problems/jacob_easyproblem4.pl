g(xg(A),A).
y(A,xy(A)).
r(A,B) :- g(C,A), y(C,B).
y(A,B) :- g(A,B), y(A,C).

:- r(1,1).