import { URLs } from "@/constants/urls";
import { ensureAccessToken } from "@/utils/ensureAccessToken";
import axios from "axios";
import React from "react";

interface Params {
  params: { examId: string };
}

async function UpdateExamPage({ params }: Params) {
  const {examId} = await params; 

  const accessToken = ensureAccessToken();
  // const res = await axios.get(`${URLs.backend}/api/v1/exam/${examId}`, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  // console.log("res", res.data);

  const success = false;
//   if (res.data.success) {
//     success = true;
//   }

  return (
    <div>
      UpdateExamPage {success} {examId} {accessToken}
    </div>
  );
}

export default UpdateExamPage;
