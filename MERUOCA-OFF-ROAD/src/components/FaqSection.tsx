import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "Preciso ter experiência para participar?",
    a: "Não! A trilha conta com 3 níveis de dificuldade, perfeita para quem está começando até pilotos avançados. Você escolhe o seu nível na inscrição.",
  },
  {
    q: "Que tipo de moto posso usar?",
    a: "Qualquer moto off-road (trail, enduro, motocross) em boas condições mecânicas. Recomendamos pneus apropriados para terra/lama.",
  },
  {
    q: "O que está incluso na inscrição?",
    a: "Camisa do evento, troféu, kit piloto, café da manhã, almoço, brinde e estrutura de apoio com equipe técnica e ambulância.",
  },
  {
    q: "Há equipe de apoio na trilha?",
    a: "Sim. Teremos pontos de apoio com hidratação, equipe mecânica e ambulância acompanhando o evento.",
  },
  {
    q: "Posso levar acompanhantes?",
    a: "Acompanhantes são bem-vindos no ponto de largada e chegada. Apenas pilotos inscritos podem participar da trilha.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Após enviar o formulário, entraremos em contato com as instruções de pagamento. Sua vaga será confirmada após o pagamento.",
  },
];

export const FaqSection = () => {
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container-tight max-w-3xl">
        <Reveal variant="up" className="text-center mb-10">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-4">
            Perguntas <span className="text-primary animate-glow-pulse">comuns</span>
          </h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} variant="up" delay={i * 80}>
              <AccordionItem
                value={`item-${i}`}
                className="bg-card border border-border px-5 hover:border-primary/50 hover:shadow-neon-soft transition-all duration-300"
              >
                <AccordionTrigger className="font-condensed font-bold uppercase tracking-wide text-left text-lg hover:text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
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
