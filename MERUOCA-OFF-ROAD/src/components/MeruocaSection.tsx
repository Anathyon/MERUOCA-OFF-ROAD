import meruocaImg from "@/assets/meruoca-mountains.jpg";
import { Reveal } from "./Reveal";

const stats = [
  { value: "+800m", label: "Altitude" },
  { value: "22°C", label: "Clima ameno" },
  { value: "100%", label: "Natureza" },
];

export const MeruocaSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-tight grid md:grid-cols-2 gap-12 items-center">
        <Reveal variant="left" className="order-2 md:order-1">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            O destino
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-6 leading-[0.95]">
            Serra de <span className="text-primary animate-glow-pulse">Meruoca</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            Localizada no noroeste do Ceará, a Serra de Meruoca é um oásis de
            clima ameno, vegetação exuberante e estradas de terra perfeitas
            para quem ama off-road.
          </p>
          <p className="text-muted-foreground text-lg">
            Subidas técnicas, descidas com adrenalina e mirantes de tirar o
            fôlego. O cenário ideal para uma trilha que você nunca vai esquecer.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="up" delay={300 + i * 120}>
                <p className="font-display text-3xl md:text-4xl text-primary text-glow">{s.value}</p>
                <p className="font-condensed text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal variant="right" className="order-1 md:order-2" duration={900}>
          <div className="relative group">
            <div className="absolute -inset-3 bg-primary/15 blur-2xl rounded-lg" />
            <div className="relative overflow-hidden border-2 border-primary/40 shadow-neon-soft">
              <img
                src={meruocaImg}
                alt="Vista aérea das montanhas da Serra de Meruoca"
                className="w-full h-[450px] object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                loading="lazy"
                width={1280}
                height={800}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-primary/40 px-5 py-3 shadow-neon-soft animate-hover-float">
              <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">Localização</p>
              <p className="font-display text-2xl text-primary">Meruoca / CE</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
