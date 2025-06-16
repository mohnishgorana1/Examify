import Header from "@/components/Header";
import { Providers } from "@/Providers/Providers";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <main className="flex h-screen flex-col">
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 border-b">
          <Link href={"/"} className="text-2xl font-extrabold tracking-wide font-sans">
            <span className="">Examify</span>
          </Link>
        </header>
        <div className="flex-1 overflow-y-auto bg-gray-50">{children}</div>
      </main>
    </Providers>
  );
}
