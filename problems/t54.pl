g(1,1,2,3).
g(B,A,B,C) :- g(A,A,B,C).
g(C,C,B,A) :- g(A,B,A,C).
g(A,A,C,B) :- g(A,B,C,A).
g(B,C,B,A) :- g(B,A,A,C).
g(A,C,C,B) :- g(B,A,C,A).
g(A,A,B,C) :- g(B,C,A,A).
:- g(1,1,3,2).
