import { Shirt, Trophy, UtensilsCrossed, Backpack, Gift, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Itens inclusos no pacote de inscrição.
 */
const items = [
  { icon: Shirt, title: "Camisa Oficial", desc: "Camisa exclusiva do evento com tecido tecnológico" },
  { icon: Trophy, title: "Troféu de Participação", desc: "Lembrança personalizada para todos os pilotos" },
  { icon: UtensilsCrossed, title: "Alimentação Completa", desc: "Café da manhã e almoço de encerramento inclusos" },
  { icon: Backpack, title: "Kit do Piloto", desc: "Adesivos, numeração e brindes exclusivos" },
  { icon: Gift, title: "Sorteio de Brindes", desc: "Concorra a prêmios especiais dos nossos patrocinadores" },
  { icon: ShieldCheck, title: "Segurança & Apoio", desc: "Equipe médica e resgate técnico durante todo o trajeto" },
];

/**
 * Componente IncludedSection (Incluso na Inscrição).
 * Apresenta em formato de grid os benefícios que o participante recebe.
 */
export const IncludedSection = () => {
  return (
    <section id="incluso" className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Background sutil com listras diagonais */}
      <div className="absolute inset-0 stripes-bg opacity-10 pointer-events-none" />

      <div className="container-tight relative">
        {/* Cabeçalho da Seção */}
        <Reveal variant="up" className="text-center mb-16">
          <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary mb-2 block">
            Vantagens do Piloto
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] mb-6">
            Tudo o que você <span className="text-primary animate-glow-pulse">recebe</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Preparamos um pacote completo de experiência para que você foque 100% na sua pilotagem e no prazer da trilha.
          </p>
        </Reveal>

        {/* Grid de Itens: Layout responsivo (1, 2 ou 3 colunas) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} variant="zoom" delay={i * 80}>
                <div className="group relative p-8 bg-card/40 border border-border/60 rounded-sm hover:border-primary/50 transition-all duration-500 hover:shadow-neon-soft hover:-translate-y-2 h-full overflow-hidden">
                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 bg-linear-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-start gap-5">
                    {/* Container do Ícone com animação de rotação */}
                    <div className="w-14 h-14 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-sm group-hover:bg-primary group-hover:rotate-15 group-hover:scale-110 transition-all duration-300 shrink-0">
                      <Icon className="w-7 h-7 text-primary group-hover:text-background transition-colors" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-display uppercase text-xl md:text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {it.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {it.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
