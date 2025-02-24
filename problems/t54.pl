g(1,1,2,3).
g(A,B,C,D) :- g(A,C,B,D).
g(B,A,B,C) :- g(A,A,B,C).
g(C,C,B,A) :- g(A,B,C,A).
g(A,B,C,B) :- g(C,B,A,A).
g(B,C,A,B) :- g(B,A,A,C).
g(A,C,C,B) :- g(B,A,C,A).
g(A,B,C,C) :- g(B,C,B,A).
:- g(1,1,3,2).


