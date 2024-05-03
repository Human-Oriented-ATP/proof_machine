g(3,5).
g(4,7).
g(7,6).
b(1,3,4).
b(2,5,6).

b(xr(B,C),B,C).
g(xg(A),A).
g(A,B) :- b(A,C,D), b(B,C,E), g(D,E).
g(A,B) :- b(A,C,D), b(B,E,D), g(C,E).
g(A,C) :- g(A,B), g(B,C).

:- g(1,2).