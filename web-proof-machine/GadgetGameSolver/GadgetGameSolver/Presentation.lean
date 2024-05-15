-- import LeanSlides
import Lean

/-!

# Typeclasses

Typeclasses are a systematic way of recording information about objects defined in the language.

Through *typeclass inference*, a programming language can synthesise missing information by
combining and specialising various facts in its database of typeclass instances.

---

Typeclasses originated as a principled way to allow overloading of notation.

For example, one may want to perform addition of natural numbers using the `+` symbol
while also using this symbol for point-wise addition on lists of numbers.

Typeclasses give a way of defining the behaviour of the operator on each type separately.

---

A typeclass can be also thought of as a *template*, and typeclass instances as data that fit this template.

For example, instances of the `Group` typeclass are groups like `ℤ`, `S¹` and `ℤ/5ℤ`.

This is similar to the idea of *theories* and *models*.

---

Typeclass instance declarations are allowed to depend on other typeclass instances.

This makes typeclass inference search more sophisticated than a mere look-up.

By *chaining* instances, it is possible to solve typeclass inferences problems via a recursive search with backtracking.

-/

namespace Demo

class Mul (α : Type) where
  mul : α → α → α

local infixr:100 (priority := high) "*" => Mul.mul

instance : Mul Nat where
  mul := Nat.mul

instance [Mul α] : Mul (List α) where
  mul l l' := List.zipWith Mul.mul l l'

#eval [1, 2, 3] * [2, 3, 4, 5]

#eval toString [1, 2]

instance : Coe α (List α) where
  coe a := [a]

#eval [1, 2, 3] * (5 : Nat)

class Inhabited (α : Type _) where
  default : α

instance : Inhabited Nat where
  default := 0

instance : Inhabited Bool where
  default := false

instance [Inhabited A] [Inhabited B] : Inhabited (A × B) where
  default := (Inhabited.default, Inhabited.default)

instance {A B : Type} [Inhabited B] : Inhabited (A → B) where
  default := fun _ ↦ Inhabited.default

#synth Inhabited (Nat × Bool → Nat)

class Semigroup (α : Type _) extends Mul α where
  mul_assoc : ∀ a b c : α, (a * b) * c = a * (b * c)

instance : Semigroup Nat where
  mul_assoc := Nat.mul_assoc

#synth (DecidableEq Nat)

variable [DecidableEq α] {a : α} (l l' : List α)
#synth DecidablePred (· ∈ l)

#eval decide (2 ∈ [1, 2, 3])

instance : HasSubset (List α) where
  Subset l l' := ∀ a ∈ l, a ∈ l'

instance [DecidablePred P] : Decidable (∀ a ∈ l, P a) :=
  match l with
  | [] => .isTrue (by simp)
  | a :: as => by
    simp
    infer_instance

instance (l l' : List α) : Decidable (l ⊆ l') := inferInstanceAs <| Decidable (∀ a ∈ l, (· ∈ l') a)

#synth Decidable (l ⊆ l')

#eval decide ([1, 2] ⊆ [1, 2, 3, 4])

end Demo
