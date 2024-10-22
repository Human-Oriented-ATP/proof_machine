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
  tree : Lean.RBNode π (fun _ => α) := {}

namespace PriorityQueue

variable {π : Type u} {α : Type v} {cmp : π → π → Ordering }

@[inline]
def top (q : PriorityQueue π α cmp) : Option (π × α) :=
  match q.tree.max with
  | some ⟨k, v⟩ => some (k, v)
  | none        => none

@[inline]
def erase (p : π) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree := q.tree.erase cmp p }

@[inline]
def find? (p : π) (q : PriorityQueue π α cmp) : Option α :=
  q.tree.find cmp p

@[inline]
def insert (p : π) (a : α) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree := q.tree.insert cmp p a }

open Lean.RBNode in
@[specialize] private def modifyNode (cmp : π → π → Ordering) (p : π) (f : α → α) : Lean.RBNode π (fun _ => α) → Lean.RBNode π (fun _ => α)
  | leaf             => leaf
  | node c a p' v b =>
    match cmp p p' with
    | Ordering.lt => node c (modifyNode cmp p f a) p' v b
    | Ordering.gt => node c a p' v (modifyNode cmp p f b)
    | Ordering.eq => node c a p' (f v) b


@[inline]
def modify (p : π) (f : α → α) (q : PriorityQueue π α cmp) : PriorityQueue π α cmp :=
  { tree := modifyNode cmp p f q.tree  }

end PriorityQueue

def PriorityBucketQueue (π : Type u) (α : Type v) (cmp : π → π → Ordering) := PriorityQueue π (List α) cmp

namespace PriorityBucketQueue

variable {π : Type u} {α : Type v} {cmp : π → π → Ordering }

@[inline]
def insert' (p : π) (a : List α) (q : PriorityBucketQueue π α cmp) : PriorityBucketQueue π α cmp :=
  q.insert p a

@[inline]
def insert (p : π) (a : α) (q : PriorityBucketQueue π α cmp) : PriorityBucketQueue π α cmp :=
  let rest := (q.find? p).getD []
  { tree := q.tree.insert cmp p (a :: rest) }

end PriorityBucketQueue
