c(1,A).
w(2,1).
y(3,1).
g(4,2,3).
r(S,E) :- c(N,M), b(M,E), w(S,N).
r(S,E) :- c(N,M), o(M,E), y(S,N).
g(xg(A,B),A,B).
w(xw(A),A).
y(xy(A),A).
b(xb(A),A).
o(xo(A),A).
p(xp(D),D).
bl(xbl(D),D).
r(E,F) :- r(A,C), r(B,D), g(E,A,B), g(F,C,D).
r(C,D) :- p(A,D), bl(B,D), g(C,A,B).
r(A,C) :- r(A,B), r(B,C).
:- r(4,5).

