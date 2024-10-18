import Std.Data.HashMap
import Lean
universe u v

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

-- syntax:1000000 ident "%~" term : term

-- macro:max field:ident "%~" f:term:max : term => `(fun struct => { struct with $field:ident := $f struct.$field})


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
