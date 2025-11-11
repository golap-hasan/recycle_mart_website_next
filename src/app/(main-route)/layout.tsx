import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/home/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
