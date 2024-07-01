b(2,1).
b(3,2).
y(4,2,2).
y(5,3,3).

g(xg(A,B),A,B).
r(xr(A,B),A,B).
y(xy(A,B),A,B).
b(xb(A),A).

w(A,B) :- b(A,B).
w(A,B) :- g(A,B,C).
w(A,B) :- r(A,B,C).
w(A,B) :- w(A,C), w(C,B).

g(A,1,B) :- b(A,B).
r(A,A,1).
y(A,A,1).

r(A,B,C) :- r(A,C,B).
g(A,B,C) :- g(A,C,B).
g(E,A,D) :- g(C,B,D), b(A,B), b(E,C).
b(E,C) :- g(C,B,D), b(A,B), g(E,A,D).

r(E,A,D) :- g(E,C,D), b(A,B), r(C,B,D).
g(E,C,D) :- r(E,A,D), b(A,B), r(C,B,D).

y(E,C,A) :- r(E,D,C), b(A,B), y(D,C,B).
r(E,D,C) :- y(E,C,A), b(A,B), y(D,C,B).


:- w(5,4).
