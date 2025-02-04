g(3,1,2).
w(5,4).
r(6,5,3).
b(8,6,7).
r(9,5,1).
r(10,5,2).
g(11,9,10).
g(xg(A,B),A,B).
w(xw(A),A).
r(xr(A,B),A,B).
b(xb(A,B),A,B).
b(F,C,E) :- r(A,B,C), w(B,D), r(E,D,G), b(F,A,G).
b(F,A,G) :- r(A,B,C), w(B,D), r(E,D,G), b(F,C,E).
g(D,F,G) :- g(A,B,C), b(D,A,E), b(F,B,E), b(G,C,E).
b(D,A,E) :- g(A,B,C), g(D,F,G), b(F,B,E), b(G,C,E). 
:- b(8,11,7).
