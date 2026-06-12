import { ResultsContent } from '@/components/app/results-content'

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>
}) {
  const { scenario: scenarioId } = await searchParams
  return <ResultsContent scenarioId={scenarioId} />
}
