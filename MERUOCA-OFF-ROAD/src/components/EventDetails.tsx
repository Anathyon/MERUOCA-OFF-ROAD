import { Calendar, MapPin, Zap, Clock } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Calendar, label: "Data", value: "7 de Junho", sub: "2026 · Domingo" },
  { icon: MapPin, label: "Local", value: "Meruoca", sub: "Ceará · Brasil" },
  { icon: Zap, label: "Dificuldade", value: "3 níveis", sub: "Iniciante a avançado" },
  { icon: Clock, label: "Distância", value: "~50km", sub: "Dia inteiro" },
];

export const EventDetails = () => {
  return (
    <section id="evento" className="relative py-20 md:py-28">
      <div className="container-tight">
        <Reveal variant="up" className="text-center mb-14">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            Informações do Evento
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-4">
            Marque na <span className="text-primary animate-glow-pulse">agenda</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.label} variant="up" delay={i * 120}>
                <div className="group relative bg-card border border-border p-6 md:p-8 hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-neon-soft h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">
                    {it.label}
                  </p>
                  <p className="font-display text-3xl md:text-4xl text-foreground mt-1">
                    {it.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{it.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
