import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col">
      <header className="h-16 bg-neutral-800 shadow flex items-center justify-between px-4 border-b">
        <Link
          href={"/"}
          className="text-2xl font-extrabold tracking-wide font-sans"
        >
          <span className="">Examify</span>
        </Link>
      </header>
      <div className="flex-1 overflow-y-auto bg-neutral-50">{children}</div>
    </main>
  );
}
