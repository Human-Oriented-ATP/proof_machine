c(xc(A),A).
r(S,E) :- c(N,M), b(M,E), w(S,N).
r(S,E) :- c(N,M), o(M,E), y(S,N).
g(x(A,B),A,B).
w(xw(A),A).
y(xy(A),A).
b(xb(A),A).
o(xo(A),A).
p(xp(D),D).
bl(xbl(D),D).
w(xw(A,B),A,B).
r(E,F) :- r(A,C), r(B,D), g(E,A,B), g(F,C,D).
r(C,D) :- p(A,D), bl(B,D), g(C,A,B).
c(P,M) :- w(P,M,N).
c(P,N) :- w(P,M,N). 
c(P,R) :- c(P,Q), c(Q,R).
r(A,C) :- r(A,B), r(B,C).
g(A,B) :- r(A,B), g(A,C,D), w(C,E), y(D,E).
:- g(A,5).

