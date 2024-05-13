y(1,A).
w(2,1).
y(3,1).
g(4,2,3).
r(S,E) :- c(M,N), b(N,E), w(S,N).
r(S,E) :- c(M,N), o(N,E), y(S,N).
p(xp(D),D).
bl(xbl(D),D).
w(xw(A,B),A,B).
r(C,D) :- p(A,D), bl(B,D), g(C,A,B).
c(P,M) :- w(P,M,N).
c(P,N) :- w(P,M,N). 
c(P,R) :- c(P,Q), c(Q,R).
r(A,C) :- r(A,B), r(B,C).
:- r(4,5).

