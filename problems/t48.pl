r(1,2).
g(Y,xg(Y)) :- r(X,Y).
b(Y,xb(Y)) :- g(X,Y).
w(Y,xw(Y)) :- b(X,Y).
y(Y,xy(Y)) :- w(X,Y).
o(Y,xo(Y)) :- y(X,Y).

c(A,C) :- p(A,B), p(B,C).
p(A,C) :- g(A,B), b(B,C).
p(A,C) :- r(A,B), p(B,C).
p(A,C) :- w(A,B), y(B,C).
p(A,C) :- p(A,B), o(B,C).

bl(A) :- c(A,B).

:- bl(1).


