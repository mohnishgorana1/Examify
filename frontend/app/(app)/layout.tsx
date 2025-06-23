import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex h-screen flex-col">
        <div>
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto bg-neutral-50">{children}</div>
      </main>
  );
}
