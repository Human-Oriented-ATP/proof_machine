b(3,1,2).
r(4,3).
bl(1).
bl(2).
o(7,4,5).
g(7,6).
g(6,A).
r(V,C) :- bl(C), r(U,C), o(T,U,V), g(T,F), w(F,U,C).
r(A,E) :- r(A,G), b(G,E,F).
r(A,F) :- r(A,G), b(G,E,F).
r(A,G) :- r(A,E), r(A,F), b(G,E,F).
g(A,C) :- g(A,B), g(B,C).
w(xw(U,C),U,C).
:- r(5,3).
