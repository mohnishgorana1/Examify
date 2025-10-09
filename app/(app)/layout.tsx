import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col">
      <header>
        <Header />
      </header>

      <div className="">
        <div>{children}</div>
        <Footer />
      </div>
    </main>
  );
}
