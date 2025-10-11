import ExaminationRoom from "@/components/Exam/ExaminationRoom";
import React from "react";

async function ExamRoom({ params }: { params: { examId: string } }) {
  const { examId } = await params;
  return (
    <main className="py-4 px-2 md:px-4 lg:px-5 bg-neutral-900">
      <ExaminationRoom examId={examId}/>
    </main>
  );
}

export default ExamRoom;
