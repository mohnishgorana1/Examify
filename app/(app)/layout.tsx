import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col">
      <div className="">
        <header>
          <Header />
        </header>

        <div className="">{children}</div>
      </div>
    </main>
  );
}
