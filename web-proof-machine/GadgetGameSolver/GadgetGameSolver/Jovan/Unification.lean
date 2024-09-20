import Lean
import GadgetGameSolver.Primitives

namespace JovanGadgetGame

open GadgetGame

abbrev MetavarContext := Lean.PersistentHashMap String Term

variable {m : Type → Type} [Monad m] [MonadStateOf MetavarContext m]

partial def instantiateVars (t : Term) : m Term := do
  match t with
  | .var v =>
    match (← get).find? v with
    | some t =>
      let t ← instantiateVars t
      modify (·.insert v t)
      pure t
    | none => return .var v
  | .app f args => .app f <$> args.mapM instantiateVars


def assign (var : String) (t : Term) : m Bool := do
  let mctx ← get
  if t == .var var then
    return true -- no need to assign
  if t.containsVar? var then
    return false
  match mctx.find? var with
  | .some s =>
    return s == t
  | none => do
    set <| mctx.insert var t
    return true

partial def unifyCore (s t : Term) : m Bool := do
  match s, t with
  | .var v, t =>
    match (← get).find? v with
    | .some s => unifyCore s t
    | none => assign v (← instantiateVars t)
  | s, .var v =>
    match (← get).find? v with
    | .some t => unifyCore s t
    | none => assign v (← instantiateVars s)
  | .app f args, .app f' args' =>
    if f == f' && args.size == args'.size then
      args.size.allM fun i => unifyCore args[i]! args'[i]!
    else
      pure false

def unify (s t : Term) : m Bool := do
  let mctx ← get
  if ← unifyCore s t then
    pure true
  else
    set mctx
    pure false

partial def setToCore (s t : Term) : m Bool := do
  match s, t with
  | .var v, t =>
    match (← get).find? v with
    | .some s => setToCore s t
    | none => assign v t
  | .app _ _, .var _ =>
    dbg_trace s!"{s} can't be set to {t}";

    pure false
  | .app f args, .app f' args' =>
    if f == f' && args.size == args'.size then
      args.size.allM fun i => setToCore args[i]! args'[i]!
    else
      dbg_trace s!"{s} can't be set to {t}";
      pure false

def setTo (s t : Term) : m Bool := do
  let mctx ← get
  if ← setToCore s (← instantiateVars t) then
    pure true
  else
    set mctx
    pure false
