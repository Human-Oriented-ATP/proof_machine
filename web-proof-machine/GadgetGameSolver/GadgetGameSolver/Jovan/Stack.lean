import Lean.Data.RBTree
namespace JovanGadgetGame

universe u v

structure Queue (α : Type u) where
  «in» : List α := []
  out  : List α := []

namespace Queue

variable {α : Type u}

def uncons? (q : Queue α) : Option (α × Queue α) :=
  match q.out with
  | a :: out => some (a, { q with out })
  | [] => match q.in.reverse with
    | a :: out => some (a, { out })
    | [] => none

def modifyTop (f : α → α) (q : Queue α) : Queue α :=
  match q.out with
  | a :: tail => { q with out := f a :: tail }
  | []        => match q.in.reverse with
    | a :: tail => { out := f a :: tail }
    | []        => {}

def cons (a : α) (q : Queue α) : Queue α :=
  { q with «in» := a :: q.in}

end Queue




structure PriorityQueue (π : Type u) (α : Type v) (cmp : π → π → Ordering) where
  tree : Lean.RBMap π α cmp := {}

namespace PriorityQueue

variable {π : Type u} {α : Type v} {cmp : π → π → Ordering }

@[inline]
def top (q : PriorityQueue π α cmp) : Option (π × α) :=
  q.tree.max

@[inline]
def erase (p : π) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree := q.tree.erase p }

@[inline]
def find? (p : π) (q : PriorityQueue π α cmp) : Option α :=
  q.tree.find? p

@[inline]
def insert (p : π) (a : α) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree := q.tree.insert p a }

@[inline]
def modify (p : π) (f : α → α) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree :=
    match q.tree.find? p with
    | none => {}
    | some a => q.tree.insert p (f a) }
