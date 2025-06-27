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
      <nav className="sticky top-0 z-50 md:grid md:grid-cols-11 flex items-center justify-between md:gap-x-5 w-full px-2 py-4  md:p-4 bg-neutral-900 ">
        <Link
          href="/"
          className=" md:col-span-8 flex items-center gap-1 text-2xl font-bold tracking-tight text-orange-500/80 hover:text-orange-500 transition"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="font-[Playfair_Display]">Examify</span>
        </Link>
        <div className="md:col-span-3 flex items-center md:justify-end">
          <Link
            href={"/dashboard/student"}
            className="bg-transparent border border-orange-500 text-orange-500 py-1 px-4 rounded-sm text-sm"
          >
            Visit Dashboard
          </Link>
        </div>
      </nav>
      <div className="px-4">
        <ExamDetails examId={examId} />
      </div>
    </main>
  );
}

export default ExamPage;
