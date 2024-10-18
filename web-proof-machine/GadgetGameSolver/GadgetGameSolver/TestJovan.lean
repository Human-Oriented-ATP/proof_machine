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
    fewerConstantsFirst := false
  }
  logInfoAt stx m!"num steps: {numSteps}"
  if false then
    -- logInfoAt stx m!"{proofLog}"

    -- unless tree.isClosed do
    --   throwError "The proof tree is not closed."
    let initDiagram := ProofResult.getGadgetGraph ⟨problemState.target, tree⟩
    let initData : InitializationData := {
      initialDiagram := initDiagram,
      axioms := problemState.axioms -- .empty
    }
    let jsonProps := Lean.toJson initData
    Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
      (return jsonProps) stx



-- #gadget_display "tim_easy08" 22





-- #gadget_display "tim37a"
-- #gadget_display "jacob24" 1000

#exit

#gadget_display "tim_easy01" -- 5
#gadget_display "tim_easy02" -- 29
#gadget_display "tim_easy03" -- 5
#gadget_display "tim_easy04" -- 11
#gadget_display "tim_easy05" -- 67 HMM
#gadget_display "tim_easy06" -- 128 HMM
#gadget_display "tim_easy07" -- 5
#gadget_display "tim_easy08" -- 30
#gadget_display "tim_easy09" -- 28
#gadget_display "tim_easy10" -- 5
#gadget_display "tim_easy11" -- 3
#gadget_display "tim_easy12" -- 34 HMM
#gadget_display "tim_easy13" -- 4

#gadget_display "jacob_easy01" -- 1
#gadget_display "jacob_easy02" -- 8
#gadget_display "jacob_easy03" -- 4
#gadget_display "jacob_easy04" -- 5
#gadget_display "jacob_easy05" -- 12


-- #gadget_display "tim01"
#gadget_display "tim02" -- 227
#gadget_display "tim03" -- 39
#gadget_display "tim04" -- 19
#gadget_display "tim05" -- 307
#gadget_display "tim05a" -- 358 - 824 HMMM
#gadget_display "tim06" -- 559
#gadget_display "tim07" -- 29
#gadget_display "tim08" -- 31
-- #gadget_display "tim09"
#gadget_display "tim10" -- 13
#gadget_display "tim11" -- 13
-- #gadget_display "tim12" -- 212 - ∞
#gadget_display "tim14" -- 40 - 54
#gadget_display "tim16" -- 19
#gadget_display "tim17" -- 5
#gadget_display "tim18" -- 18
#gadget_display "tim19" -- 12
-- #gadget_display "tim20" -- ∞ - 364 ~ 368 # 440
-- #gadget_display "tim21"
#gadget_display "tim22a" -- 74
#gadget_display "tim22b" -- 211
#gadget_display "tim22c" -- 74
#gadget_display "tim23" -- 20
#gadget_display "tim24" -- 11
#gadget_display "tim25" -- 51
#gadget_display "tim25a" -- 32
#gadget_display "tim27" -- 559
-- #gadget_display "tim28"
-- #gadget_display "tim29"
-- #gadget_display "tim30" -- 3963 - ×
-- #gadget_display "tim31" -- 1086 - ×
-- #gadget_display "tim32"
#gadget_display "tim33" -- 33
-- #gadget_display "tim34"
#gadget_display "tim35" -- 67
#gadget_display "tim36" -- 15
-- #gadget_display "tim37"
-- #gadget_display "tim37a" -- ×
#gadget_display "tim38" -- 21
-- #gadget_display "tim39" -- STACK OVERFLOW
#gadget_display "tim40" -- 199 - 210
-- #gadget_display "tim41"
-- #gadget_display "tim42"
#gadget_display "tim43" -- 11
#gadget_display "tim44" -- 101
#gadget_display "tim44a" -- 79
#gadget_display "tim46" -- 124

#gadget_display "mirek_crazy4" -- 631 # 1020 - 1303 HMM

-- #exit
#gadget_display "tutorial01" -- 1
#gadget_display "tutorial02" -- 2
#gadget_display "tutorial03" -- 3
#gadget_display "tutorial04" -- 3
#gadget_display "tutorial05" -- 3
#gadget_display "tutorial06" -- 4

-- #gadget_display "fredy01a"
-- #gadget_display "fredy01"

-- #exit
#gadget_display "jacob01" -- 57 - 92 HMM
-- #gadget_display "jacob02" -- STACK OVERFLOW?
-- #gadget_display "jacob03"
#gadget_display "jacob04" --  52
#gadget_display "jacob05" -- 8
#gadget_display "jacob06" -- 44
#gadget_display "jacob06a" -- 44
#gadget_display "jacob07" -- 49 - 74
#gadget_display "jacob07a" -- 50 - 69
#gadget_display "jacob08" -- 148 - 99
#gadget_display "jacob08a" -- 121 - 81
#gadget_display "jacob09" -- 89
#gadget_display "jacob09a" -- 89
-- #gadget_display "jacob10"
-- #gadget_display "jacob11"
#gadget_display "jacob12a" -- 45
#gadget_display "jacob12b" -- 41
#gadget_display "jacob13" -- 2575
#gadget_display "jacob14" -- 61
#gadget_display "jacob15" -- 3891
#gadget_display "jacob16" -- 1113
-- #gadget_display "jacob17" -- 12297 - ×
-- #gadget_display "jacob18"
#gadget_display "jacob18a" -- 161 - 464 HMMM
-- #gadget_display "jacob_19"
#gadget_display "jacob20" -- 49 - 94 HMM
#gadget_display "jacob21" -- 157
#gadget_display "jacob22" -- 143
#gadget_display "jacob23" -- 34
-- #gadget_display "jacob24"
-- #gadget_display "jacob25" -- 414 ×
#gadget_display "jacob26" -- 67
-- #exit

#gadget_display "jovan_easy01" -- 28
#gadget_display "jovan_easy02" -- 10
#gadget_display "jovan01" -- 13
#gadget_display "jovan02" -- 58
