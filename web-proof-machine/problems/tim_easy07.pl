r(1,2).
g(2,3).
g(3,4).
g(A,B) :- g(A,C), g(C,B).
r(A,B) :- r(A,C), g(C,B).
:- r(1,4).
