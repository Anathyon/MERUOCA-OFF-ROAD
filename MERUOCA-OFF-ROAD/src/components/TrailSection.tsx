import trailImg from "@/assets/trail-action.jpg";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const features = [
  "Aproximadamente 50km de trilhas",
  "3 níveis de dificuldade",
  "Perfeito para iniciantes até avançados",
  "Paisagens naturais deslumbrantes da Serra de Meruoca",
  "Apoio de equipe técnica e mecânica em pontos do percurso",
  "Briefing completo antes da largada",
];

export const TrailSection = () => {
  return (
    <section id="trilha" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 stripes-bg opacity-30" />

      <div className="container-tight relative grid md:grid-cols-2 gap-12 items-center">
        <Reveal variant="left" duration={900}>
          <div className="relative group">
            <div className="absolute -inset-3 bg-primary/20 blur-2xl rounded-lg group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="relative overflow-hidden border-2 border-primary/40 shadow-neon-soft">
              <img
                src={trailImg}
                alt="Piloto enfrentando trecho de lama em trilha"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={1280}
                height={1280}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <p className="font-display text-3xl text-primary animate-glow-pulse">
                  Pronto pra encarar?
                </p>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground font-display text-xl px-4 py-2 shadow-neon animate-hover-float"
              style={{ ["--rot" as any]: "6deg", transform: "rotate(6deg)" }}
            >
              ~50KM
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" delay={150}>
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            O que esperar
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-6 leading-[0.95]">
            Detalhes da <span className="text-primary animate-glow-pulse">trilha</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Um percurso desafiador no coração da Serra da Meruoca, combinando
            adrenalina, técnica e a beleza única do interior cearense.
          </p>

          <ul className="space-y-3">
            {features.map((f, i) => (
              <Reveal as="li" key={f} variant="left" delay={200 + i * 80}>
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-foreground/90 group-hover:text-primary transition-colors">{f}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
