b(2,1).
b(3,2).
y(4,2,2).
y(5,3,3).

r(xr(A,B),A,B).
y(xy(A,B),A,B).


w(A,B) :- g(A,B,C).
w(A,B) :- r(A,B,C).
w(A,B) :- w(A,C), w(C,B).


r(A,A,1).
y(A,A,1).

r(A,B,C) :- r(A,C,B).


g(E,C,D) :- r(E,A,D), b(A,B), r(C,B,D).

r(E,D,C) :- y(E,C,A), b(A,B), y(D,C,B).


:- w(5,4).
