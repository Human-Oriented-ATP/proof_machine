import Lake
open Lake DSL

package «GadgetGameSolver» where
  leanOptions := #[⟨`autoImplicit, false⟩]
  -- add package configuration options here

lean_lib «GadgetGameSolver» where
  -- precompileModules := true
  -- add library configuration options here

@[default_target]
lean_exe «gadgetgamesolver» where
  root := `Main

require "leanprover-community" / "proofwidgets" @ git "v0.0.42"
