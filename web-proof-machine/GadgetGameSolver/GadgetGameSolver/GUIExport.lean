import Lean.Data.Json
import GadgetGameSolver.ProofTreeZipper

namespace GadgetGame

abbrev GadgetId := String

structure GadgetProps where
  id : GadgetId
  inputs : Array Term
  output? : Option Term := none
  isAxiom := false
deriving Lean.ToJson, Lean.FromJson

structure GadgetPropsWithPosition extends GadgetProps where
  x : Nat
  y : Nat
deriving Lean.ToJson, Lean.FromJson

structure Edge where
  source : GadgetId
  target : GadgetId
deriving Lean.ToJson, Lean.FromJson

structure ProofTree.RenderingParams where
  holeWidth : Nat := 25
  nodePadding : Nat := 10
  gadgetThickness : Nat := 50


structure ProofTree.RenderingState where
  location : Array Nat := #[]
  xOffset : Nat := 0
  yOffset : Nat := 0
  gadgets : Array GadgetPropsWithPosition := #[]
  edges : Array Edge := #[]

section LensNotation

-- from https://leanprover.zulipchat.com/#narrow/stream/270676-lean4/topic/Lens-like.20notation/near/409670188

syntax ident "%~" : term
syntax ident "%~" term : term
macro_rules
| `($n:ident %~ $f $x) => `({ $x with $n:ident := $f $x.$n })
| `($n:ident %~ $f) => `(fun x => { x with $n:ident := $f x.$n })
| `($n:ident %~) => `(fun f x => { x with $n:ident := f x.$n })

end LensNotation

def mkGadgetId (loc : Array Nat) : String :=
  s!"gadget_{loc}"

partial def ProofTree.exportToGraph : ProofTree → ReaderT ProofTree.RenderingParams (StateM ProofTree.RenderingState) Unit
  | .goal term => do
    let params ← read
    let state ← get
    let nodeHeight := 2 * params.nodePadding + term.argsSize
    let gadgetProps : GadgetPropsWithPosition := {
      id := mkGadgetId state.location,
      inputs := #[term],
      output? := none
      x := state.xOffset,
      y := state.yOffset + nodeHeight / 2
    }
    set { state with
          yOffset := state.yOffset + nodeHeight,
          gadgets := state.gadgets.push gadgetProps }
  | .node term goals => do
    let params ← read
    let state ← get
    let headId := mkGadgetId state.location

    goals.enum.forM fun (idx, tree) ↦ do
      let treeLoc := state.location.push idx
      modify ({ · with
            location := treeLoc,
            xOffset := state.xOffset + params.gadgetThickness })
      exportToGraph tree
      modify <| edges %~ (·.push { source := headId, target := mkGadgetId treeLoc })

    modify ({· with location := state.location, xOffset := state.xOffset })

    let gadgetProps : GadgetPropsWithPosition := {
      id := s!"gadget_{state.location}",
      inputs := goals.toArray.map ProofTree.headTerm,
      output? := some term,
      x := state.xOffset,
      y := (state.yOffset + (← get).yOffset) / 2
    }

    modify <| gadgets %~ (·.push gadgetProps)

end GadgetGame
