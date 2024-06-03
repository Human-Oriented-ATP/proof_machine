r(A,B,C,D,E) :- r(B,A,D,C,E).
r(A,B,C,D,E) :- r(A,C,B,E,D).
r(A,B,C,D,E) :- r(A,C,B,D,E).
r(1,2,3,4,5).
:- r(1,2,4,3,5). 