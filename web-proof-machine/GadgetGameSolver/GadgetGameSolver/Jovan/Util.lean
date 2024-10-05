

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
