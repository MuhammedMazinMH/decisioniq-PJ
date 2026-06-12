import { generateText, Output } from 'ai'
import { questionsSchema } from '@/lib/analysis-schema'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { title, decisionType, documentText, entities, context } =
      await req.json()

    const entityLines = Array.isArray(entities)
      ? entities
          .map((e: { label: string; value: string }) => `${e.label}: ${e.value}`)
          .join('\n')
      : ''

    const { output } = await generateText({
      model: 'google/gemini-3.5-flash',
      system:
        'You are an adaptive interviewer inside DecisionIQ, a career decision intelligence platform. ' +
        'You generate the 3-4 most decision-relevant clarifying questions based on what was actually found in the user documents and context. ' +
        'Never ask generic questions; tailor each question to the detected situation. ' +
        'If internship documents are detected, ask about post-graduation goals and learning vs compensation. ' +
        'If MBA or higher-studies documents are detected, ask about salary growth vs specialization and international plans. ' +
        'Questions must be short, direct, and answerable in one or two sentences.',
      prompt:
        `Decision title: ${title || 'Untitled decision'}\n` +
        `Decision type: ${decisionType || 'Unknown'}\n` +
        `User context: ${context || 'None provided'}\n` +
        `Extracted entities:\n${entityLines || 'None'}\n\n` +
        `Document excerpts:\n${(documentText || '').slice(0, 8000) || 'No documents uploaded'}\n\n` +
        'Generate the adaptive clarifying questions now.',
      output: Output.object({ schema: questionsSchema }),
    })

    return Response.json(output)
  } catch (error) {
    console.error('[v0] /api/questions error:', error)
    return Response.json(
      { error: 'Question generation failed.' },
      { status: 500 },
    )
  }
}
