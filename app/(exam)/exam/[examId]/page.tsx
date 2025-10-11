import ExamDetails from "@/components/Exam/ExamDetails";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface Params {
  params: { examId: string };
}

async function ExamPage({ params }: Params) {
  const { examId } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 md:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl md:text-3xl font-semibold tracking-tight text-indigo-500 hover:text-indigo-400 transition-colors duration-200"
          >
            <GraduationCap
              size={28}
              className="text-indigo-500 animate-pulse"
            />
            <span className="font-[Playfair_Display]">Examify</span>
          </Link>

          {/* Right button */}
          <Link
            href="/dashboard/student"
            className="text-sm md:text-base border border-indigo-500/70 text-indigo-400 hover:text-indigo-300 hover:border-indigo-400 rounded-lg px-4 py-1.5 transition-all duration-300 shadow-sm hover:shadow-indigo-500/20"
          >
            Visit Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="px-3 md:px-6 lg:px-10 py-6 md:py-10">
        <div className="max-w-6xl mx-auto animate-fadeInUp">
          <ExamDetails examId={examId} />
        </div>
      </section>
    </main>
  );
}

export default ExamPage;
