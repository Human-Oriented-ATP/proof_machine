b(1). 
r(1, 2, 3).
r(2).
r(3).  
w(P, i(P), p(P)) :- b(P).
b(B) :- w(A, B, C).
y(P, r(P), p2(P)).
r(A, B, C) :- y(A, B, C). 
y(A, B, C) :- w(A, B, C). 
r(C) :- y(A, B, C), r(A). 
r(A) :- r(A, B, C), r(C). 
g(C) :- y(A, B, C). 
y(A) :- r(A, B, C), b(B), b(C), r(B), r(C). 
b(I) :- r(P, I, Q), r(P, J, R), g(Q), g(R), b(J).
b(A) :- b(B), b(C), r(A, B, C).
r(A, B, E) :- r(A, D, F), r(E, C, D), r(F, C, B).
b(P) :- g(P).
g(A) :- r(A, B, C), g(B), g(C).
r(rp(B, C), B, C). 
:- y(1).
