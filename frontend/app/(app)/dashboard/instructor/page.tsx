import InstructorDashboard from "@/components/Instructor/InstructorDashboard";

import React from "react";

async function InstructorPage() {
  return (
    <main className="min-h-[90vh] bg-gradient-to-b from-neutral-800 from-5% via-neutral-900 via-50% to-neutral-950 to-90%">
      <InstructorDashboard />
    </main>
  );
}

export default InstructorPage;
