import { generateText, Output } from 'ai'
import { analysisSchema } from '@/lib/analysis-schema'

export const maxDuration = 90

const SYSTEM = `You are the DecisionIQ Reasoning Engine — a strategic decision analyst, career advisor, psychologist, risk analyst, and future planning consultant working together. You are NOT a chatbot. You produce rigorous, transparent, structured decision intelligence.

You must perform this exact orchestration:
1. Context Discovery — understand the user's situation from documents, priorities, and answers.
2. Goal Identification — infer what the user is truly optimizing for.
3. Criteria Generation — use the six fixed criteria keys (salary, learning, growth, brand, flexibility, future) with human labels.
4. Weight Assignment — assign weights summing to ~1.0, driven by the user's ranked priorities (top-ranked priority gets the highest weight).
5. Trade-Off Analysis — score every option 0-100 per criterion, grounded in document evidence where available.
6. Risk Assessment — realistic advantages, risks, and concerns per option.
7. Bias Detection — analyze the user's own stated reasoning/context/answers for decision biases (Social Proof, Bandwagon, Sunk Cost Fallacy, Loss Aversion, Confirmation, Status Quo, Recency). Only report biases with real textual evidence; return an empty array if none.
8. Future Simulation — realistic Year 1 / Year 2 / Year 3 outcome projections per option.
9. Recommendation — pick one option, with confidence (55-95), a summary, key drivers, and when the alternative would win.

Rules:
- Ground every claim in the provided material. Never invent salaries or companies not present in the input; if data is missing, reason qualitatively.
- Confidence must reflect genuine signal strength: thin input = lower confidence.
- The reasoning trace must read like an analyst's audit log, one concrete finding per step.
- Identify the distinct options being compared from the documents and context. If options are not explicit, infer the most plausible 2-3 options from the decision title and type.`

export async function POST(req: Request) {
  try {
    const {
      title,
      decisionType,
      priorities,
      context,
      documentText,
      entities,
      answers,
    } = await req.json()

    const priorityLines =
      Array.isArray(priorities) && priorities.length
        ? priorities.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')
        : 'Not specified'

    const answerLines =
      Array.isArray(answers) && answers.length
        ? answers
            .map(
              (a: { question: string; answer: string }) =>
                `Q: ${a.question}\nA: ${a.answer || '(not answered)'}`,
            )
            .join('\n')
        : 'None'

    const entityLines = Array.isArray(entities)
      ? entities
          .map((e: { label: string; value: string }) => `${e.label}: ${e.value}`)
          .join('\n')
      : 'None'

    const { output } = await generateText({
      model: 'google/gemini-3.5-flash',
      system: SYSTEM,
      prompt:
        `DECISION TITLE: ${title || 'Untitled decision'}\n` +
        `DECISION TYPE: ${decisionType || 'Unknown'}\n\n` +
        `USER PRIORITY RANKING (1 = most important):\n${priorityLines}\n\n` +
        `USER CONTEXT / REASONING (analyze this for biases):\n${context || 'None provided'}\n\n` +
        `ADAPTIVE QUESTION ANSWERS (also analyze for biases):\n${answerLines}\n\n` +
        `EXTRACTED ENTITIES:\n${entityLines}\n\n` +
        `DOCUMENT CONTENT:\n${(documentText || '').slice(0, 20000) || 'No documents uploaded'}\n\n` +
        'Run the full reasoning orchestration and return the structured analysis.',
      output: Output.object({ schema: analysisSchema }),
    })

    return Response.json(output)
  } catch (error) {
    console.error('[v0] /api/analyze error:', error)
    return Response.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 },
    )
  }
}
