r(1,2,3,1,1).
r(1,2,4,1,1).
r(3,4).
b(5).
b(A,5,A).

r(xr(A,B,C,D),A,B,C,D).
b(xb(A,B),A,B).

r(A,B,C,D,E) :- r(A,B,C,1,1), r(1,D,E,1,1).
r(B,1,1,D,E) :- r(1,A,C,1,1), r(B,A,C,D,E).
r(A,B,C,1,1) :- r(A,B,C,D,E), r(D,E).
r(A,B,C,D,E) :- r(A,C,B,D,E).
r(A,B,C,D,E) :- r(A,C,D,E,B).


g(A) :- r(1,A,1,1,1).
r(1,A,1,1,1) :- g(A).
b(C) :- b(A), b(B), r(C,A,B,1,1).
b(A,I,G) :- r(A,B,C,1,1), b(B,F,G), b(C,H,G), r(I,F,H,1,1).
b(A,B,C) :- b(A,C,B).
g(B) :- b(1,A,B), b(A).
r(A,A) :- g(A).
g(A,B) :- g(A), g(B).

:- g(2,3).