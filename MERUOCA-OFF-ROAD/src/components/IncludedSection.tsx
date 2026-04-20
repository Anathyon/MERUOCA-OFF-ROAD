import { Shirt, Trophy, UtensilsCrossed, Backpack, Gift, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Shirt, title: "Blusa Oficial", desc: "Camisa do evento exclusiva para participantes" },
  { icon: Trophy, title: "Troféu", desc: "Lembrança da sua participação no 1º Trilhão" },
  { icon: UtensilsCrossed, title: "Alimentação", desc: "Café da manhã e almoço inclusos" },
  { icon: Backpack, title: "Kit Piloto", desc: "Kit exclusivo entregue na retirada" },
  { icon: Gift, title: "Brinde", desc: "Um mimo especial dos nossos parceiros" },
  { icon: ShieldCheck, title: "Apoio & Segurança", desc: "Equipe de resgate e ambulância em rota" },
];

export const IncludedSection = () => {
  return (
    <section id="incluso" className="relative py-20 md:py-28 bg-gradient-dark overflow-hidden">
      <div className="container-tight">
        <Reveal variant="up" className="text-center mb-14">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            Incluso na inscrição
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-4">
            Tudo o que você <span className="text-primary animate-glow-pulse">recebe</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pacote completo para você focar só no que importa: pilotar.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} variant="zoom" delay={i * 100}>
                <div className="group relative p-6 bg-card border border-border hover:border-primary/60 transition-all duration-500 hover:shadow-neon-soft hover:-translate-y-1 h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/30 group-hover:bg-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-condensed font-bold uppercase text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {it.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
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
