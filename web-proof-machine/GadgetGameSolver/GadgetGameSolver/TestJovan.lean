import GadgetGameSolver.JovanSearch
import GadgetGameSolver.PrologParser
import GadgetGameSolver.GUIExport

open GadgetGame

open Lean Elab Meta Term Elab Command in
elab stx:"#gadget_display" name:str timeout?:(num)? : command => runTermElabM fun _ => do
  let problemState ← parsePrologFile s!"../problems/{name.getString}.pl"
  let (tree, numSteps, proofLog) ← JovanGadgetGame.runJovanSearch problemState (timeout?.map TSyntax.getNat) {
    depthFirst := true
    fewerCasesFirst := true
    -- simplerSolutionsFirst := false
    orderSubgoalsAndAxioms := true
    postponeLoopSearch := true
    postponeSpiralSearch := true
    useOldSpiralDetect  := false
    cacheSolutions := true
    easyGoalsFirst := false
  }
  logInfoAt stx m!"num steps: {numSteps}"

  -- logInfoAt stx m!"{proofLog}"

  -- -- unless tree.isClosed do
  -- --   throwError "The proof tree is not closed."
  -- let initDiagram := ProofResult.getGadgetGraph ⟨problemState.target, tree⟩
  -- let initData : InitializationData := {
  --   initialDiagram := initDiagram,
  --   axioms := problemState.axioms -- .empty
  -- }
  -- let jsonProps := Lean.toJson initData
  -- Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
  --   (return jsonProps) stx


-- #gadget_display "jacob18" 1560
-- #gadget_display "tim01" -- 973

-- #gadget_display "tim44"

-- #exit
-- #exit 44a and 5a
/- after #, I changed the step counting convention. -/
#gadget_display "tim_easy01" -- 6  - 5
#gadget_display "tim_easy02" -- 40 - 29 | 32 # 44
#gadget_display "tim_easy03" -- 40 - 11 - 13 - 5
#gadget_display "tim_easy04" -- ∞  - 10 - 11 # 12
#gadget_display "tim_easy05" -- ∞  - 59 ~ 38 # 42
#gadget_display "tim_easy06" -- ∞  - 109 ~ 112 # 126
#gadget_display "tim_easy07" -- 8  - 5
#gadget_display "tim_easy08" -- ∞  - 42 - 15 | 36 - 96 ~ 39 # 40
#gadget_display "tim_easy09" -- ∞  - 29 - ∞ - 34 - 36 - 34 | 40 - 28
#gadget_display "tim_easy10" -- 14 - 8  - 5
#gadget_display "tim_easy11" -- 3
#gadget_display "tim_easy12" -- ∞  - 24 - 21 - 31 - 21 - 25 - 21 | 28 ~ 21 # 22
#gadget_display "tim_easy13" -- 5  - 4


#gadget_display "tim03" -- ∞ - 42 ~ 115 # 143
#gadget_display "tim04" -- 41 | 36 ~ 29 # 31
-- #gadget_display "tim05a" -- ∞ - 299 ~ 303 / 396 # 701
#gadget_display "tim07" -- ∞ - 239 ~ 42 # 55
#gadget_display "tim08" -- 24 | 28 ~ 29 # 33
#gadget_display "tim10" -- 23 # 27
#gadget_display "tim11" -- 13 ~ 15 # 16
#gadget_display "tim12" -- 213 | 307 ~ 212 # 241
-- #gadget_display "tim14" -- ∞ - 39 # 52
#gadget_display "tim16" -- 17 | 19
#gadget_display "tim17" -- 28 | 9 ~ 12 # 13
#gadget_display "tim18" -- 19 | 18 ~ 14 # 14
#gadget_display "tim19" -- 12 ~ 9
#gadget_display "tim20" -- ∞ - 364 ~ 368 # 440
#gadget_display "tim22a" -- ∞ - 116 ~ 96 # 99
#gadget_display "tim22c" -- ∞ - 116 ~ 96 # 99
#gadget_display "tim23" -- 25 ~ 26 # 30
#gadget_display "tim24" -- 15 | 11 # 12
#gadget_display "tim25" -- 84 | 45 ~ 48 # 56
#gadget_display "tim25a" -- 32 | 34 ~ 28 # 29
-- #gadget_display "tim27" -- ∞ - 565 ~ 423 # 557
-- #gadget_display "tim31" -- ∞ - 1550 ~ 1538 / ∞
#gadget_display "tim33" -- 31 | 33
#gadget_display "tim36" -- 12 | 15
#gadget_display "tim43" -- 11 ~ 10
#gadget_display "tim44" -- ∞ - 115 ~ 98 # 129
-- #gadget_display "tim44a" -- ∞ - 143 ~ 83 # 94
#gadget_display "tim46" -- 123 | 90 # 133

-- #exit
-- #gadget_display "mirek_crazy4" -- 631 # 1020

-- #gadget_display "tim01" -- 973 # 1625
-- #gadget_display "tim05" -- 746 # 1299
#gadget_display "tim06" -- 556 #  676
#gadget_display "tim22b" -- 729 # 1489

#gadget_display "jacob01" -- 57 # 62
-- #gadget_display "jacob04" -- 50 # 52
#gadget_display "jacob05" -- 8
#gadget_display "jacob06" -- 99 # 126
#gadget_display "jacob07" -- 55 # 65
#gadget_display "jacob07a" -- 50 # 60
#gadget_display "jacob08" -- 142 # 154
#gadget_display "jacob08a" -- 109 # 121
#gadget_display "jacob09" -- 327 # 348
#gadget_display "jacob09a" -- 327 # 348
#gadget_display "jacob12a" -- 41 # 48
#gadget_display "jacob12b" -- 32 # 33
#gadget_display "jacob14" -- 63 # 67
#gadget_display "jacob18a" -- 161 # 177
#gadget_display "jacob20" -- 49
#gadget_display "jacob21" -- 138 # 139
#gadget_display "jacob22" -- 159 # 189
#gadget_display "jacob23" -- 35 # 47
#gadget_display "jacob26" -- 151 # 179


#gadget_display "jovan_easy01" -- 19 # 23
#gadget_display "jovan_easy02" -- 21 # 22
#gadget_display "jovan01" -- 13
#gadget_display "jovan02" -- 49 # 64

-- jacob03 jacob18 stack overflow
/-
results:
tim01: ∞
tim02: 295??
tim03: ∞
tim04: 41
tim05: ∞
tim05a: ∞
tim06: ∞
tim07: ∞
tim08: 36
tim09: ∞
tim10: 23
tim11: 13
tim12: 341
tim14: ∞
tim16: 19
tim17: 25
tim18: 19
tim19: 11
tim20: ∞
tim21: ∞
tim22: ∞
tim22a: ∞
tim22b: ∞
tim22c: ∞
tim23: 25
tim24: 15
tim25: 77
tim25a: 32
tim27: ∞
tim28: ∞
tim29: ∞
tim30: ∞
tim31: ∞
tim32: ∞
tim33: 33
tim34: ∞
tim35: ∞
tim36: 15
tim37: ∞
tim37a: ∞
tim38: ∞
tim39: ∞
tim40: 114
tim41: 93??
tim42: ∞
tim43: 11
tim44: ∞
tim46: 123

jacob25: 1439 - 329 - ∞
-/
