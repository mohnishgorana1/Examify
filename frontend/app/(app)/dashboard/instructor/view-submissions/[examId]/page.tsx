import ViewSubmissions from "@/components/Instructor/ViewSubmissions";
import React from "react";


interface Params {
  params: { examId: string };
}

async function ViewSubmissionsPage({ params }: Params) {
  const { examId } = await params;
  return (
    <main className="h-screen md:min-h-[90vh] px-2 md:px-4 lg:px-6 bg-gradient-to-b from-neutral-950 from-5% via-neutral-900 via-30% to-neutral-800 to-80%">
      <ViewSubmissions examId={examId} />
    </main>
  );
}

export default ViewSubmissionsPage;
