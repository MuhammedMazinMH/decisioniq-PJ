import { generateText, Output } from 'ai'
import { extractText, getDocumentProxy } from 'unpdf'
import mammoth from 'mammoth'
import { extractionSchema } from '@/lib/analysis-schema'

export const maxDuration = 60

const MAX_CHARS_PER_FILE = 12000

async function fileToText(file: File): Promise<string> {
  const name = file.name.toLowerCase()
  const buffer = Buffer.from(await file.arrayBuffer())

  if (name.endsWith('.pdf')) {
    const pdf = await getDocumentProxy(new Uint8Array(buffer))
    const { text } = await extractText(pdf, { mergePages: true })
    return text
  }
  if (name.endsWith('.docx')) {
    const { value } = await mammoth.extractRawText({ buffer })
    return value
  }
  // .txt and anything else readable as text
  return buffer.toString('utf-8')
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return Response.json({ error: 'No files provided' }, { status: 400 })
    }

    const docs: { name: string; text: string }[] = []
    for (const file of files) {
      try {
        const text = (await fileToText(file)).trim()
        docs.push({
          name: file.name,
          text: text.slice(0, MAX_CHARS_PER_FILE),
        })
      } catch {
        docs.push({ name: file.name, text: '' })
      }
    }

    const corpus = docs
      .map((d) => `=== FILE: ${d.name} ===\n${d.text || '(unreadable)'}`)
      .join('\n\n')

    const { output } = await generateText({
      model: 'openai/gpt-5-mini',
      system:
        'You are a document intelligence engine inside DecisionIQ, a career decision platform. ' +
        'You extract structured facts from career documents (offer letters, resumes, certifications, admission letters). ' +
        'Be precise. Only extract entities actually present in the text. Keep values short.',
      prompt:
        'Extract structured information from the following documents. ' +
        'For each file produce a short past-tense status label (e.g. "Resume Processed", "Offer Letter Parsed") and a one-sentence summary. ' +
        'Then list every concrete entity found: companies, roles, stipends, salaries, benefits, locations, work modes, certifications, career paths, education details.\n\n' +
        corpus,
      output: Output.object({ schema: extractionSchema }),
    })

    return Response.json({
      extraction: output,
      documentText: corpus.slice(0, 24000),
    })
  } catch (error) {
    console.error('[v0] /api/extract error:', error)
    return Response.json(
      { error: 'Extraction failed. Please try again.' },
      { status: 500 },
    )
  }
}
