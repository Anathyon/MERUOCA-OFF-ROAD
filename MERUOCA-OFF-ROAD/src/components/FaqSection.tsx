import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

/**
 * Base de dados das perguntas frequentes (FAQ).
 * Facilita a adição ou edição de perguntas sem alterar a lógica do componente.
 */
const faqs = [
  {
    q: "Preciso ter experiência para participar?",
    a: "Não obrigatoriamente. O evento foi desenhado com trajetos para 3 níveis de habilidade: Iniciante, Intermediário e Avançado. Você escolhe o seu grupo no ato da inscrição.",
  },
  {
    q: "Quais tipos de veículos são permitidos?",
    a: "Motos Off-Road (Enduro, Motocross, Trail), Quadriciclos e Veículos 4x4. É essencial que o veículo esteja revisado e em boas condições de uso.",
  },
  {
    q: "O que compõe o Kit do Piloto?",
    a: "O kit inclui a Camisa oficial do evento, Troféu de participação, Numeração para o veículo e brindes de patrocinadores.",
  },
  {
    q: "Como será a estrutura de alimentação?",
    a: "Ofereceremos um café da manhã reforçado na concentração e um almoço completo na chegada do evento.",
  },
  {
    q: "Haverá suporte durante o percurso?",
    a: "Sim. Teremos pontos de apoio estratégicos com hidratação, equipe de mecânicos para emergências e suporte médico com ambulância acompanhando o trajeto.",
  },
  {
    q: "Como confirmo meu pagamento?",
    a: "Após a submissão do formulário, nossa equipe enviará as chaves PIX ou boletos via WhatsApp/E-mail. A vaga é garantida somente após o envio do comprovante.",
  },
];

/**
 * Componente FaqSection (Dúvidas Frequentes).
 * Utiliza o componente Accordion para organizar as respostas de forma compacta e intuitiva.
 */
export const FaqSection = () => {
  return (
    <section id="faq" className="relative py-20 md:py-28 bg-background/50">
      <div className="container-tight max-w-4xl mx-auto px-4">
        {/* Título da Seção com Reveal */}
        <Reveal variant="up" className="text-center mb-12">
          <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary block mb-2">
            Central de Ajuda
          </span>
          <h2 className="font-display text-5xl md:text-6xl uppercase leading-tight">
            Perguntas <span className="text-primary animate-glow-pulse">comuns</span>
          </h2>
        </Reveal>

        {/* Accordion List: Estilizado com bordas neon e transições suaves */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={i} variant="up" delay={i * 50}>
              <AccordionItem
                value={`item-${i}`}
                className="bg-card/40 border border-border/60 px-6 rounded-sm hover:border-primary/40 hover:shadow-neon-soft transition-all duration-300"
              >
                <AccordionTrigger className="font-display uppercase tracking-widest text-left text-lg md:text-xl py-5 hover:text-primary hover:no-underline transition-colors group">
                  <span className="flex items-center gap-3">
                    <span className="text-primary/40 group-hover:text-primary transition-colors">#{i + 1}</span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6 border-t border-border/20 pt-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
