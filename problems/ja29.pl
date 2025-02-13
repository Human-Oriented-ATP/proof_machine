g(7,4,1).
b(6,2,5).
g(3,1,1).
r(2,3,3).
b(5,4,2).


b(A,B,B) :- r(A,C,C), r(C,B,B).
r(A,B,B) :- g(A,B,B).
r(A,B,C) :- b(D,C,C), b(A,D,B).
r(A,B,C) :- g(D,C,C), g(A,B,C).
r(A,B,C) :- r(A,D,E), r(B,F,E), b(D,F,C).
r(C,D,A) :- r(C,A,B), r(B,D,E).
r(C,B,D) :- r(C,A,B), g(A,D,E).


:- r(6,7,1).