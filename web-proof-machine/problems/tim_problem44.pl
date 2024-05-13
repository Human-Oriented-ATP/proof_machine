c(1,A).
w(2,1).
y(3,1).
g(4,2,3).
r(S,E) :- c(N,M), b(M,E), w(S,N).
r(S,E) :- c(N,M), o(M,E), y(S,N).
w(xw(A),A).
y(xy(A),A).
b(xb(A),A).
p(xp(D),D).
bl(xbl(D),D).
w(xw(A,B),A,B).
r(E,F) :- r(A,C), r(B,D), g(E,A,B), g(F,C,D).
r(C,D) :- p(A,D), bl(B,D), g(C,A,B).
c(P,M) :- w(P,M,N).
c(P,N) :- w(P,M,N). 
c(P,R) :- c(P,Q), c(Q,R).
r(A,C) :- r(A,B), r(B,C).
:- r(4,5).

