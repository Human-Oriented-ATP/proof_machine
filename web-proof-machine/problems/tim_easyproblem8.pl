g(A,B) :- r(B,1,A).
g(A,B) :- r(B,A,2).
g(A,B) :- g(B,A).
g(A,C) :- g(A,B), g(B,C).
r(r(A,B),A,B).
:- g(1,2).