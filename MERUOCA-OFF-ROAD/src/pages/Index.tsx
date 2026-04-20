import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { EventDetails } from "@/components/EventDetails";
import { TrailSection } from "@/components/TrailSection";
import { MeruocaSection } from "@/components/MeruocaSection";
import { IncludedSection } from "@/components/IncludedSection";
import { RegistrationSection } from "@/components/RegistrationSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main>
        <Hero />
        <EventDetails />
        <TrailSection />
        <MeruocaSection />
        <IncludedSection />
        <RegistrationSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
