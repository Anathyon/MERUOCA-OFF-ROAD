import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Definição dos links de navegação para facilitar a manutenção.
 */
const links = [
  { href: "#evento", label: "Evento" },
  { href: "#trilha", label: "A Trilha" },
  { href: "#incluso", label: "Incluso" },
  { href: "#galeria", label: "Galeria" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Componente de Cabeçalho (Header).
 * Gerencia a navegação principal, o estado de rolagem (scrolled) e o menu mobile.
 */
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Monitora o scroll da página para aplicar estilos dinâmicos (transparência vs blur)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo com efeito de brilho suave ao passar o mouse */}
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src="/assets/LOGO-FINAL-MERUOCA-OFFROAD.png"
            alt="Squile Meruoca Off-Road"
            className="h-[59px] md:h-[68px] w-auto drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-transform group-hover:scale-105"
          />
        </a>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-condensed font-semibold uppercase text-sm tracking-wider text-foreground/80 hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
            >
              {l.label}
            </a>
          ))}
          <Button className="" asChild variant="hero" size="sm">
            <a href="#inscricao">Inscrever-se</a>
          </Button>
        </nav>

        {/* Botão do Menu Mobile */}
        <button
          className="md:hidden text-foreground p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="px-4 sm:px-8 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-condensed font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary text-lg"
              >
                {l.label}
              </a>
            ))}
            <Button className="text-emerald-200" asChild variant="hero" onClick={() => setOpen(false)}>
              <a href="#inscricao">Inscrever-se</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
