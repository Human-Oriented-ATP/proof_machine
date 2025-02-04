r(6,1,2,4).
r(7,1,3,5).
r(9,2,3,8).
g(8,4,5).
w(1,8).
g(10,9,9).
r(T,A,B,C) :- r(T,B,A,C).
r(T,A,B,C) :- r(T,A,C,B).
g(A,B,C) :- g(A,C,B).
r(A,B,C) :- r(A,C,B).
w(A,B) :- w(B,A).
w(B,D) :- w(A,D), g(A,B,C).
r(L,A,B) :- w(A,B), r(T,A,B,C), g(L,T,T).
g(E,A,C) :- g(A,B,B), g(C,D,D), g(E,F,F), g(F,B,D).
g(G,D,E) :- r(D,B,C), r(E,A,C), g(F,A,B), r(G,F,C). 
r(G,F,C) :- r(D,B,C), r(E,A,C), g(F,A,B), g(G,D,E).
g(C,B,A) :- r(A,D,E,F), r(B,D,G,H), r(C,E,G,K), g(K,H,F).
r(xr(A,B),A,B).
g(xg(A,B),A,B).

:- r(10,1,8).