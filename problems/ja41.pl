g(1,2,3,4).
g(1,2,5,3).
g(4,2,3,5).
g(5,1,3,4).


g(A,B,C,D) :- g(D,A,B,C).

r(A,B,C) :- g(A,B,C,D), g(A,B,E,C).

w(A) :- r(A,B,C), r(B,C,D), r(C,D,A).
:- w(1).