b(2,1,3,1).
r(1,1).
r(2,4).
r(3,5).

r(A,B) :- r(B,A).
b(A,B,C,D) :- b(B,A,C,D).
b(A,B,C,D) :- b(A,B,D,C).
b(A,B,C,D) :- b(A,F,E,D), r(B,E), r(C,F).


:- b(5,1,4,1).