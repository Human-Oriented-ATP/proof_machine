r(1,2).
r(1,3).
r(1,4).
r(2,3).
b(B,C) :- r(A,B), r(A,C).
r(A,B) :- r(A,C), r(B,C).
r(C,A) :- r(A,B), b(B,C).
:- r(4,3).

