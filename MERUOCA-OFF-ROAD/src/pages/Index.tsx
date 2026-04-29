import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

/**
 * Lazy loading de componentes pesados para otimização do bundle inicial.
 * Melhora o tempo de carregamento (LCP) e a performance percebida.
 */
const EventDetails = lazy(() => import("@/components/EventDetails").then(m => ({ default: m.EventDetails })));
const TrailSection = lazy(() => import("@/components/TrailSection").then(m => ({ default: m.TrailSection })));
const MeruocaSection = lazy(() => import("@/components/MeruocaSection").then(m => ({ default: m.MeruocaSection })));
const IncludedSection = lazy(() => import("@/components/IncludedSection").then(m => ({ default: m.IncludedSection })));
const GallerySection = lazy(() => import("@/components/GallerySection").then(m => ({ default: m.GallerySection })));
const RegistrationSection = lazy(() => import("@/components/RegistrationSection").then(m => ({ default: m.RegistrationSection })));
const FaqSection = lazy(() => import("@/components/FaqSection").then(m => ({ default: m.FaqSection })));
const CtaBanner = lazy(() => import("@/components/CtaBanner").then(m => ({ default: m.CtaBanner })));

/**
 * Componente de carregamento (Fallback).
 */
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

/**
 * Página Principal (Index).
 * Estruturada com componentes modulares e carregamento dinâmico (Code Splitting).
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      {/* O Header e o Hero são carregados imediatamente para evitar Layout Shift no topo */}
      <Header />
      
      <main>
        <Hero />
        
        {/* As demais seções são carregadas conforme necessário (Lazy) */}
        <Suspense fallback={<SectionLoader />}>
          <EventDetails />
          <TrailSection />
          <MeruocaSection />
          <IncludedSection />
          <GallerySection />
          <RegistrationSection />
          <FaqSection />
          <CtaBanner />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
