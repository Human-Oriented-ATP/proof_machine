import Lean
import GadgetGameSolver.ProofTreeZipper
import ProofWidgets

namespace GadgetGame

abbrev GadgetId := String
abbrev EdgeId := String

structure Position where
  x : Nat
  y : Nat
deriving Repr, Lean.ToJson

structure InitialDiagramGadget where
  id : GadgetId
  statement : Statement
  position : Position
deriving Repr, Lean.ToJson

structure InitialDiagramConnection where
  source : GadgetId
  target : GadgetId
  targetPosition : Nat
deriving Repr

instance : Lean.ToJson InitialDiagramConnection where
  toJson c := .mkObj [
    ("from", .arr #[c.source, (-1 : Int)]),
    ("to", .arr #[c.target, c.targetPosition])
  ]

structure InitialDiagram where
  gadgets : Array InitialDiagramGadget := #[]
  connections : Array InitialDiagramConnection := #[]
deriving Lean.ToJson, Repr

structure InitializationData where
  initialDiagram : InitialDiagram
  axioms : Array Axiom
deriving Lean.ToJson, Repr

structure ProofTree.RenderingParams where
  holeWidth : Nat := 5
  nodePadding : Nat := 5
  gadgetThickness : Nat := 250

structure ProofTree.RenderingState extends InitialDiagram where
  location : Array Nat := #[]
  xOffset : Nat
  yOffset : Nat

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

def mkEdgeId (sourceLoc : Array Nat) (childIdx : Nat) : String :=
  s!"edge_{sourceLoc}_{childIdx}"

def nodeSize (term : Term) : ReaderM ProofTree.RenderingParams Nat := do
  let params ← read
  match term with
    | .var _ => return 0
    | .app _ args => return 2 * params.nodePadding + params.holeWidth * args.size

partial def ProofTree.exportToGraph : ProofTree → StateT ProofTree.RenderingState (ReaderM ProofTree.RenderingParams) Unit
  | .goal term => do
    let state ← get
    let nodeHeight ← nodeSize term
    let gadgetProps : InitialDiagramGadget := {
      id := mkGadgetId state.location,
      statement := .goal term,
      position := {
        x := state.xOffset,
        y := state.yOffset + nodeHeight / 2
      }
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
            xOffset := state.xOffset - params.gadgetThickness })
      exportToGraph tree
      modify <| connections %~ (·.push {
        source := headId,
        target := mkGadgetId treeLoc,
        targetPosition := idx
        })

    let yOffsetNew := max (state.yOffset + (← nodeSize term)) (← get).yOffset

    modify ({· with location := state.location, xOffset := state.xOffset, yOffset := yOffsetNew })

    let gadgetProps : InitialDiagramGadget := {
      id := s!"gadget_{state.location}",
      statement := .axiom {
        hypotheses := goals.toArray.map ProofTree.headTerm,
        conclusion := term
      },
      position := {
        x := state.xOffset,
        y := (state.yOffset + yOffsetNew) / 2
      }
    }

    modify <| gadgets %~ (·.push gadgetProps)

def ProofTree.getGadgetGraph (proofTree : ProofTree) : InitialDiagram :=
  let (_, state) := proofTree.exportToGraph |>.run { xOffset := proofTree.depth * RenderingParams.gadgetThickness {}, yOffset := 0 } |>.run {}
  state.toInitialDiagram

open Lean ProofWidgets Server

-- TODO: Needs updating
/-

@[widget_module]
def GadgetGraph : Component GadgetGraphProps where
  javascript := include_str ".." / ".." / "js-build" / "StaticDiagram.js"

-/

-- open Lean Server Elab Command Json
-- elab stx:"#gadget" : command => runTermElabM fun _ => do
--   let props  : GadgetGraphProps := { gadgets := #[{
--       id := "test_gadget",
--       inputs := #[.app "x" #[]],
--       output? := some (.app "f" #[.app "b" #[]]),
--       x := 0,
--       y := 0
--     }] }
--   Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
--     (return Lean.toJson props) stx

-- #gadget

end GadgetGame
