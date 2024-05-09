import Lean

open Lean Elab Meta Command Parser Term Tactic

inductive Term where
  | var (name : String)
  | app (label : String) (args : Array Term)
deriving Repr

instance : Inhabited _root_.Term where
  default := .var ""

structure Axiom where
  hypotheses : Array _root_.Term
  conclusion : _root_.Term
deriving Repr

structure ProblemState where
  axioms : Array Axiom
  target : _root_.Term
deriving Repr

partial def Lean.Expr.toTerm : Expr → OptionT MetaM _root_.Term
  | .const c _ => return .app c.toString #[]
  | e@(.app _ _) => e.withApp fun head args ↦ do
    let (_, binders, _) ← forallMetaTelescope (← inferType head)
    unless args.size == binders.size do
      throwError s!"Unequal number of binders and arguments."
    let explicitArgs := Array.zip args binders |>.filterMap fun (arg, binder) ↦
      match binder with
        | .default => some arg
        | _ => none
    let .const label _ := head | failure
    return .app label.toString <| ← explicitArgs.mapM toTerm
  | .mvar mvarId => return .var mvarId.name.toString
  | .fvar fvarId => return .var fvarId.name.toString
  | _ => failure

structure ProblemObfuscationState where
  colors : List String := ["r", "y", "g", "b", "w", "bl", "o", "p", "c"]
  outerLabels : HashMap String String := .empty
  innerLabels : HashMap String String := .empty
  vars : HashMap String String := .empty

partial def obfuscateTerm (outer? : Bool) (term : _root_.Term) : StateM ProblemObfuscationState _root_.Term := do
  match term with
  | .app label args => do
    if outer? then do
      match (← get).outerLabels.find? label with
      | some color => return .app color (← args.mapM <| obfuscateTerm false)
      | none => do
        let color :: colors' := (← get).colors | panic! "Insufficient colors."
        modify (fun σ ↦ { σ with colors := colors', outerLabels := σ.outerLabels.insert label color })
        return .app color (← args.mapM <| obfuscateTerm false)
    else
      match (← get).innerLabels.find? label with
      | some code => return .app code (← args.mapM <| obfuscateTerm false)
      | none =>
        let newLabel := s!"f_{(← get).innerLabels.size}"
        modify (fun σ ↦ { σ with innerLabels := σ.innerLabels.insert label newLabel })
        return .app newLabel (← args.mapM <| obfuscateTerm false)
  | .var name =>
    match (← get).vars.find? name with
    | some code => return .var code
    | none =>
      let newName := s!"X_{(← get).vars.size}"
      modify (fun σ ↦ { σ with vars := σ.vars.insert name newName })
      return .var newName

def obfuscateAxiom («axiom» : Axiom) : StateM ProblemObfuscationState Axiom := do
  return {
    hypotheses := ← «axiom».hypotheses.mapM (obfuscateTerm true),
    conclusion := ← obfuscateTerm true «axiom».conclusion
  }

def obfuscateProblemState (problemState : ProblemState) : StateM ProblemObfuscationState ProblemState := do
  return {
    axioms := ← problemState.axioms.mapM obfuscateAxiom,
    target := ← obfuscateTerm true problemState.target
  }

def ProblemState.obfuscate (problemState : ProblemState) : ProblemState :=
  obfuscateProblemState problemState |>.run' {}

partial def Term.toString : _root_.Term → String
  | .var v => v
  | .app f #[] => f
  | .app f args => s!"{f}({", ".intercalate (args.toList.map toString)})"

def Axiom.toString («axiom» : Axiom) : String :=
  if «axiom».hypotheses.isEmpty then
    s!"{«axiom».conclusion.toString}."
  else
    s!"{«axiom».conclusion.toString} :- {", ".intercalate («axiom».hypotheses.toList.map Term.toString)}."

def ProblemState.toString (problemState : ProblemState) : String :=
  s!"{"\n".intercalate (problemState.axioms.toList.map Axiom.toString)}\n:- {problemState.target.toString}."

def Axiom.ofInstType (instType : Expr) : MetaM Axiom := do
  let (mvars, binders, conclusion) ← forallMetaTelescope instType
  let some conclusion ← conclusion.toTerm | throwError m!"{conclusion} cannot be converted to a `Term`"
  let hypotheses ← Array.zip mvars binders |>.filterMapM fun (mvar, binder) ↦ do
    match binder with
      | .instImplicit => do
        let hyp ← inferType mvar
        hyp.toTerm
      | _ => return none
  return {
    hypotheses := hypotheses,
    conclusion := conclusion
  }

@[command_parser] def makeProblemState := leading_parser
  "#make_problem_state " >> termParser

@[command_elab makeProblemState]
def evalProblemState : CommandElab := fun stx =>
  let term := stx[1]
  withoutModifyingEnv <| runTermElabM fun _ => Term.withDeclName `_synth_cmd do
    let inst ← Term.elabTerm term none
    Term.synthesizeSyntheticMVarsNoPostponing
    let inst ← instantiateMVars inst
    let some conclusion ← inst.toTerm.run | throwError m!"Could not convert instance to `Term`"
    let val  ← synthInstance inst
    logInfo val
    let instancesData := instanceExtension.getState (← getEnv)
    let axioms : Array Axiom ← val.foldConsts (pure #[]) <| fun n acc ↦ do
      if let some entry := instancesData.instanceNames.find? n then
        let «axiom» ← Axiom.ofInstType <| ← inferType entry.val
        return (← acc).push «axiom»
      else acc
    let problemState : ProblemState := {
      axioms := axioms,
      target := conclusion
    }
    logInfo <| repr problemState.obfuscate.toString


section

class Test (A : Type) where

instance testProd [Test A] : Test (A × A) := sorry

instance testNat : Test Nat := sorry


#synth Test ((Nat × Nat) × (Nat × Nat))

#make_problem_state Test (Nat × Nat)

end
