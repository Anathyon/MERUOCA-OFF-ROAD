import { useEffect, useState } from "react";
import { ArrowDown, Calendar, MapPin, Banknote } from "lucide-react";
import logo from "/assets/LOGO-FINAL-MERUOCA-OFFROAD.png";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/assets/Acude-Jenipapo.jpg",
  "/assets/dji_fly_20260420_131546_0134_1776702616973_photo.jpg.jpeg",
  "/assets/dji_fly_20260420_131616_0135_1776702616765_photo.jpg.jpeg",
  "/assets/dji_fly_20260420_131632_0136_1776702616533_photo.jpg.jpeg",
  "/assets/dji_fly_20260420_132734_0144_1776702594362_photo.jpg.jpeg",
  "/assets/quadriciclo.jpg.jpeg",
  "/assets/utv.jpg.jpeg",
];

/**
 * Componente de Hero (Destaque Principal).
 * Exibe um slideshow dinâmico com as imagens originais do evento.
 */
export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = heroImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Slideshow com Efeito Ken Burns */}
      <div className="absolute inset-0 z-0">
        {images.length > 0 ? (
          images.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-2500 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={src}
                alt={`Hero background ${idx}`}
                className={`w-full h-full object-cover transition-transform duration-8000 ease-out ${
                  idx === currentIndex ? "scale-110" : "scale-100"
                }`}
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        )}
        
        {/* Overlay de Escurecimento Profundo (para destacar o texto) */}
        <div className="absolute inset-0 bg-black/65" /> 
        
        {/* Gradiente sutil para integração com o restante da página */}
        <div className="absolute inset-0 bg-linear-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>


      {/* Conteúdo Centralizado */}
      <div className="relative container-tight text-center pt-24 pb-16 animate-float-up">
        {/* Logo principal com brilho pulsante */}
        <img
          src={logo}
          alt="Squile Meruoca Off-Road"
          className="h-24 md:h-36 w-auto mx-auto mb-6 drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
        />

        {/* Badge de Edição */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-condensed text-xs md:text-sm uppercase tracking-[0.25em] text-primary">
            1ª Edição · Trilha Off-Road
          </span>
        </div>

        {/* Título com Tipografia de Impacto */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] mb-4">
          Trilhão <span className="text-primary animate-glow-pulse">Meruoca</span>
          <br />
          Off-Road
        </h1>

        {/* Descrição Curta */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8 px-4 leading-relaxed">
          Uma aventura inesquecível pelas serras de Meruoca — Ceará. 
          50km de trilhas desafiadoras, 3 níveis de dificuldade e adrenalina pura em contato com a natureza.
        </p>

        {/* Informações Rápidas (Data e Local) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border backdrop-blur-sm hover:border-primary/50 transition-colors">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-condensed font-semibold uppercase tracking-wider">
              7 de Junho · 2026
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border backdrop-blur-sm hover:border-primary/50 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-condensed font-semibold uppercase tracking-wider">
              Meruoca · CE
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm hover:bg-primary/30 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <Banknote className="w-4 h-4 text-primary" />
            <span className="font-condensed font-bold uppercase tracking-wider text-primary">
              R$ 80,00
            </span>
          </div>
        </div>

        {/* Botões de Ação Principal (CTA) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="hero" size="xl" className="animate-pulse-neon w-full sm:w-auto text-lg ">
            <a href="#inscricao">Garantir minha vaga</a>
          </Button>
          <Button asChild variant="outlineNeon" size="xl" className="w-full sm:w-auto text-lg">
            <a href="#trilha">Ver detalhes</a>
          </Button>
        </div>

        {/* Link de Scroll para baixo */}
        <a
          href="#evento"
          className="inline-flex mt-16 text-primary/70 hover:text-primary transition-colors transform hover:translate-y-1"
          aria-label="Rolar para baixo"
        >
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
