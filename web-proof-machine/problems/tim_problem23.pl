r(1,2).
r(2,3).
r(3,4).
r(4,5).
r(5,1).
g(A,C) :- r(A,B), r(B,C).
b(A,C) :- g(A,B), r(B,C).
r(A,C) :- b(A,B), r(B,C).
:- r(1,1).