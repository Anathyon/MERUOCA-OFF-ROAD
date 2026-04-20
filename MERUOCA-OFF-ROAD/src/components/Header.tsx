import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-meruoca.png";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#evento", label: "Evento" },
  { href: "#trilha", label: "A Trilha" },
  { href: "#incluso", label: "Incluso" },
  { href: "#faq", label: "FAQ" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
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
      <div className="container-tight flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Squile Meruoca Off-Road"
            className="h-10 md:h-12 w-auto drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-condensed font-semibold uppercase text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant="hero" size="sm">
            <a href="#inscricao">Inscrever-se</a>
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <nav className="container-tight py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-condensed font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="hero" onClick={() => setOpen(false)}>
              <a href="#inscricao">Inscrever-se</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
