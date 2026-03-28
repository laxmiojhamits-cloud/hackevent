import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Themes from "@/components/Themes";
import Timeline from "@/components/Timeline";
import Prizes from "@/components/Prizes";
import FAQ from "@/components/FAQ";
import RegisterForm from "@/components/RegisterForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Themes />
      <Timeline />
      <Prizes />
      <FAQ />
      <RegisterForm />
      <Footer />
    </main>
  );
}
