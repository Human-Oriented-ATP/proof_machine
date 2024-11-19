g(3,1,1).
g(5,3,1).
g(4,2,1).
g(3,4,2).
g(A,F,E) :- g(A,B,C), g(C,D,E), g(F,B,D).
g(A,B,C) :- g(A,F,E), g(C,D,E), g(F,B,D).
:- g(5,4,4).