import Std.Data.HashMap
import Lean
universe u v w

@[inline] def Nat.foldM' {α : Type u} {m : Type u → Type v} [Monad m] (n : Nat) (f : (i : Nat) → α → {_ : i < n} → m α) (init : α) : m α :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) (a : α) :=
    match h':i with
    | 0   => pure a
    | i'+1 => @f (n-i) a (by omega) >>= loop i' (Nat.le_of_succ_le h)
  loop n (Nat.le_refl n) init

@[inline] def Nat.forM' {m : Type → Type u} [Monad m] (n : Nat) (f : (i : Nat) → {_ : i < n} → m Unit) : m Unit :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) :=
    match h':i with
    | 0   => pure ()
    | i'+1 => do @f (n-i) (by omega); loop i' (Nat.le_of_succ_le h)
  loop n (Nat.le_refl n)

@[inline] def Nat.allM' {m : Type → Type u} [Monad m] (n : Nat) (p : (i : Nat) → {_ : i < n} → m Bool) : m Bool :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) :=
    match h':i with
    | 0   => pure true
    | i'+1 => do
      match ← @p (n-(i'.succ)) (by omega) with
      | true  => loop i' (le_of_succ_le h)
      | false => pure false
  loop n (Nat.le_refl n)

@[inline] def Nat.anyM' {m : Type → Type u} [Monad m] (n : Nat) (p : (i : Nat) → {_ : i < n} → m Bool) : m Bool :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) :=
    match h':i with
    | 0   => pure false
    | i'+1 => do
      match ← @p (n-(i'.succ)) (by omega) with
      | true  => pure true
      | false => loop i' (le_of_succ_le h)
  loop n (Nat.le_refl n)




variable {α : Type u} {β : Type v} {_ : BEq α} {_ : Hashable α}

def Std.HashMap.eraseGetD (m : HashMap α β) (a : α) (fallback : β) : HashMap α β × β :=
  match m[a]? with
  | some b => (m.erase a, b)
  | none   => (m, fallback)

@[inline] def Std.HashMap.modify (m : HashMap α β) (a : α) (f : β → β) : HashMap α β :=
  match m[a]? with
  | some b =>
    let m := m.erase a
    m.insert a (f b)
  | none => m

@[inline] def Std.HashMap.modify' (m : HashMap α β) (a : α) (f : Option β → β) : HashMap α β :=
  let b := m[a]?
  let m := if b.isSome then m.erase a else m
  m.insert a (f b)

variable {β : Type u} {m : Type u → Type u} [Monad m]

@[inline] def Std.HashMap.modifyM (map : HashMap α β) (a : α) (f : β → m β) : m (HashMap α β) := do
  match map[a]? with
  | some b =>
    let map := map.erase a
    return map.insert a (← f b)
  | none => return map

@[inline] def Std.HashMap.modifyM' (map : HashMap α β) (a : α) (f : Option β → m β) : m (HashMap α β) := do
  let b := map[a]?
  let map := if b.isSome then map.erase a else map
  return map.insert a (← f b)





def Enumerating (α : Type u) := α
def enumerate (a : α) : Enumerating α := a
def Array.enumerate (arr : Array α) : Enumerating (Array α) := arr

@[inline] def ArrayEnumerate.forIn {α : Type u} {β : Type v} {m : Type v → Type w} [Monad m] (as : Array α) (b : β) (f : (Nat × α) → β → m (ForInStep β)) : m β :=
  let rec @[specialize] loop (i : Nat) (b : β) : m β := do
    if h : i < as.size then
      match (← f (i, as[i]) b) with
      | ForInStep.done  b => pure b
      | ForInStep.yield b => loop (i+1) b
    else
      pure b
  termination_by as.size - i
  loop 0 b

instance : ForIn m (Enumerating (Array α)) (Nat × α) where
  forIn := ArrayEnumerate.forIn

structure WithCount (ρ : Type u) where
  count : Nat
  val   : ρ

variable {ρ : Type u}

instance [ToStream α ρ] : ToStream (Enumerating α) (WithCount ρ) where
  toStream (r : α) := { count := 0, val := toStream r }

instance [Stream ρ α] : Stream (WithCount ρ) (Nat × α) where
  next? s :=
    let { count, val } := s
    match Stream.next? val with
    | none => none
    | some (next, nextVal) => some ((count, next), { count := count + 1, val := nextVal })

instance [ToStream β ρ] [Stream ρ α] : ForIn m (Enumerating β) (Nat × α) where
  forIn a := Stream.forIn (toStream a)

-- def ha : IO Unit := do
--   for (n, e) in enumerate [1,2,5,6] do
--     IO.println n
-- #eval ha




open Lean.Parser in
@[term_parser] def structMod := leading_parser:argPrec
  "%%." >> checkNoWsBefore >> (fieldIdx <|> rawIdent) >> termParser leadPrec

macro_rules
| `(%%.$field:ident    $f) => `(fun struct => { struct with $field:ident    := $f struct.$field})
| `(%%.$field:fieldIdx $f) => `(fun struct => { struct with $field:fieldIdx := $f struct.$field})


variable (x : Nat × Nat) (y : (Nat × Nat → Nat × Nat) → Int)



-- #check y %%.fst Nat.add 1
-- #check %%.fst Nat.add 1 <| x
-- #check x |> %%.fst Nat.add 1
-- #check x |> %%.1 Nat.add 1
