import GadgetGameSolver.Primitives
import GadgetGameSolver.Unification
import Lean

variable {M : Type → Type}
-- TODO: Move
def modifyWithExcept {α ε : Type} [Monad M] [MonadStateOf α M] [MonadExceptOf ε M] (mod : α → Except ε α) : M Unit := do
  match mod (← getThe α) with
  | .ok a => set a
  | .error e => throw e

def iterateM [Monad M] (act : M Unit) : (count : Nat) → M Unit
  | 0 => pure ()
  | n+1 => do
    act
    iterateM act n

namespace GadgetGame

open Lean

inductive ProofTree where
  | goal (term : Term)
  | node («axiom» : Axiom) (goals : List ProofTree)
deriving Inhabited, Repr

structure ProofResult where
  statement : Term
  proof : ProofTree

def ProofTree.headTerm : ProofTree → Term
  | .goal term => term
  | .node «axiom» _ => «axiom».conclusion

abbrev ProofTree.isClosed : ProofTree → Prop
  | .goal _ => False
  | .node _ [] => True
  | .node a (_goal::goals) => _goal.isClosed ∧ (ProofTree.node a goals).isClosed

instance ProofTree.decideIfClosed : DecidablePred ProofTree.isClosed
  | .goal _ => by
    rw [isClosed]
    infer_instance
  | .node _ [] => inferInstanceAs <| Decidable True
  | .node a (_goal::goals) => by
    rw [isClosed]
    exact instDecidableAnd (dp := decideIfClosed _goal) (dq := decideIfClosed <| .node a goals)

partial def ProofTree.depth : ProofTree → Nat
  | .goal _ => 0
  | .node _ goals => 1 + (goals.map depth).maximum?.getD 0

abbrev ClosedProofTree := { tree : ProofTree // tree.isClosed }

instance : Inhabited ClosedProofTree where
  default := ⟨.node default [], trivial⟩

inductive Path where
  | root
  | node (youngerSiblings : List ProofTree) (parent : Path) («axiom» : Axiom) (elderSiblings : List ProofTree)
deriving Inhabited

structure Location where
  tree : ProofTree
  path : Path
deriving Inhabited

namespace Location

def goLeft (loc : Location) : Except String Location :=
  match loc.path with
  | .root => throw "Cannot go to the left of the root."
  | .node (l :: left) up ax right =>
    .ok { tree := l, path := .node left up ax (loc.tree :: right) }
  | .node [] _ _ _ => throw "Reached left-most end."

def goRight (loc : Location) : Except String Location :=
  match loc.path with
  | .root => throw "Cannot go to the right of the root."
  | .node left up ax (r :: right) =>
    .ok { tree := r, path := .node (loc.tree :: left) up ax right }
  | .node _ _ _ [] => throw "Reached right-most end."

def goUp (loc : Location) : Except String Location :=
  match loc.path with
  | .root => throw "Cannot go above the root."
  | .node left up ax right => .ok { tree := .node ax (left.reverse ++ [loc.tree] ++ right), path := up }

def goDown (loc : Location) : Except String Location :=
  match loc.tree with
  | .goal _ => throw "Cannot go below a goal node."
  | .node ax (tree :: trees) =>
    .ok { tree := tree, path := .node [] loc.path ax trees }
  | .node _ [] => throw "Node has no children."

def change (loc : Location) (tree : ProofTree) : Location :=
  { tree := tree, path := loc.path }

end Location


variable [Monad M] [MonadStateOf Location M] [MonadExceptOf String M]

def goUp : M Unit := modifyWithExcept Location.goUp

def goDown : M Unit := modifyWithExcept Location.goDown

def goRight : M Unit := modifyWithExcept Location.goRight

def goLeft : M Unit := modifyWithExcept Location.goLeft

def goUpBy := iterateM (M := M) goUp

def goDownBy := iterateM (M := M) goDown

def goRightBy := iterateM (M := M) goRight

def goLeftBy := iterateM (M := M) goLeft

def visitChild (idx : Nat) : M Unit := do
  goDown
  goRightBy idx

def forEachChild (act : M Unit) : M Unit := do
  let ⟨.node _ goals, _⟩ ← getThe Location | throw "No children nodes found."
  for idx in [0:goals.length] do
    visitChild idx
    act
    goUp

def isRoot : M Bool := do
  let loc ← getThe Location
  return loc.path matches .root

partial def goToRoot : M Unit := do
  if ← isRoot then
    return ()
  else
    goUp
    goToRoot

def changeCurrentTree (tree : ProofTree) : M Unit := do
  modify <| Location.change (tree := tree)

end GadgetGame
