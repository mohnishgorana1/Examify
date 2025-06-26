// no header full screen mode
// import { GraduationCap } from "lucide-react";

export default function ExamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col">
      {/* <header className="h-16 bg-neutral-900 shadow flex items-center justify-between px-4">
        <Link
          href={"/"}
          className="flex gap-2 text-2xl font-extrabold tracking-wide font-sans text-orange-500"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="">Examify</span>
        </Link>
      </header> */}
      <div className="min-h-max flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
        {children}
      </div>
    </main>
  );
}
