import { Instagram, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/logo-meruoca.png";

export const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border pt-16 pb-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-neon-edge" style={{ background: "var(--gradient-neon-edge)" }} />

      <div className="container-tight">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <img src={logo} alt="Squile Meruoca Off-Road" className="h-16 mb-4" />
            <p className="text-sm text-muted-foreground">
              1º Trilhão Meruoca Off-Road. Uma celebração da paixão pelas
              trilhas e pela serra cearense.
            </p>
          </div>

          <div>
            <h4 className="font-condensed font-bold uppercase tracking-wider text-primary mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#evento" className="text-muted-foreground hover:text-primary transition-colors">Evento</a></li>
              <li><a href="#trilha" className="text-muted-foreground hover:text-primary transition-colors">A Trilha</a></li>
              <li><a href="#incluso" className="text-muted-foreground hover:text-primary transition-colors">Incluso</a></li>
              <li><a href="#inscricao" className="text-muted-foreground hover:text-primary transition-colors">Inscrição</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-condensed font-bold uppercase tracking-wider text-primary mb-4">
              Contato
            </h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" aria-label="E-mail" className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Squile Meruoca Off-Road. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
