g(2,1).
y(3,2).
r(4,1,T).
g(5,4).
y(6,5).
b(db(X,E),X,E).
w(dw(X,E),X,E).
r(Z,W,E) :- b(D,X,E), r(X,Y,D), g(Z,X), g(W,Y).
r(Z,W,E) :- w(D,X,E), r(X,Y,D), y(Z,X), y(W,Y). 
:- r(6,3,7).



