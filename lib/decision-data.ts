export type Criterion = {
  key: string
  label: string
  weight: number
}

export type OptionOutcome = {
  year: string
  title: string
  detail: string
}

export type DecisionOption = {
  id: string
  name: string
  subtitle: string
  scores: Record<string, number>
  advantages: string[]
  risks: string[]
  concerns: string[]
  outcomes: OptionOutcome[]
}

export type ReasoningNode = {
  step: string
  detail: string
}

export type ScenarioBias = {
  name: string
  explanation: string
  impact: string
  recommendation: string
  severity: 'low' | 'medium' | 'high'
}

export type Scenario = {
  id: string
  title: string
  type: string
  date: string
  tagline: string
  criteria: Criterion[]
  options: DecisionOption[]
  recommendedId: string
  confidence: number
  summary: string
  reasoning: ReasoningNode[]
  biases?: ScenarioBias[]
}

export const PRIORITIES = [
  'Salary',
  'Learning',
  'Career Growth',
  'Brand Value',
  'Work Life Balance',
  'Flexibility',
] as const

export const DECISION_TYPES = [
  'Internship Selection',
  'Job Offer Comparison',
  'Career Path Selection',
  'Certification Selection',
  'Higher Studies Decision',
] as const

export const ANALYSIS_STEPS = [
  { label: 'Reading Documents', detail: 'Parsing uploaded files and context' },
  { label: 'Extracting Key Information', detail: 'Identifying roles, comp, and terms' },
  { label: 'Understanding User Priorities', detail: 'Mapping your weighted preferences' },
  { label: 'Generating Evaluation Criteria', detail: 'Building a tailored rubric' },
  { label: 'Creating Decision Matrix', detail: 'Structuring the trade-off space' },
  { label: 'Scoring Alternatives', detail: 'Rating each option per criterion' },
  { label: 'Performing Risk Analysis', detail: 'Surfacing downside and concerns' },
  { label: 'Simulating Future Outcomes', detail: 'Projecting 3-year trajectories' },
  { label: 'Generating Recommendation', detail: 'Synthesizing the final answer' },
] as const

export const REASONING_TRACE = [
  'Goal Discovery',
  'Criteria Creation',
  'Weight Assignment',
  'Trade-Off Evaluation',
  'Risk Assessment',
  'Future Simulation',
  'Recommendation',
] as const

function weightedScore(option: DecisionOption, criteria: Criterion[]) {
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0)
  const sum = criteria.reduce(
    (s, c) => s + (option.scores[c.key] ?? 0) * c.weight,
    0,
  )
  return Math.round(sum / totalWeight)
}

export function rankOptions(scenario: Scenario) {
  return scenario.options
    .map((option) => ({
      option,
      score: weightedScore(option, scenario.criteria),
    }))
    .sort((a, b) => b.score - a.score)
}

const baseCriteria: Criterion[] = [
  { key: 'salary', label: 'Salary', weight: 0.15 },
  { key: 'learning', label: 'Learning', weight: 0.25 },
  { key: 'growth', label: 'Career Growth', weight: 0.25 },
  { key: 'brand', label: 'Brand Value', weight: 0.15 },
  { key: 'flexibility', label: 'Flexibility', weight: 0.1 },
  { key: 'future', label: 'Future Potential', weight: 0.1 },
]

