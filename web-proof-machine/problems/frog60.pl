

% moving on the map
forwardStep(tile(Y,X), up, tile(Y2,X)) :- succ(Y2,Y).
forwardStep(tile(Y,X), down, tile(Y2,X)) :- succ(Y,Y2).
forwardStep(tile(Y,X), left, tile(Y,X2)) :- succ(X2,X).
forwardStep(tile(Y,X), right, tile(Y,X2)) :- succ(X,X2).
forwardJump(Tile, Dir, Tile3) :- forwardStep(Tile, Dir, Tile2), forwardStep(Tile2, Dir, Tile3).

solvableState(state(Tile, _, _, _, Visited), _) :- finish(Tile), visitedAll(Visited).
solvableState(state(Tile, Dir, UseAction, Stack, Visited), Solution) :-
    tileAction(UseAction, Tile, Dir, Stack, Solution, Tile2, Dir2, Stack2, UseNext),
    updateVisited(Tile2, Visited, Visited2),
    solvableState(
    state(Tile2, Dir2, UseNext, cons(Tile2, Stack2), Visited2),
    Solution
    ).

tileAction(ignore, Tile, Dir, Stack, _, Tile2, Dir, Stack, use) :- forwardStep(Tile, Dir, Tile2).
tileAction(use, Tile, Dir, Stack, _, Tile2, Dir, Stack, use) :- start(Tile, _), forwardStep(Tile, Dir, Tile2).
tileAction(use, Tile, Dir, Stack, _, Tile2, Dir, Stack, ignore) :- teleport(Tile, Tile2).
tileAction(use, Tile, Dir, Stack, Solution, Tile2, Dir2, Stack2, UseNext) :-
    getInstruction(Tile, Solution, Instruction),
    followInstruction(Instruction, Tile, Dir, Stack, Tile2, Dir2, Stack2, UseNext).

isDir(up).
isDir(down).
isDir(left).
isDir(right).

followInstruction(InstrDir, Tile, _, Stack, Tile2, InstrDir, Stack, use) :- isDir(InstrDir), forwardStep(Tile, InstrDir, Tile2).
followInstruction(empty, Tile, Dir, Stack, Tile2, Dir, Stack, use) :- forwardStep(Tile, Dir, Tile2).
followInstruction(jump, Tile, Dir, Stack, Tile2, Dir, Stack, use) :-
    allowJumps,
    forwardJump(Tile, Dir, Tile2).
followInstruction(rewind, _, Dir, cons(_, cons(_, cons(_, cons(Tile, Stack)))), Tile, Dir, Stack, ignore) :- allowRewind.

iniState(state(Tile, Dir, ignore, cons(Tile, empty), cons(Tile, empty))) :- start(Tile, Dir).
checkSolution(Solution) :-
    start(Tile, Dir),
    visitedStart(Visited),
    solvableState(state(Tile, Dir, ignore, cons(Tile, empty), Visited), Solution).















allowJumps.
allowRewind.

% moving on number axis
succ(1,2).
succ(2,3).
succ(3,4).
succ(4,5).
succ(5,6).
succ(6,7).

% special tiles
start(tile(7,3), up).
finish(tile(7,4)).
teleport(tile(1,5), tile(3,1)).
teleport(tile(2,2), tile(4,5)).
teleport(tile(3,1), tile(1,5)).
teleport(tile(3,2), tile(6,4)).
teleport(tile(3,3), tile(4,3)).
teleport(tile(4,3), tile(3,3)).
teleport(tile(4,5), tile(2,2)).
teleport(tile(6,4), tile(3,2)).
% empty tiles
getInstruction(tile(1,3), solution(I,_,_,_,_,_,_,_,_,_,_,_), I).
getInstruction(tile(2,1), solution(_,I,_,_,_,_,_,_,_,_,_,_), I).
getInstruction(tile(2,3), solution(_,_,I,_,_,_,_,_,_,_,_,_), I).
getInstruction(tile(2,5), solution(_,_,_,I,_,_,_,_,_,_,_,_), I).
getInstruction(tile(3,4), solution(_,_,_,_,I,_,_,_,_,_,_,_), I).
getInstruction(tile(3,5), solution(_,_,_,_,_,I,_,_,_,_,_,_), I).
getInstruction(tile(4,2), solution(_,_,_,_,_,_,I,_,_,_,_,_), I).
getInstruction(tile(4,4), solution(_,_,_,_,_,_,_,I,_,_,_,_), I).
getInstruction(tile(5,2), solution(_,_,_,_,_,_,_,_,I,_,_,_), I).
getInstruction(tile(5,4), solution(_,_,_,_,_,_,_,_,_,I,_,_), I).
getInstruction(tile(6,2), solution(_,_,_,_,_,_,_,_,_,_,I,_), I).
getInstruction(tile(6,3), solution(_,_,_,_,_,_,_,_,_,_,_,I), I).

% managing visited tiles
visitedStart(visited(f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,t,f)).
visitedAll(visited(t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t)).
updateVisited(tile(1,3), visited(_,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(t,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(1,5), visited(X0,_,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,t,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(2,1), visited(X0,X1,_,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,t,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(2,2), visited(X0,X1,X2,_,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,t,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(2,3), visited(X0,X1,X2,X3,f,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,t,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(2,5), visited(X0,X1,X2,X3,X4,f,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,t,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(3,1), visited(X0,X1,X2,X3,X4,X5,_,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,t,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(3,2), visited(X0,X1,X2,X3,X4,X5,X6,_,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,t,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(3,3), visited(X0,X1,X2,X3,X4,X5,X6,X7,_,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,t,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(3,4), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,_,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,t,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(3,5), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,_,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,t,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(4,2), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,f,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,t,X12,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(4,3), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,_,X13,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,t,X13,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(4,4), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,f,X14,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,t,X14,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(4,5), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,_,X15,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,t,X15,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(5,2), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,_,X16,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,t,X16,X17,X18,X19,X20,X21)).
updateVisited(tile(5,4), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,_,X17,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,t,X17,X18,X19,X20,X21)).
updateVisited(tile(6,2), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,_,X18,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,t,X18,X19,X20,X21)).
updateVisited(tile(6,3), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,_,X19,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,t,X19,X20,X21)).
updateVisited(tile(6,4), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,_,X20,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,t,X20,X21)).
updateVisited(tile(7,3), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,_,X21), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,t,X21)).
updateVisited(tile(7,4), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,_), visited(X0,X1,X2,X3,X4,X5,X6,X7,X8,X9,X10,X11,X12,X13,X14,X15,X16,X17,X18,X19,X20,t)).

% User-written solution:
givenSolution(solution(rewind, down, up, jump, down, jump, right, right, jump, down, up, left)).



main :- checkSolution(S).
%, givenSolution(S).
:- main.