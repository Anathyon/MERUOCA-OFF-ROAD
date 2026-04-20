import { ArrowDown, Calendar, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-motocross.jpg";
import logo from "@/assets/logo-meruoca.png";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BG image com Ken Burns sutil */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Piloto de motocross saltando ao entardecer nas montanhas"
          className="w-full h-full object-cover object-[center_30%]"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Stripes lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary shadow-neon hidden md:block" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary shadow-neon hidden md:block" />

      <div className="relative container-tight text-center pt-24 pb-16 animate-float-up">
        <img
          src={logo}
          alt="Squile Meruoca Off-Road"
          className="h-24 md:h-36 w-auto mx-auto mb-6 drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-condensed text-xs md:text-sm uppercase tracking-[0.25em] text-primary">
            1ª Edição · Trilha Off-Road
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] mb-4">
          Trilhão <span className="text-primary animate-glow-pulse">Meruoca</span>
          <br />
          Off-Road
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8 px-4">
          Uma aventura inesquecível pelas serras de Meruoca — Ceará.
          50km de trilhas, 3 níveis de dificuldade, adrenalina pura.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-condensed font-semibold uppercase tracking-wider">
              7 de Junho · 2026
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-condensed font-semibold uppercase tracking-wider">
              Meruoca · CE
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="hero" size="xl" className="animate-pulse-neon w-full sm:w-auto">
            <a href="#inscricao">Garantir minha vaga</a>
          </Button>
          <Button asChild variant="outlineNeon" size="xl" className="w-full sm:w-auto">
            <a href="#trilha">Ver detalhes</a>
          </Button>
        </div>

        <a
          href="#evento"
          className="inline-flex mt-16 text-primary/70 hover:text-primary transition-colors"
          aria-label="Rolar para baixo"
        >
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
