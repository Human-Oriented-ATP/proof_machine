b(2,3,1,4,2,5).

r(1,1).
r(3,6).
r(4,5).

r(A,B) :- r(B,A).
b(A,B,C,D,E,F) :- b(B,A,C,D,E,F).
b(A,B,C,D,E,F) :- b(A,C,B,D,E,F).
b(A,B,C,D,E,F) :- b(A,B,C,E,D,F).
b(A,B,C,D,E,F) :- b(A,B,C,D,F,E).

b(A,B,C,D,E,F) :- b(A,B,G,H,E,F), r(C,H), r(D,G).
b(A,B,1,1,C,D) :- b(A,B,E,E,C,D).


:- b(1,1,1,1,1,6).