import ViewExamSubmissions from '@/components/Instructor/ViewExamResults';
import React from 'react'

async function ViewExamResultsPage({ params }: { examId: string }) {
  const { examId } = await params;

  return (
    <main className="w-full min-h-[90vh] bg-gradient-to-b from-neutral-800 from-5% via-35% via-neutral-950 to-black to-90%">
      <ViewExamSubmissions examId={examId} />
    </main>
  )
}

export default ViewExamResultsPage