r(1,3).
r(1,4).
r(1,5).
r(2,3).
r(2,4).
r(3,4).
r(C,B) :- r(A,B), r(A,C).
b(B,C) :- r(A,B), r(A,C).
r(A,B) :- r(A,C), r(B,C).
r(A,C) :- r(A,B), b(B,C).
:- r(4,3).

