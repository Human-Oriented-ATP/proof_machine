import Std.Data.HashMap

namespace JovanGadgetGame

structure UnionFind (α : Type) [BEq α] [Hashable α] where
  map : Std.HashMap α α
  deriving Inhabited

variable {α : Type} [BEq α] [Hashable α] [Inhabited α]

namespace UnionFind

/-- Size of union-find structure. -/
@[inline] abbrev size (self : UnionFind α) := self.map.size

/-- Create an empty union-find structure with specific capacity -/
def mkEmpty (c : Nat) : UnionFind α where
  map := .empty c

/-- Empty union-find structure -/
def empty : UnionFind α := mkEmpty 0

instance : EmptyCollection (UnionFind α) := ⟨.empty⟩

/-- Add a new node to a union-find structure, unlinked with any other nodes -/
def insert (self : UnionFind α) (a : α) : UnionFind α where
  map := self.map.insert a a

-- /-- Root of a union-find node. -/
-- partial def root (self : UnionFind α) (x : α) : α :=
--   let y := self.map[x]!
--   if y == x then
--     x
--   else
--     self.root y

/-- Auxiliary function for find operation -/
partial def find' (self : UnionFind α) (x : α) : UnionFind α × α :=
  let y := self.map[x]!
  if y == x then
    (self, x)
  else
    let (self, root) := self.find' y
    ({ map := self.map.insert x root }, root)

/-- Link two union-find nodes -/
def link' (self : UnionFind α) (x y : α) : UnionFind α where
  map := self.map.insert y x

/-- Link two union-find nodes, uniting their respective classes. -/
def union' (self : UnionFind α) (x y : α) : UnionFind α :=
  let (self, x) := self.find' x
  let (self, y) := self.find' y
  self.link' x y

end UnionFind

class MonadUnionFind (α : Type) [BEq α] [Hashable α] (m : Type → Type) where
  getUnionFind    : m (UnionFind α)
  modifyUnionFind : (UnionFind α → UnionFind α) → m Unit

export MonadUnionFind (getUnionFind modifyUnionFind)

namespace UnionFind

variable {m : Type → Type} [Monad m] [MonadUnionFind α m]

def add (a : α) : m Unit := do
  modifyUnionFind (·.insert a)

def find (a : α) : m α := do
  let self ← getUnionFind
  let (self, a) := self.find' a
  modifyUnionFind fun _ => self
  return a

def link (x y : α) : m Unit := do
  modifyUnionFind fun self => self.link' x y

def union (x y : α) : m Unit :=
  modifyUnionFind (·.union' x y)
