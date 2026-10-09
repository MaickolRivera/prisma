import { Categories } from "@/sections/Categories";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { Header } from "@/sections/Header";
import { NewsExplorer } from "@/sections/NewsExplorer";

export default function App() {
  return (
    <>
      <Header />
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
