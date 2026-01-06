import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/TestiMonial";
import { Features } from "@/components/Feature"
import Image from "next/image";


export default function Home() {
  return (
      <div className="min-h-screen bg-paper font-sans text-stone-900 selection:bg-brand-200 selection:text-brand-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
  
}
