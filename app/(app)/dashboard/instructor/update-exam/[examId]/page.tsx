import UpdateExamDashboard from "@/components/Instructor/UpdateExamDashboard";
import { URLs } from "@/constants/urls";
import { ensureAccessToken } from "@/utils/ensureAccessToken";
import axios from "axios";
import React from "react";

interface Params {
  params: { examId: string };
}

async function UpdateExamPage({ params }: Params) {
  const { examId } = await params;

  return (
    <main className="w-full min-h-[90vh] bg-gradient-to-b from-neutral-800 from-5% via-35% via-neutral-950 to-black to-90%">
      <UpdateExamDashboard examId={examId} />
    </main>
  );
}

export default UpdateExamPage;
