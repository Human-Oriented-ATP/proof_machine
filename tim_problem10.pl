y(1).
y(2).
r(3,1,2).
g(3,4,6).
g(3,5,7).
w(6,7).
g(K,X,Z) :- r(K,F,G), g(G,X,Y), g(F,Y,Z).
g(F,Y,Z) :- r(K,F,G), g(G,X,Y), g(K,X,Z).
g(F,X,xg(F,X)).
w(X,Y) :- g(F,X,Z), g(F,Y,W), w(Z,W), y(F).
:- w(4,5).