r(1,2,3).
r(B,A,C) :- r(A,B,C).
r(A,C,B) :- r(A,B,C).
b(2).
b(C) :- b(A), r(A, B, C).
:- r(1,3,2).