import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { NewsExplorer } from "@/components/NewsExplorer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Categories />
        <NewsExplorer />
      </main>
      <Footer />
    </>
  );
}
