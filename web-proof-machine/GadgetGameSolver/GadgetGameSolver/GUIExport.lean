import Lean
import GadgetGameSolver.ProofTreeZipper
import ProofWidgets

namespace GadgetGame

abbrev GadgetId := String
abbrev EdgeId := String

structure Position where
  x : Int
  y : Int
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
    ("from", c.source),
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

structure ProofResult.RenderingParams where
  holeWidth : Nat := 15
  nodePadding : Nat := 25
  gadgetThickness : Nat := 150

structure ProofResult.RenderingState extends InitialDiagram where
  location : Array Nat := #[]
  xOffset : Int
  yOffset : Int

section LensNotation

-- from https://leanprover.zulipchat.com/#narrow/stream/270676-lean4/topic/Lens-like.20notation/near/409670188

syntax ident "%~" : term
syntax ident "%~" term : term
macro_rules
| `($n:ident %~ $f $x) => `({ $x with $n:ident := $f $x.$n })
| `($n:ident %~ $f) => `(fun x => { x with $n:ident := $f x.$n })
| `($n:ident %~) => `(fun f x => { x with $n:ident := f x.$n })

end LensNotation

def goalGadgetId : String := "goal_gadget"

def mkGadgetId (loc : Array Nat) : String :=
  s!"gadget_{loc}"

def mkEdgeId (sourceLoc : Array Nat) (childIdx : Nat) : String :=
  s!"edge_{sourceLoc}_{childIdx}"

def nodeSize (term : Term) : ReaderM ProofResult.RenderingParams Nat := do
  let params ← read
  match term with
    | .var _ => return 0
    | .app _ args => return 2 * params.nodePadding + params.holeWidth * args.size

partial def ProofResult.exportToGraph : ProofResult → StateT RenderingState (ReaderM RenderingParams) Unit
  | ⟨_, .goal term⟩ => do
    let state ← get
    let nodeHeight ← nodeSize term
    set { state with
          yOffset := state.yOffset + nodeHeight }
  | ⟨stmt, .node ax _ goals⟩ => do
    let params ← read
    let state ← get
    let headId := mkGadgetId state.location

    goals.enum.forM fun (idx, tree) ↦ do
      let treeLoc := state.location.push idx
      modify ({ · with
            location := treeLoc,
            xOffset := state.xOffset - params.gadgetThickness })
      exportToGraph ⟨stmt, tree⟩
      unless tree matches .goal _ do
        modify <| connections %~ (·.push {
          source := mkGadgetId treeLoc,
          target := headId,
          targetPosition := idx
          })

    let yOffsetNew := max (state.yOffset + (← nodeSize ax.conclusion)) (← get).yOffset

    modify ({· with location := state.location, xOffset := state.xOffset, yOffset := yOffsetNew })

    let gadgetProps : InitialDiagramGadget := {
      id := mkGadgetId state.location,
      statement := .axiom ax,
      position := {
        x := state.xOffset,
        y := (state.yOffset + yOffsetNew) / 2
      }
    }

    modify <| gadgets %~ (·.push gadgetProps)

    if state.location.isEmpty then
      let goalGadgetProps : InitialDiagramGadget := {
        id := goalGadgetId,
        statement := .goal stmt,
        position := {
          gadgetProps.position with
          x := state.xOffset + params.gadgetThickness
        }
      }

      modify <| gadgets %~ (·.push goalGadgetProps)
      modify <| connections %~ (·.push {
        source := gadgetProps.id,
        target := goalGadgetId,
        targetPosition := 0
      })

def ProofResult.getGadgetGraph (proofResult : ProofResult) : InitialDiagram :=
  let (_, state) := proofResult.exportToGraph |>.run { xOffset := -({} : RenderingParams).gadgetThickness, yOffset := 0 } |>.run {}
  state.toInitialDiagram -- TODO: re-center goal gadget to (0, 0)

open Lean ProofWidgets Server

@[widget_module] def GadgetGraph : Component InitializationData where
  javascript := include_str ".." / ".." / "js-build" / "InfoviewGame.js"

end GadgetGame
