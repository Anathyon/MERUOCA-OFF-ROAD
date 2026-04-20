import { RegistrationForm } from "./RegistrationForm";
import { Reveal } from "./Reveal";

export const RegistrationSection = () => {
  return (
    <section id="inscricao" className="relative py-20 md:py-28 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 checker-bg opacity-10" />
      <div className="container-tight relative">
        <Reveal variant="up" className="text-center mb-12">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            Inscrição
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-4">
            Garanta sua <span className="text-primary animate-glow-pulse">vaga</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Preencha o formulário abaixo e entraremos em contato com as
            instruções de pagamento e confirmação.
          </p>
        </Reveal>

        <Reveal variant="zoom" delay={150}>
          <div className="max-w-3xl mx-auto bg-card/80 border border-border p-6 md:p-10 backdrop-blur-sm shadow-card hover:shadow-neon-soft transition-shadow duration-500">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
