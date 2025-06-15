import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <div>
            {/* header */}
            <Header />
            {/* home component */}
        </div>
        <div>
            {children}
        </div>
    </main>
  );
}
