r(1,2,3).
b(3,4,5).
o(A,D) :- r(A,B,C), b(C,D,E).
o(B,E) :- r(A,B,C), b(C,D,E).
r(A,B,C) :- o(A,D), o(B,E), b(C,D,E).
g(5,6).
b(7,4,6).
o(X,B) :- o(X,A), g(A,B).
:- r(1,2,7).