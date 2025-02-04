r(4,1,2).
r(5,4,3).
g(7,5,6).
r(8,1,3).
g(9,8,6).
g(10,6,2).

w(A,B) :- r(A,B,C).
r(A,B,C) :- r(A,C,B).
r(A,B,C) :- w(A,B), w(A,C).
w(B,E) :- g(A,B,C), g(D,E,C), w(A,D).
w(A,D) :- g(A,B,C), g(D,E,C), w(B,E).
g(A,B,C) :- g(A,C,B).
w(A,C) :- w(A,B), w(B,C).
w(A,D) :- r(A,B,C), r(D,E,C), w(B,E).
w(B,E) :- r(A,B,C), r(D,E,C), w(A,D).


:- r(7,9,10).