export const SCENARIOS: Scenario[] = [
  {
    id: 'internship',
    title: 'Which internship should I choose?',
    type: 'Internship Selection',
    date: '2026-06-08',
    tagline: 'AI Engineer Internship vs MNC Offer vs MS in CS',
    criteria: baseCriteria,
    recommendedId: 'ai-engineer',
    confidence: 89,
    summary:
      'The AI Engineer Internship offers the strongest long-term growth and learning velocity despite a lower starting salary. Given your priorities favoring growth and learning over short-term compensation, it is the optimal choice.',
    reasoning: [
      { step: 'Goal Discovery', detail: 'Optimize for long-term career trajectory in AI/ML.' },
      { step: 'Criteria Creation', detail: '6 criteria generated, weighted toward learning and growth.' },
      { step: 'Weight Assignment', detail: 'Learning and Growth received highest weights (0.25 each).' },
      { step: 'Trade-Off Evaluation', detail: 'Salary gap offset by superior skill compounding.' },
      { step: 'Risk Assessment', detail: 'Primary risk is conversion rate; mitigated by strong team.' },
      { step: 'Future Simulation', detail: '3-year projection favors AI specialization demand.' },
      { step: 'Recommendation', detail: 'AI Engineer Internship at 89% confidence.' },
    ],
    biases: [
      {
        name: 'Social Proof Bias',
        explanation:
          'Your notes reference what classmates chose more often than your own stated goals.',
        impact: 'May pull you toward the popular MNC offer over the better personal fit.',
        recommendation:
          'Re-rank the options using only your own priority list, ignoring peer choices.',
        severity: 'medium',
      },
      {
        name: 'Loss Aversion',
        explanation:
          'The salary gap is weighted as a loss even though learning ranked above salary for you.',
        impact: 'Overweights short-term compensation against long-term growth.',
        recommendation:
          'Frame the stipend gap as a 12-month investment with a measurable skill return.',
        severity: 'low',
      },
    ],
    options: [
      {
        id: 'ai-engineer',
        name: 'AI Engineer Internship',
        subtitle: 'High-growth AI lab',
        scores: { salary: 72, learning: 95, growth: 92, brand: 70, flexibility: 85, future: 93 },
        advantages: [
          'Cutting-edge ML and LLM exposure',
          'Strong mentorship from senior researchers',
          'High learning velocity and ownership',
        ],
        risks: [
          'Full-time conversion not guaranteed',
          'Below-market starting stipend',
        ],
        concerns: ['Fast-paced environment may require long hours'],
        outcomes: [
          { year: 'Year 1', title: 'Ship production ML features', detail: 'Build a portfolio of deployed models.' },
          { year: 'Year 2', title: 'Mid-level AI Engineer', detail: 'Lead a model workstream end to end.' },
          { year: 'Year 3', title: 'Senior / specialist track', detail: 'Recognized AI specialist, high market demand.' },
        ],
      },
      {
        id: 'mnc-offer',
        name: 'MNC Full-Time Offer',
        subtitle: 'Established enterprise',
        scores: { salary: 88, learning: 70, growth: 68, brand: 94, flexibility: 60, future: 76 },
        advantages: [
          'Highest immediate compensation',
          'Strong brand on resume',
          'Stable, structured environment',
        ],
        risks: ['Slower skill growth in legacy stack', 'Rigid promotion timelines'],
        concerns: ['Limited exposure to modern AI tooling'],
        outcomes: [
          { year: 'Year 1', title: 'Onboard to enterprise systems', detail: 'Stable income, broad process exposure.' },
          { year: 'Year 2', title: 'Software Engineer II', detail: 'Incremental raise, predictable path.' },
          { year: 'Year 3', title: 'Senior Engineer', detail: 'Strong title, narrower skill specialization.' },
        ],
      },
      {
        id: 'ms-cs',
        name: 'MS in Computer Science',
        subtitle: 'Top-tier graduate program',
        scores: { salary: 55, learning: 90, growth: 80, brand: 88, flexibility: 70, future: 84 },
        advantages: [
          'Deep theoretical foundation',
          'Prestigious credential and network',
          'Access to research opportunities',
        ],
        risks: ['Two years of deferred income', 'Tuition and opportunity cost'],
        concerns: ['ROI depends on post-grad placement'],
        outcomes: [
          { year: 'Year 1', title: 'Graduate coursework', detail: 'Build theory and research foundation.' },
          { year: 'Year 2', title: 'Thesis + internships', detail: 'Specialize and network with industry.' },
          { year: 'Year 3', title: 'Premium new-grad role', detail: 'Enter market at higher level and pay.' },
        ],
      },
    ],
  },
  {
    id: 'google-vs-microsoft',
    title: 'Google Internship vs Microsoft Internship',
    type: 'Internship Selection',
    date: '2026-05-30',
    tagline: 'Two elite internships, different strengths',
    criteria: baseCriteria,
    recommendedId: 'google',
    confidence: 82,
    summary:
      'Both are exceptional. Google edges ahead on learning velocity and AI exposure, while Microsoft leads on work-life balance. For your growth-oriented priorities, Google is the marginally stronger pick.',
    reasoning: [
      { step: 'Goal Discovery', detail: 'Maximize learning and brand within big tech.' },
      { step: 'Criteria Creation', detail: 'Standard rubric with emphasis on growth.' },
      { step: 'Weight Assignment', detail: 'Learning and growth weighted highest.' },
      { step: 'Trade-Off Evaluation', detail: 'Google +learning, Microsoft +balance.' },
      { step: 'Risk Assessment', detail: 'Both low risk; team allocation matters most.' },
      { step: 'Future Simulation', detail: 'Comparable trajectories; Google slightly ahead in AI.' },
      { step: 'Recommendation', detail: 'Google Internship at 82% confidence.' },
    ],
    biases: [
      {
        name: 'Bandwagon Bias',
        explanation:
          'Brand prestige appears in your reasoning more than concrete team or project fit.',
        impact: 'Either brand could be chosen for status rather than trajectory.',
        recommendation:
          'Compare the specific teams and projects on offer, not the logos.',
        severity: 'low',
      },
    ],
    options: [
      {
        id: 'google',
        name: 'Google Internship',
        subtitle: 'Mountain View · SWE',
        scores: { salary: 90, learning: 92, growth: 90, brand: 95, flexibility: 78, future: 92 },
        advantages: ['World-class engineering culture', 'Strong AI/infra exposure', 'High conversion rate'],
        risks: ['Large org, team allocation varies'],
        concerns: ['Project scope may be narrow'],
        outcomes: [
          { year: 'Year 1', title: 'Full-time SWE conversion', detail: 'Top-tier compensation and brand.' },
          { year: 'Year 2', title: 'SWE II', detail: 'Broaden impact across products.' },
          { year: 'Year 3', title: 'Senior track', detail: 'Strong AI/infra specialization.' },
        ],
      },
      {
        id: 'microsoft',
        name: 'Microsoft Internship',
        subtitle: 'Redmond · SWE',
        scores: { salary: 88, learning: 85, growth: 84, brand: 92, flexibility: 90, future: 86 },
        advantages: ['Excellent work-life balance', 'Azure and Copilot exposure', 'Supportive culture'],
        risks: ['Slightly slower pace than peers'],
        concerns: ['Some legacy codebases'],
        outcomes: [
          { year: 'Year 1', title: 'Full-time SWE conversion', detail: 'Great balance and stability.' },
          { year: 'Year 2', title: 'SWE II', detail: 'Grow within cloud/AI orgs.' },
          { year: 'Year 3', title: 'Senior track', detail: 'Solid trajectory, strong brand.' },
        ],
      },
    ],
  },
  {
    id: 'mba-vs-job',
    title: 'MBA vs Continue Working',
    type: 'Higher Studies Decision',
    date: '2026-05-18',
    tagline: 'Invest in an MBA or keep building experience',
    criteria: baseCriteria,
    recommendedId: 'keep-job',
    confidence: 71,
    summary:
      'Continuing in your current high-growth role narrowly outperforms a full-time MBA given strong internal momentum. An MBA becomes optimal only if you target a career switch into management consulting or finance.',
    reasoning: [
      { step: 'Goal Discovery', detail: 'Accelerate into leadership without losing momentum.' },
      { step: 'Criteria Creation', detail: 'Weighted toward growth and ROI.' },
      { step: 'Weight Assignment', detail: 'Growth and salary weighted up.' },
      { step: 'Trade-Off Evaluation', detail: 'MBA brand vs 2 years deferred income.' },
      { step: 'Risk Assessment', detail: 'MBA ROI sensitive to placement.' },
      { step: 'Future Simulation', detail: 'Staying compounds faster near-term.' },
      { step: 'Recommendation', detail: 'Continue Working at 71% confidence.' },
    ],
    biases: [
      {
        name: 'Sunk Cost Fallacy',
        explanation:
          'Time already spent preparing for entrance exams is cited as a reason to pursue the MBA.',
        impact: 'Past preparation costs may push you into a path that no longer fits your goals.',
        recommendation:
          'Evaluate the MBA purely on forward-looking ROI; prep effort is already spent either way.',
        severity: 'high',
      },
      {
        name: 'Status Quo Bias',
        explanation:
          'Comfort with the current role appears as a reason to stay, separate from growth evidence.',
        impact: 'Could mask a plateau that an external move would reveal.',
        recommendation:
          'Set explicit 12-month growth milestones for staying; revisit if unmet.',
        severity: 'medium',
      },
    ],
    options: [
      {
        id: 'keep-job',
        name: 'Continue Working',
        subtitle: 'Current high-growth role',
        scores: { salary: 85, learning: 80, growth: 86, brand: 75, flexibility: 78, future: 84 },
        advantages: ['No deferred income', 'Compounding internal promotions', 'Real-world leadership reps'],
        risks: ['Slower brand/network expansion'],
        concerns: ['Plateau risk without proactive growth'],
        outcomes: [
          { year: 'Year 1', title: 'Senior IC / Team Lead', detail: 'Promotion with comp bump.' },
          { year: 'Year 2', title: 'Manager', detail: 'Own a small team and roadmap.' },
          { year: 'Year 3', title: 'Senior Manager', detail: 'Established leadership track.' },
        ],
      },
      {
        id: 'mba',
        name: 'Full-Time MBA',
        subtitle: 'Top-20 business school',
        scores: { salary: 60, learning: 88, growth: 82, brand: 92, flexibility: 65, future: 86 },
        advantages: ['Elite network and brand', 'Career-switch optionality', 'Structured leadership training'],
        risks: ['High tuition + 2 years lost income', 'ROI varies by school tier'],
        concerns: ['Opportunity cost during a hot market'],
        outcomes: [
          { year: 'Year 1', title: 'MBA coursework', detail: 'Build network and fundamentals.' },
          { year: 'Year 2', title: 'Internship + recruiting', detail: 'Pivot toward target industry.' },
          { year: 'Year 3', title: 'Post-MBA role', detail: 'Re-enter at elevated level/pay.' },
        ],
      },
    ],
  },
  {
    id: 'ai-vs-data-scientist',
    title: 'AI Engineer vs Data Scientist',
    type: 'Career Path Selection',
    date: '2026-05-04',
    tagline: 'Two adjacent paths, different ceilings',
    criteria: baseCriteria,
    recommendedId: 'ai-eng',
    confidence: 86,
    summary:
      'The AI Engineer path shows higher future demand and growth ceiling, while Data Science offers broader near-term opportunities. For long-term upside aligned with your priorities, AI Engineering is recommended.',
    reasoning: [
      { step: 'Goal Discovery', detail: 'Pick the path with the best long-term ceiling.' },
      { step: 'Criteria Creation', detail: 'Weighted toward future potential and growth.' },
      { step: 'Weight Assignment', detail: 'Future and growth weighted up.' },
      { step: 'Trade-Off Evaluation', detail: 'AI Eng +ceiling, DS +breadth.' },
      { step: 'Risk Assessment', detail: 'AI Eng demands stronger engineering depth.' },
      { step: 'Future Simulation', detail: 'AI Eng demand outpaces DS over 3 years.' },
      { step: 'Recommendation', detail: 'AI Engineer at 86% confidence.' },
    ],
    biases: [
      {
        name: 'Recency Bias',
        explanation:
          'Recent AI hype headlines feature prominently in your stated motivation.',
        impact: 'Current market excitement may be extrapolated too far into the future.',
        recommendation:
          'Stress-test the choice against a scenario where AI hiring cools for 2 years.',
        severity: 'medium',
      },
    ],
    options: [
      {
        id: 'ai-eng',
        name: 'AI Engineer',
        subtitle: 'LLM / ML systems',
        scores: { salary: 88, learning: 92, growth: 90, brand: 82, flexibility: 80, future: 95 },
        advantages: ['Highest demand trajectory', 'Strong comp ceiling', 'Deep, durable skills'],
        risks: ['Requires strong SWE fundamentals'],
        concerns: ['Fast-moving field needs continuous learning'],
        outcomes: [
          { year: 'Year 1', title: 'AI Engineer', detail: 'Ship ML-powered features.' },
          { year: 'Year 2', title: 'Senior AI Engineer', detail: 'Own model lifecycle.' },
          { year: 'Year 3', title: 'Staff / Specialist', detail: 'High-leverage AI specialist.' },
        ],
      },
      {
        id: 'data-scientist',
        name: 'Data Scientist',
        subtitle: 'Analytics / experimentation',
        scores: { salary: 82, learning: 85, growth: 80, brand: 80, flexibility: 85, future: 82 },
        advantages: ['Broad industry demand', 'Strong business impact', 'Good work-life balance'],
        risks: ['Role definition varies widely'],
        concerns: ['Some roles skew toward reporting'],
        outcomes: [
          { year: 'Year 1', title: 'Data Scientist', detail: 'Drive experiments and insight.' },
          { year: 'Year 2', title: 'Senior DS', detail: 'Own metrics and modeling.' },
          { year: 'Year 3', title: 'Lead DS', detail: 'Shape data strategy.' },
        ],
      },
    ],
  },
  {
    id: 'startup-vs-mnc',
    title: 'Startup vs MNC',
    type: 'Job Offer Comparison',
    date: '2026-04-21',
    tagline: 'High-ownership startup or stable enterprise',
    criteria: baseCriteria,
    recommendedId: 'startup',
    confidence: 68,
    summary:
      'The startup offers exceptional learning and ownership at higher variance, while the MNC provides stability and brand. For your growth-first, risk-tolerant profile, the startup is recommended, though confidence is moderate.',
    reasoning: [
      { step: 'Goal Discovery', detail: 'Maximize learning and ownership early in career.' },
      { step: 'Criteria Creation', detail: 'Weighted toward learning and growth.' },
      { step: 'Weight Assignment', detail: 'Learning and growth weighted up.' },
      { step: 'Trade-Off Evaluation', detail: 'Startup +ownership, MNC +stability.' },
      { step: 'Risk Assessment', detail: 'Startup carries funding/runway risk.' },
      { step: 'Future Simulation', detail: 'Startup upside higher but more variable.' },
      { step: 'Recommendation', detail: 'Startup at 68% confidence.' },
    ],
    biases: [
      {
        name: 'Confirmation Bias',
        explanation:
          'Your context cites startup success stories while omitting base-rate failure data.',
        impact: 'Risk side of the startup option may be systematically underweighted.',
        recommendation:
          'List three concrete ways the startup path could fail before deciding.',
        severity: 'medium',
      },
    ],
    options: [
      {
        id: 'startup',
        name: 'Series-B Startup',
        subtitle: 'High ownership role',
        scores: { salary: 78, learning: 95, growth: 90, brand: 60, flexibility: 88, future: 85 },
        advantages: ['Massive scope and ownership', 'Equity upside', 'Rapid skill growth'],
        risks: ['Funding and runway risk', 'Less structure / mentorship'],
        concerns: ['Brand value lower if it fails'],
        outcomes: [
          { year: 'Year 1', title: 'Own core product area', detail: 'Wide responsibility, fast growth.' },
          { year: 'Year 2', title: 'Founding-team seniority', detail: 'Lead features, mentor hires.' },
          { year: 'Year 3', title: 'Lead / equity payoff', detail: 'High upside if company scales.' },
        ],
      },
      {
        id: 'mnc-job',
        name: 'Global MNC',
        subtitle: 'Established enterprise',
        scores: { salary: 88, learning: 72, growth: 70, brand: 94, flexibility: 68, future: 78 },
        advantages: ['Stable comp and benefits', 'Strong brand', 'Structured mentorship'],
        risks: ['Slower growth and scope'],
        concerns: ['Bureaucracy can limit impact'],
        outcomes: [
          { year: 'Year 1', title: 'Structured onboarding', detail: 'Stable, predictable start.' },
          { year: 'Year 2', title: 'Engineer II', detail: 'Incremental growth.' },
          { year: 'Year 3', title: 'Senior Engineer', detail: 'Strong brand, narrower scope.' },
        ],
      },
    ],
  },
]

export function getScenario(id: string | undefined | null): Scenario {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]
}

export type HistoryEntry = {
  id: string
  title: string
  type: string
  date: string
  recommendation: string
  confidence: number
}

export const HISTORY: HistoryEntry[] = SCENARIOS.map((s) => {
  const rec = s.options.find((o) => o.id === s.recommendedId)
  return {
    id: s.id,
    title: s.title,
    type: s.type,
    date: s.date,
    recommendation: rec?.name ?? '',
    confidence: s.confidence,
  }
})

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}
