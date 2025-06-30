import ExaminationRoom from "@/components/Exam/ExaminationRoom";
import React from "react";

async function ExamRoom({ params }: { params: { examId: string } }) {
  const { examId } = await params;
  return (
    <main className="py-4 md:py-8 px-2 md:px-4 lg:px-8">
      <ExaminationRoom examId={examId}/>
    </main>
  );
}

export default ExamRoom;
