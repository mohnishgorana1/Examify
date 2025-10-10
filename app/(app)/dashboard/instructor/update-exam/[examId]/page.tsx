import UpdateExamDashboard from "@/components/Instructor/UpdateExamDashboard";
import React from "react";

async function UpdateExamPage({ params }: { examId: string }) {
  const { examId } = await params;




  return (
    <main className="w-full min-h-[90vh] bg-gradient-to-b from-neutral-800 from-5% via-35% via-neutral-950 to-black to-90%">
      <UpdateExamDashboard examId={examId} />
    </main>
  )
}

export default UpdateExamPage;
