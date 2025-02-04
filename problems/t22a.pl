y(3,1).
y(4,2).
g(5,3,4).
g(6,5).
r(7,1,2).
b(xb(A,B),A,B).     
y(xy(A),A).         
w(xw(A),A).         
w(A) :- y(A,B).
r(D,J) :- b(C,A,B), y(D,C), y(E,A), y(F,B), r(G,A,B), g(H,E,F), w(I,G), b(J,H,I).
r(A,B) :- g(A,C), g(B,D), r(C,D). 
g(A,B) :- w(B,A).
r(A,B) :- b(C,B,A), w(C).
w(B) :- r(A,B), w(A). 
:- r(7,6).