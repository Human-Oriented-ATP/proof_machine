g(1).
g(2).
g(3).
g(4).

y(8,A).
y(A,8).
y(7,A) :- g(A).
y(A,7) :- g(A).

b(5,1,2).
b(6,3,4).
b(9,5,6).
b(10,5,1).

r(5,6,8,7).

r(A,B,C,D) :- r(A,B,D,C), y(C,D).
r(A,B,C,D) :- r(A,C,B,D), y(B,C).
r(A,B,C,D) :- r(B,A,C,D), y(A,B).
r(A,D,E,C) :- r(A,B,8,C), b(B,D,E).
r(A,B,D,E) :- r(A,B,8,C), b(C,D,E).
r(A,B,C,D) :- r(E,8,C,D), b(E,A,B).
r(E,8,C,D) :- r(A,B,C,D), b(E,A,B).
r(A,B,8,C) :- r(A,D,E,C), b(B,D,E).
r(A,B,8,C) :- r(A,B,D,E), b(C,D,E).


b(A,B) :- g(A), g(B).
b(C,D) :- b(C,A,B), b(D,E,F), g(A), g(E), b(B,F).
w(C,D) :- r(A,C,D,B), b(A,B).


:- w(7,8).