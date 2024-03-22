r(5,1,2).
r(6,3,4).
r(7,5,6).
r(8,2,3).
r(9,8,4).
r(10,1,9).
r(xr(A,B),A,B).
b(A,B) :- b(B,A).
r(A,B,C) :- r(D,B,C), b(A,D).
r(A,B,C) :- r(A,D,C), b(B,D).
r(A,B,C) :- r(A,B,D), b(C,D).
b(Y,W) :- r(X,A,B), r(Y,X,C), r(Z,B,C), r(W,A,Z).
:- b(7,10).