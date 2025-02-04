y(3,1).
y(4,2).
g(5,3,4).
c(6,5).
o(7,1,2).
b(xb(A,B),A,B).     
y(xy(A),A).         
g(xg(A,B),A,B).     
o(xo(A,B),A,B).     
w(xw(A),A).         
c(xg(A),A).        
bl(A) :- y(A,B).
r(A,C) :- r(A,B), r(B,C).
r(D,J) :- b(C,A,B), y(D,C), y(E,A), y(F,B), o(G,A,B), g(H,E,F), w(I,G), b(J,H,I).
r(A,B) :- c(A,C), c(B,D), r(C,D). 
r(A,B) :- w(A,C), w(B,D), r(C,D).
w(A,B) :- c(B,A).
c(A,B) :- w(B,A).
r(A,B) :- b(C,B,A), bl(C).
bl(B) :- r(A,B), bl(A). 
:- r(7,6).