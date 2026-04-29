import trailImg from "@/assets/trail-action.jpg";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Lista de características e benefícios da trilha.
 */
const features = [
  "Aproximadamente 50km de trilhas técnicas",
  "3 níveis de dificuldade (Iniciante ao Pro)",
  "Trajeto mapeado com sinalização de segurança",
  "Paisagens naturais deslumbrantes da Serra de Meruoca",
  "Apoio de equipe técnica e mecânica em pontos estratégicos",
  "Chegada: Buraco da Velha com recepção oficial",
  "Briefing de segurança obrigatório antes da largada",
];

/**
 * Componente TrailSection (A Trilha).
 * Seção que detalha o percurso, quilometragem e o que o piloto encontrará.
 */
export const TrailSection = () => {
  return (
    <section id="trilha" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Detalhe de fundo: Listras diagonais (vibe motocross) */}
      <div className="absolute inset-0 stripes-bg opacity-20 pointer-events-none" />

      <div className="container-tight relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Lado Esquerdo: Imagem com moldura dinâmica e efeito neon */}
        <Reveal variant="left" duration={900}>
          <div className="relative group max-w-xl mx-auto lg:mx-0">
            {/* Efeito de brilho atrás da imagem */}
            <div className="absolute -inset-3 bg-primary/20 blur-2xl rounded-lg group-hover:bg-primary/30 transition-colors duration-500" />
            
            <div className="relative overflow-hidden border-2 border-primary/40 shadow-neon-soft rounded-sm">
              <img
                src={trailImg}
                alt="Piloto enfrentando trecho técnico em trilha off-road"
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={1000}
              />
              {/* Overlay de texto na imagem */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-gradient-to-t from-background via-background/40 to-transparent">
                <p className="font-display text-3xl text-primary animate-glow-pulse">
                  Pronto pra encarar o desafio?
                </p>
              </div>
            </div>

            {/* Badge flutuante indicando a quilometragem */}
            <div
              className="absolute -top-4 -right-4 bg-primary text-background font-display text-2xl px-6 py-2 shadow-neon animate-hover-float rotate-3"
              style={{ ["--rot" as any]: "3deg" }}
            >
              ~50KM
            </div>
          </div>
        </Reveal>

        {/* Lado Direito: Texto informativo e lista de benefícios */}
        <div className="relative">
          <Reveal variant="right" delay={150}>
            <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary mb-2 block">
              O Percurso
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 leading-[0.9] uppercase">
              Detalhes da <span className="text-primary animate-glow-pulse">trilha</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed max-w-lg">
              Um traçado meticulosamente planejado no coração da Serra da Meruoca, 
              equilibrando técnica, resistência e a beleza bruta do sertão cearense.
            </p>

            {/* Lista de Features com ícones */}
            <ul className="space-y-4">
              {features.map((f, i) => (
                <Reveal as="li" key={f} variant="right" delay={200 + i * 80}>
                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="shrink-0 p-1 border border-primary/20 rounded-full group-hover:bg-primary/10 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-foreground/90 group-hover:text-primary transition-colors font-medium">
                      {f}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
