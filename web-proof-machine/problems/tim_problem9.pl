w(1,2).
w(3,4).
g(xg(A,B),A,B).
b(xb(A,B),A,B) :- w(5,A), w(5,B).
g(T,A,B) :- g(T,B,A).
b(R,A,B) :- b(R,B,A).
g(T,A,xg(T,A)).
b(R,A,xb(R,A)).
b(R,5,5).
r(A,B,C,D) :- g(T,A,C), g(T,B,D).
r(A,B,C,D) :- b(R,A,C), b(R,B,D).
r(A,B,C,D) :- r(C,D,A,B).
r(A,B,E,F) :- r(A,B,C,D), r(C,D,E,F). 
w(C,D) :- g(T,A,C), g(T,B,D), w(A,B).
w(C,D) :- b(R,A,C), b(R,B,D), w(A,B).
:- r(1,2,3,4).