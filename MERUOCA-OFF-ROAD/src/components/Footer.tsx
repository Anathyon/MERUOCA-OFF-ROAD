import { Instagram, MessageCircle, Mail, Youtube, Music } from "lucide-react";

/**
 * Componente de Rodapé (Footer).
 * Contém informações sobre o evento, links de navegação rápida e contatos sociais.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border pt-16 pb-8">
      {/* Detalhe estético: Linha neon no topo do footer */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-gradient from-transparent via-primary to-transparent opacity-50" />

      <div className="container-tight">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Coluna 1: Branding */}
          <div className="space-y-4">
            <img 
              src="/assets/LOGO-FINAL-MERUOCA-OFFROAD.png" 
              alt="Squile Meruoca Off-Road" 
              className="h-16 mb-4 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.3)] hover:scale-105 transition-transform" 
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              1º Trilhão Meruoca Off-Road. Uma celebração da paixão pelas
              trilhas e pela exuberante serra cearense. Adrenalina com responsabilidade.
            </p>
          </div>

          {/* Coluna 2: Navegação Interna */}
          <div>
            <h4 className="font-display text-xl text-primary mb-6 tracking-wider">
              Mapa do Site
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              {[
                { href: "#evento", label: "O Evento" },
                { href: "#trilha", label: "A Trilha" },
                { href: "#incluso", label: "Incluso" },
                { href: "#inscricao", label: "Inscrição" },
                { href: "#faq", label: "Dúvidas" },
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary/40 rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais e Contato */}
          <div>
            <h4 className="font-display text-xl text-primary mb-6 tracking-wider">
              Conecte-se
            </h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/p/DW4uhCekXuF/?igsh=MWViMmhrZ3Uwcnh3cQ%3D%3D" },
                { icon: Music, label: "TikTok", href: "https://www.tiktok.com/@meruocaoffroad?_r=1&_t=ZS-95l2nusMyc0" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@offroadmeruoca?si=Wy0pqLFRwIneAlcY" },
                { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/5588999999999" }, // Placeholder para WhatsApp, já que não foi fornecido
                { icon: Mail, label: "E-mail", href: "mailto:offroadmeruoca@gmail.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center border border-border/60 rounded-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              Siga para atualizações em tempo real
            </p>
          </div>
        </div>

        {/* Direitos Autorais e Créditos */}
        <div className="pt-8 border-t border-border/40 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            © {currentYear} <span className="text-primary/80 font-bold">Squile Meruoca Off-Road</span>. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-tighter">
            Desenvolvido com foco em performance e segurança.
          </p>
        </div>
      </div>
    </footer>
  );
};
