import Lean
import GadgetGameSolver.Primitives

namespace GadgetGame

open Lean Meta

abbrev VarAssignmentCtx := PersistentHashMap String Term

variable [Monad M] [MonadStateOf VarAssignmentCtx M] [MonadFinally M] [MonadBacktrack VarAssignmentCtx M]

partial def Term.instantiateVars (t : Term) : M Term := do
  let ctx ← getThe VarAssignmentCtx
  match t with
  | .var v =>
    match ctx.find? v with
    | .some s => return s -- this assumes the context is up-to-date
    | .none => return .var v
  | .app f args => .app f <$> args.mapM instantiateVars

def Axiom.instantiateVars («axiom» : Axiom) : M Axiom := do
  return {
    hypotheses := ← «axiom».hypotheses.mapM Term.instantiateVars
    conclusion := ← «axiom».conclusion.instantiateVars
  }

def assign (var : String) (t : Term) : ExceptT String M Unit := do
  let ctx ← getThe VarAssignmentCtx
  let t ← t.instantiateVars
  if t == .var var then
    return () -- no need to assign
  unless ! t.containsVar? var do
    throw "Occur check failed."
  match ctx.find? var with
  | .some s =>
    unless Term.isEq s t do
      throw "Inconsistent assignment."
  | none => do
    let ctx' := ctx.map <| Term.substitute var t
    set <| ctx'.insert var t

partial def Term.unifyCore (s t : Term) : StateT Nat (ExceptT String M) Unit := do
  match s, t with
  | .var v, t =>
    match (← getThe VarAssignmentCtx).find? v with
    | .some s => unifyCore s t
    | none => assign (M := M) v t
  | s, .var v =>
    match (← getThe VarAssignmentCtx).find? v with
    | .some t => unifyCore s t
    | none => assign (M := M) v s
  | .app f args, .app f' args' =>
    unless f = f' do
      throw s!"Function arguments {f} and {f'} do not match."
    unless args.size = args'.size do
      throw "The number of arguments does not match."
    modify Nat.succ -- the score is incremented by one every time the function heads match up
    for (arg, arg') in Array.zip args args' do
      unifyCore arg arg'

def Term.unify (s t : Term) : ExceptT String M Unit := do
  Term.unifyCore s t |>.run' 0

def Term.unifyWithScore (s t : Term) : ExceptT String M Nat := do
  Prod.snd <$> (Term.unifyCore s t |>.run 0)

def Term.unifiable? (s t : Term) : M Bool := withoutModifyingState do
  return (← unify s t |>.run).toBool

def Term.subsumes (t s : Term) : Bool :=
  -- the order of the arguments to `Term.unify` ensures that the meta-variables in `t` get instantiated preferentially
  let (result, ctx) := Term.unify (M := StateM VarAssignmentCtx) t s |>.run {}
  match result with
  | .ok _ =>
      ! (s.collectVarsDedup.any ctx.contains) ∧ ! (ctx.toArray.any fun (_, val) => val matches .app _ _)
  | .error _ => false

def deallocate (vars : Array String) : M Unit := do
  for var in vars do
    modifyThe VarAssignmentCtx (·.erase var)

def Term.filterRelevantAxioms (t : Term) (axioms : Array Axiom) (sort? : Bool) : M (Array Axiom) := withoutModifyingState do
  let relevantAxiomsWithScores : Array (Axiom × Nat) ← axioms.filterMapM fun «axiom» ↦ withoutModifyingState do
    let .ok score ← (Term.unifyWithScore «axiom».conclusion t).run | return none
    return («axiom», score)
  let relevantAxiomsSorted :=
    if sort? then
      relevantAxiomsWithScores.qsort (·.snd > ·.snd)
    else
      relevantAxiomsWithScores
  return relevantAxiomsSorted.map Prod.fst

def Axiom.instantiateFresh (extension : String) («axiom» : Axiom) : M Axiom := do
  let freshVarCtx : PersistentHashMap String Term := «axiom».collectVarsDedup.foldl (init := .empty)
    fun ctx v ↦ ctx.insert v (.var <| modify v)
  withoutModifyingState do
    set freshVarCtx
    «axiom».instantiateVars
where
  modify : String → String := (· ++ "_" ++ extension)

end GadgetGame
