
r(4,1,2).
r(5,2,3).
r(6,1,3).
g(R,X,W) :- r(R,X,Y), b(W,Y).
r(R,X,Y) :- g(R,X,W), b(W,Y).
g(B,X,C) :- g(A,X,Y), g(B,A,Z), g(C,Y,Z).
g(B,A,Z) :- g(A,X,Y), g(B,X,C), g(C,Y,Z).
g(X,A,W) :- g(A,X,Y), b(W,Y).
b(A,B) :- b(B,A).
:- g(3,1,2).