
namespace JovanGadgetGame

structure Config where
  depthFirst             : Bool
  fewerCasesFirst        : Bool
  -- simplerSolutionsFirst  : Bool
  orderSubgoalsAndAxioms : Bool
  postponeLoopSearch     : Bool
  postponeSpiralSearch   : Bool
  useOldSpiralDetect     : Bool
  cacheSolutions         : Bool
  easyGoalsFirst         : Bool

class MonadConfig (m : Type → Type) where
  getConfig : m Config

export MonadConfig (getConfig)
