b(3,1,2).
r(4,3).
w(1).
w(2).
r(7,4,5).
g(7,6).
g(6,A).
r(V,C) :- w(C), r(U,C), r(T,U,V), g(T,F), w(F,U,C).
r(A,E) :- r(A,G), b(G,E,F).
r(A,F) :- r(A,G), b(G,E,F).
r(A,G) :- r(A,E), r(A,F), b(G,E,F).
g(A,C) :- g(A,B), g(B,C).
w(xw(U,C),U,C).
:- r(5,3).
