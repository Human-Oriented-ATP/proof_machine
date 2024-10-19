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
    fewerConstantsFirst := true
    customPrioValue := some fun { numConsts, numCases, spiralCount, times } =>
      - (2.5*numConsts.toFloat + numCases.toFloat + 10 * spiralCount.toFloat + times.size.toFloat)
  }
  logInfoAt stx m!"num steps: {numSteps}"
  if false then
    logInfoAt stx m!"{proofLog}"

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



-- #gadget_display "mirek_crazy4"

-- #exit

#gadget_display "tim_easy01" -- 5
#gadget_display "tim_easy02" -- 19
#gadget_display "tim_easy03" -- 5
#gadget_display "tim_easy04" -- 11
#gadget_display "tim_easy05" -- 43
#gadget_display "tim_easy06" -- 100
#gadget_display "tim_easy07" -- 6
#gadget_display "tim_easy08" -- 29
#gadget_display "tim_easy09" -- 23
#gadget_display "tim_easy10" -- 5
#gadget_display "tim_easy11" -- 3
#gadget_display "tim_easy12" -- 52 HMMM
#gadget_display "tim_easy13" -- 4

#gadget_display "jacob_easy01" -- 1
#gadget_display "jacob_easy02" -- 3
#gadget_display "jacob_easy03" -- 5
#gadget_display "jacob_easy04" -- 5
#gadget_display "jacob_easy05" -- 12


#gadget_display "tim01" -- 678
#gadget_display "tim02" -- 141
#gadget_display "tim03" -- 40
#gadget_display "tim04" -- 33 HMM
#gadget_display "tim05" -- 393
#gadget_display "tim05a" -- 277
#gadget_display "tim06" -- 676
#gadget_display "tim07" -- 37
#gadget_display "tim08" -- 38
-- #gadget_display "tim09"
#gadget_display "tim10" -- 35 HMM
#gadget_display "tim11" -- 15
#gadget_display "tim12" -- 106 HMM
#gadget_display "tim14" -- 1053 | Requires guessing the correct order of goals
#gadget_display "tim16" -- 23
#gadget_display "tim17" -- 10 HMM
#gadget_display "tim18" -- 18
#gadget_display "tim19" -- 12
#gadget_display "tim20" -- 106
-- #gadget_display "tim21"
#gadget_display "tim22a" -- 94
#gadget_display "tim22b" -- 523 HMM
#gadget_display "tim22c" -- 94
#gadget_display "tim23" -- 20
#gadget_display "tim24" -- 11
#gadget_display "tim25" -- 50
#gadget_display "tim25a" -- 31
#gadget_display "tim27" -- 384
#gadget_display "tim28" -- 1180
-- #gadget_display "tim29" STACKOVERFLOW
-- #gadget_display "tim30" -- 3963 - ×
-- #gadget_display "tim31" -- 1086 - ×
#gadget_display "tim32" -- 2240
#gadget_display "tim33" -- 24
-- #gadget_display "tim34"
#gadget_display "tim35" -- 67
#gadget_display "tim36" -- 15
-- #gadget_display "tim37"
-- #gadget_display "tim37a" -- ×
#gadget_display "tim38" -- 21
#gadget_display "tim39" -- 566
#gadget_display "tim40" -- 98
#gadget_display "tim41" --162
#gadget_display "tim42" --146
#gadget_display "tim43" -- 11
#gadget_display "tim44" -- 103
#gadget_display "tim44a" -- 80
#gadget_display "tim46" -- 235 HMM

#gadget_display "mirek_crazy4" -- 1313 HMM

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
#gadget_display "jacob01" -- 96 HMM
-- #gadget_display "jacob02" -- STACK OVERFLOW?
-- #gadget_display "jacob03"
#gadget_display "jacob04" --  69
#gadget_display "jacob05" -- 9
#gadget_display "jacob06" -- 44
#gadget_display "jacob06a" -- 44
#gadget_display "jacob07" -- 56
#gadget_display "jacob07a" -- 51
#gadget_display "jacob08" -- 114
#gadget_display "jacob08a" -- 91
#gadget_display "jacob09" -- 149 HMM
#gadget_display "jacob09a" -- 153 HMM
-- #gadget_display "jacob10"
-- #gadget_display "jacob11"
#gadget_display "jacob12a" -- 37
#gadget_display "jacob12b" -- 80 HMM
-- #gadget_display "jacob13" -- 2575 STACKOVERFLOW
#gadget_display "jacob14" -- 62
#gadget_display "jacob15" -- 297
#gadget_display "jacob16" -- 204
-- #gadget_display "jacob17" -- 12297 - ×
-- #gadget_display "jacob18"
#gadget_display "jacob18a" -- 374 HMMM
-- #gadget_display "jacob_19" STACKOVERFLOW
#gadget_display "jacob20" -- 95
#gadget_display "jacob21" -- 102
#gadget_display "jacob22" -- 146
#gadget_display "jacob23" -- 33
-- #gadget_display "jacob24"
-- #gadget_display "jacob25" -- 414 Stack overflow
#gadget_display "jacob26" -- 70

#gadget_display "jovan_easy01" -- 21
#gadget_display "jovan_easy02" -- 16
#gadget_display "jovan01" -- 13
#gadget_display "jovan02" -- 31
