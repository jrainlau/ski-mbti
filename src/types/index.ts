/** 选项对维度的加分规则 */
export interface DimensionWeight {
  dimensionId: string
  score: number
}

/** 单个选项 */
export interface Option {
  label: string
  text: string
  weights: DimensionWeight[]
}

/** 隐藏题目触发条件 */
export interface HiddenTrigger {
  questionId: number   // 触发题目的 id
  optionLabel: string  // 选择了哪个选项才触发
}

/** 单道题目 */
export interface Question {
  id: number
  title: string
  options: Option[]
  /** 隐藏题目专用：触发条件 */
  hidden?: HiddenTrigger
}

/** 维度定义 */
export interface Dimension {
  id: string
  name: string
  category: string
  description: string
  lowLabel: string
  highLabel: string
}

/** 人格的理想维度模板 */
export interface PersonalityTemplate {
  [dimensionId: string]: number
}

/** 人格类型 */
export interface Personality {
  code: string
  name: string
  tagline: string
  systemNote: string
  description: string
  template: PersonalityTemplate
  /** 定义性维度（2-3个），匹配时权重翻倍 */
  keyDimensions: string[]
  dimensionComments: Record<string, string>
}

/** 维度得分 */
export interface DimensionScore {
  dimensionId: string
  rawScore: number
  maxScore: number
  normalized: number
  level: 'H' | 'M' | 'L'
  comment: string
}

/** 匹配结果 */
export interface MatchResult {
  personality: Personality
  matchPercent: number
  dimensionScores: DimensionScore[]
}

/** 用户答案记录 */
export interface UserAnswer {
  questionId: number
  optionLabel: string
}
