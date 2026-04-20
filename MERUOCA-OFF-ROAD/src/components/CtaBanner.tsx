import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const CtaBanner = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 stripes-bg opacity-20 mix-blend-overlay animate-stripe" />

      {/* Marquee de fundo */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none opacity-10">
        <div className="flex whitespace-nowrap animate-marquee font-display text-[8rem] md:text-[12rem] text-primary-foreground leading-none">
          <span className="px-8">MERUOCA · OFF-ROAD · TRILHÃO ·&nbsp;</span>
          <span className="px-8">MERUOCA · OFF-ROAD · TRILHÃO ·&nbsp;</span>
        </div>
      </div>

      <div className="container-tight relative text-center">
        <Reveal variant="zoom">
          <h2 className="font-display text-4xl md:text-7xl text-primary-foreground leading-[0.95] mb-4">
            Pronto pra <br className="md:hidden" />
            aventura?
          </h2>
        </Reveal>
        <Reveal variant="up" delay={150}>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8 font-medium">
            Não perca essa oportunidade de viver uma experiência única
            nas trilhas da Serra de Meruoca.
          </p>
        </Reveal>
        <Reveal variant="up" delay={300}>
          <Button asChild size="xl" className="bg-background text-primary hover:bg-background/90 hover:scale-105 font-condensed font-bold uppercase tracking-wider shadow-card transition-transform duration-300 group">
            <a href="#inscricao">
              Garantir minha vaga <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
