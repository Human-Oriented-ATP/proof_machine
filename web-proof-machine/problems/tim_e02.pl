r(1,2,3,4).
r(A,B,C,D) :- r(B,A,C,D).
r(A,B,C,D) :- r(D,A,B,C).
:- r(3,1,2,4).
