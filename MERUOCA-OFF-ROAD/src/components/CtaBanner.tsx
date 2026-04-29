import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Componente CtaBanner (Chamada Final).
 * Uma seção de alto contraste com animações de fundo para incentivar a conversão final (inscrição).
 */
export const CtaBanner = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
      {/* Camada de fundo com listras animadas para sensação de velocidade */}
      <div className="absolute inset-0 stripes-bg opacity-30 mix-blend-overlay animate-stripe pointer-events-none" />

      {/* Marquee (Texto em movimento) de fundo para reforço de marca */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none opacity-10 select-none">
        <div className="flex whitespace-nowrap animate-marquee font-display text-[10rem] md:text-[15rem] text-background leading-none font-black">
          <span className="px-10">MERUOCA · OFF-ROAD · TRILHÃO ·&nbsp;</span>
          <span className="px-10">MERUOCA · OFF-ROAD · TRILHÃO ·&nbsp;</span>
        </div>
      </div>

      <div className="container-tight relative text-center z-10">
        {/* Título de Impacto com Reveal */}
        <Reveal variant="zoom">
          <h2 className="font-display text-5xl md:text-8xl text-background leading-[0.85] mb-6 uppercase italic font-black">
            Pronto pra <br className="md:hidden" />
            encarar?
          </h2>
        </Reveal>

        {/* Texto de Apoio */}
        <Reveal variant="up" delay={150}>
          <p className="text-background/90 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-bold uppercase tracking-tight leading-snug">
            As vagas são limitadas. Garanta seu lugar no evento mais esperado do ano nas trilhas da Serra.
          </p>
        </Reveal>

        {/* Botão de Conversão Principal com destaque visual (Inverso) */}
        <Reveal variant="up" delay={300}>
          <Button 
            asChild 
            size="xl" 
            className="bg-background text-primary hover:bg-background/95 hover:scale-110 font-display text-2xl uppercase tracking-widest shadow-2xl transition-all duration-500 group border-none py-8 px-12"
          >
            <a href="#inscricao" className="flex items-center gap-3">
              Inscrever-se agora 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </Button>
        </Reveal>
      </div>

      {/* Detalhe estético: Gradiente lateral sutil */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-gradient-to-r from-primary-deep/20 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-gradient-to-l from-primary-deep/20 to-transparent pointer-events-none" />
    </section>
  );
};
