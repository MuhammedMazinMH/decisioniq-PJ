'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type {
  AdaptiveQuestions,
  AnalysisResult,
  ExtractionResult,
} from '@/lib/analysis-schema'

export type DecisionInput = {
  title: string
  decisionType: string
  priorities: string[]
  context: string
}

export type AnsweredQuestion = {
  id: string
  question: string
  answer: string
}

type DecisionStore = {
  input: DecisionInput | null
  setInput: (input: DecisionInput | null) => void
  extraction: ExtractionResult | null
  setExtraction: (e: ExtractionResult | null) => void
  documentText: string
  setDocumentText: (t: string) => void
  questions: AdaptiveQuestions['questions']
  setQuestions: (q: AdaptiveQuestions['questions']) => void
  answers: AnsweredQuestion[]
  setAnswers: (a: AnsweredQuestion[]) => void
  result: AnalysisResult | null
  setResult: (r: AnalysisResult | null) => void
}

const DecisionContext = createContext<DecisionStore | null>(null)

export function DecisionProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<DecisionInput | null>(null)
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null)
  const [documentText, setDocumentText] = useState('')
  const [questions, setQuestions] = useState<AdaptiveQuestions['questions']>([])
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const value = useMemo(
    () => ({
      input,
      setInput,
      extraction,
      setExtraction,
      documentText,
      setDocumentText,
      questions,
      setQuestions,
      answers,
      setAnswers,
      result,
      setResult,
    }),
    [input, extraction, documentText, questions, answers, result],
  )

  return (
    <DecisionContext.Provider value={value}>
      {children}
    </DecisionContext.Provider>
  )
}

export function useDecision() {
  const ctx = useContext(DecisionContext)
  if (!ctx) {
    throw new Error('useDecision must be used within DecisionProvider')
  }
  return ctx
}
