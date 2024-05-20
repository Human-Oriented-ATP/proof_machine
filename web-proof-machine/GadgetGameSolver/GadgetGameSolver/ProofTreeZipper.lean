import GadgetGameSolver.Primitives
import GadgetGameSolver.Unification
import Lean

namespace GadgetGame

open Lean

inductive ProofTree where
  | goal (term : Term)
  | node (term : Term) (goals : List ProofTree)
deriving Inhabited

inductive Path where
  | root
  | node (youngerSiblings : List ProofTree) (parent : Path) (term : Term) (elderSiblings : List ProofTree)
deriving Inhabited

structure Location where
  tree : ProofTree
  path : Path
deriving Inhabited

def goLeft (loc : Location) : Location :=
  match loc.path with
  | .root => panic! "Cannot go to the left of the root."
  | .node (l :: left) up t right =>
    { tree := l, path := .node left up t (loc.tree :: right) }
  | .node [] _ _ _ => panic! "Reached left-most end."

def goRight (loc : Location) : Location :=
  match loc.path with
  | .root => panic! "Cannot go to the right of the root."
  | .node left up t (r :: right) =>
    { tree := r, path := .node (loc.tree :: left) up t right }
  | .node _ _ _ [] => panic! "Reached right-most end."

def goUp (loc : Location) : Location :=
  match loc.path with
  | .root => panic! "Cannot go above the root."
  | .node left up t right => { tree := .node t (left.reverse ++ [loc.tree] ++ right), path := up }

def goDown (loc : Location) : Location :=
  match loc.tree with
  | .goal _ => panic! "Cannot go below a goal node."
  | .node term (tree :: trees) =>
    { tree := tree, path := .node [] loc.path term trees }
  | .node _ [] => panic! "Node has no children."

def change (loc : Location) (tree : ProofTree) : Location :=
  { tree := tree, path := loc.path }

end GadgetGame
