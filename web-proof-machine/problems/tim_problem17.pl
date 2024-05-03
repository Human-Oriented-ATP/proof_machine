b(A,B) :- g(A,B), r(X,B), w(X,A).
g(A,B) :- b(A,B).
g(A,C) :- g(A,B), g(B,C).
w(X,A) :- w(X,B), g(A,B).
r(X,B) :- r(X,A), g(A,B).
g(3,4).
g(4,5).
r(1,4).
w(1,3).
r(2,5).
w(2,4).
:- b(3,5).