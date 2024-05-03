r(4,1,2).
r(5,4,3).
r(8,1,3).

w(A,B) :- r(A,B,C).
r(A,B,C) :- r(A,C,B).
r(A,B,C) :- w(A,B), w(A,C).
w(A,C) :- w(A,B), w(B,C).
w(A,D) :- r(A,B,C), r(D,E,C), w(B,E).


:- r(5,2,8).