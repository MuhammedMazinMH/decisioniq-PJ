import { z } from 'zod'

/**
 * Shared zod schemas for the AI decision pipeline.
 * The analysis result intentionally mirrors the `Scenario` shape in
 * lib/decision-data.ts so every existing results component renders
 * AI output without any UI changes.
 */

export const CRITERIA_KEYS = [
  'salary',
  'learning',
  'growth',
  'brand',
  'flexibility',
  'future',
] as const

export const extractionSchema = z.object({
  files: z.array(
    z.object({
      name: z.string(),
      status: z
        .string()
        .describe(
          'Short past-tense status label, e.g. "Resume Processed", "Offer Letter Parsed", "Internship Details Extracted"',
        ),
      summary: z.string().describe('One-sentence summary of the document'),
    }),
  ),
  entities: z.array(
    z.object({
      label: z
        .string()
        .describe(
          'Entity label, e.g. Company, Role, Stipend, Salary, Benefits, Location, Work Mode, Certification, Career Path, Education',
        ),
      value: z.string().describe('Extracted value'),
    }),
  ),
  detectedKind: z
    .string()
    .describe(
      'What kind of decision the documents suggest, e.g. internship, job offer, MBA, certification, higher studies',
    ),
})

export type ExtractionResult = z.infer<typeof extractionSchema>

export const questionsSchema = z.object({
  questions: z
    .array(
      z.object({
        id: z.string().describe('Short kebab-case id'),
        question: z.string().describe('The question to ask the user'),
        placeholder: z
          .string()
          .describe('Short example answer used as input placeholder'),
      }),
    )
    .min(3)
    .max(4),
})

export type AdaptiveQuestions = z.infer<typeof questionsSchema>

const scoresSchema = z.object({
  salary: z.number().min(0).max(100),
  learning: z.number().min(0).max(100),
  growth: z.number().min(0).max(100),
  brand: z.number().min(0).max(100),
  flexibility: z.number().min(0).max(100),
  future: z.number().min(0).max(100),
})

export const analysisSchema = z.object({
  title: z.string().describe('Short decision title'),
  tagline: z.string().describe('One-line description of the options compared'),
  criteria: z
    .array(
      z.object({
        key: z.enum(CRITERIA_KEYS),
        label: z.string(),
        weight: z
          .number()
          .min(0)
          .max(1)
          .describe('Importance weight; all weights must sum to ~1'),
      }),
    )
    .length(6),
  options: z
    .array(
      z.object({
        id: z.string().describe('Short kebab-case id'),
        name: z.string(),
        subtitle: z.string().describe('Very short descriptor of the option'),
        scores: scoresSchema,
        advantages: z.array(z.string()).min(2).max(4),
        risks: z.array(z.string()).min(1).max(3),
        concerns: z.array(z.string()).min(1).max(2),
        outcomes: z
          .array(
            z.object({
              year: z.string().describe('"Year 1", "Year 2", or "Year 3"'),
              title: z.string().describe('Short outcome headline'),
              detail: z.string().describe('One-sentence realistic projection'),
            }),
          )
          .length(3),
      }),
    )
    .min(2)
    .max(4),
  recommendedId: z.string().describe('id of the recommended option'),
  confidence: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Confidence as an integer PERCENTAGE between 55 and 95 (e.g. 82 — never a 0-1 fraction)',
    ),
  summary: z
    .string()
    .describe('2-3 sentence reasoning summary for the recommendation'),
  keyDrivers: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe('Key factors driving the recommendation'),
  alternatives: z
    .string()
    .describe('When the runner-up option would be the better choice'),
  reasoning: z
    .array(
      z.object({
        step: z.string(),
        detail: z.string(),
      }),
    )
    .min(6)
    .max(8)
    .describe(
      'Reasoning trace: Goal Discovery, Criteria Creation, Weight Assignment, Trade-Off Evaluation, Risk Assessment, Bias Check, Future Simulation, Recommendation',
    ),
  biases: z
    .array(
      z.object({
        name: z
          .string()
          .describe(
            'One of: Social Proof Bias, Bandwagon Bias, Sunk Cost Fallacy, Loss Aversion, Confirmation Bias, Status Quo Bias, Recency Bias',
          ),
        explanation: z
          .string()
          .describe('Why this bias appears present in the user reasoning'),
        impact: z.string().describe('Potential impact on the decision'),
        recommendation: z.string().describe('How to counteract it'),
        severity: z.enum(['low', 'medium', 'high']),
      }),
    )
    .max(3)
    .describe(
      'Biases detected in the user-provided reasoning/context. Empty array if none detected.',
    ),
})

export type AnalysisResult = z.infer<typeof analysisSchema>

export type BiasFinding = AnalysisResult['biases'][number]
