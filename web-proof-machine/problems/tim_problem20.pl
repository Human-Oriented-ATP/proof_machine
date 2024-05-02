w(3,1).
w(2,4).
b(5,3,4).
w(xw(A),A).
b(xb(A,B),A,B).
b(C,A,B) :- w(D,B), g(C,A,D).
g(C,A,D) :- w(B,D), b(C,A,B). 
g(C,A,B) :- g(C,B,A).
g(A,B,E) :- g(A,B,C), w(C,D), w(D,E). 
w(A,B) :- w(C,A), w(D,C), w(B,D).
:- b(5,2,1).

