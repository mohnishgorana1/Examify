import ExamDetails from "@/components/Exam/ExamDetails";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface Params {
  params: { examId: string };
}

async function ExamPage({ params }: Params) {
  const { examId } = await params;
  return (
    <main className="text-white">
      <header className="h-16 bg-neutral-800 shadow flex items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-bold tracking-tight text-orange-500/80 hover:text-orange-500 transition"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="font-[Playfair_Display]">Examify</span>
        </Link>
      </header>
      <div className="px-4">
        <ExamDetails examId={examId} />
      </div>
    </main>
  );
}

export default ExamPage;
