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
    <main>
      <UpdateExamDashboard examId={examId} />
    </main>
  );
}

export default UpdateExamPage;
