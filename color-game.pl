g(1,2,3).
b(4,2,3).
r(1,2).
r(A,B) :- g(B,A,C).
r(A,B) :- b(A,B,C).
r(A,B) :- r(A,C), r(C,B).
g(xg(A,B),A,B).
b(xb(A,B),A,B).
w(A,B) :- g(A,C,D), g(B,D,C).
w(A,B) :- b(A,C,D), b(B,D,C).
r(A,B) :- w(A,B).
r(A,B) :- w(B,A).
r(A,B) :- r(A,C), r(A,D), b(B,C,D).
r(A,A).
