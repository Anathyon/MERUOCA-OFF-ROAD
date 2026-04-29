import { Calendar, MapPin, Zap, Clock, Banknote } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Dados informativos do evento organizados para exibição em cards.
 */
const items = [
  { icon: Calendar, label: "Data do Evento", value: "07 de Junho", sub: "2026 · Domingo" },
  { icon: MapPin, label: "Largada", value: "Calçadão", sub: "Açude do Padre · Meruoca" },
  { icon: Zap, label: "Dificuldade", value: "Multinível", sub: "Iniciante ao Avançado" },
  { icon: Clock, label: "Percurso", value: "50km+", sub: "08:00 às 16:00" },
  { icon: Banknote, label: "Inscrição", value: "R$ 80", sub: "Kit + Almoço incluso" },
];

/**
 * Componente EventDetails (Detalhes do Evento).
 * Apresenta as informações cruciais (data, local, dificuldade e distância) de forma rápida.
 */
export const EventDetails = () => {
  return (
    <section id="evento" className="relative py-20 md:py-32 bg-background">
      {/* Detalhe estético de fundo: Pontilhados ou Grid sutil */}
      <div className="absolute inset-0 checker-bg opacity-5 pointer-events-none" />

      <div className="container-tight relative">
        {/* Cabeçalho da Seção */}
        <Reveal variant="up" className="text-center mb-16">
          <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary mb-2 block">
            Informações Essenciais
          </span>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none">
            Prepare-se para a <span className="text-primary animate-glow-pulse">aventura</span>
          </h2>
        </Reveal>

        {/* Grid de Cards Informativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.label} variant="up" delay={i * 100}>
                <div className="group relative bg-card/50 border border-border/80 p-8 md:p-10 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-neon-soft rounded-sm h-full flex flex-col items-center text-center">
                  
                  {/* Linha de progresso estética no topo do card */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500" />
                  
                  {/* Ícone com fundo destacado e animação de rotação no hover */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-background transition-colors" />
                  </div>

                  {/* Textos Informativos */}
                  <div className="space-y-1">
                    <p className="font-condensed text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                      {it.label}
                    </p>
                    <p className="font-display text-4xl text-foreground group-hover:text-primary transition-colors">
                      {it.value}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium opacity-80 uppercase tracking-tighter">
                      {it.sub}
                    </p>
                  </div>

                  {/* Elemento visual inferior (triângulo decorativo) */}
                  <div className="absolute bottom-2 right-2 w-0 h-0 border-b-10 border-r-10 border-transparent group-hover:border-b-primary group-hover:border-r-primary transition-all duration-500 opacity-0 group-hover:opacity-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
