import { Reveal } from "./Reveal";

/**
 * Estatísticas rápidas sobre a região da Meruoca.
 */
const stats = [
  { value: "+800m", label: "Altitude" },
  { value: "22°C", label: "Clima Médio" },
  { value: "100%", label: "Off-Road" },
];

/**
 * Componente MeruocaSection (O Destino).
 * Seção de contextualização sobre a localização geográfica e atrativos naturais da Serra.
 */
export const MeruocaSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background/30 overflow-hidden">
      <div className="container-tight grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Lado do Texto: Descrição e Estatísticas */}
        <Reveal variant="left" className="order-2 lg:order-1">
          <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary mb-2 block">
            O Cenário Perfeito
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] mb-8">
            Serra de <span className="text-primary animate-glow-pulse">Meruoca</span>
          </h2>
          
          <div className="space-y-6 max-w-xl">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Situada no maciço residual do noroeste cearense, a Serra de Meruoca é um verdadeiro oásis. 
              Conhecida por seu clima serrano, vegetação densa e trilhas que serpenteiam vales e picos.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Prepare-se para subidas técnicas que exigem potência, descidas sinuosas com adrenalina 
              e mirantes naturais que oferecem uma das vistas mais bonitas do estado.
            </p>
          </div>

          {/* Grid de Estatísticas: Com animação sequencial */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border/40">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="up" delay={400 + i * 150}>
                <div className="group cursor-default">
                  <p className="font-display text-4xl md:text-5xl text-primary text-glow group-hover:scale-110 transition-transform duration-300 origin-left">
                    {s.value}
                  </p>
                  <p className="font-condensed text-xs uppercase tracking-wider text-muted-foreground mt-1 font-bold">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Lado Visual: Imagem com moldura e badge de localização */}
        <Reveal variant="right" className="order-1 lg:order-2" duration={1000}>
          <div className="relative group max-w-xl mx-auto lg:mx-0">
            {/* Efeito de luz de fundo */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            
            <div className="relative overflow-hidden border-2 border-primary/30 shadow-card rounded-sm aspect-4/3">
              <img
                src="/assets/dji_fly_20260420_131546_0134_1776702616973_photo.jpg.jpeg"
                alt="Vista panorâmica das montanhas da Serra de Meruoca capturada por drone"
                className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>

            {/* Badge flutuante (Card de localização) */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary/40 px-6 py-4 shadow-neon animate-hover-float rounded-xs">
              <p className="font-condensed text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">
                Localização Exata
              </p>
              <p className="font-display text-3xl text-primary leading-none">
                Meruoca / CE
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
