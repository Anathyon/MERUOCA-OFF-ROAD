import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Reveal } from "./Reveal";
import { ShieldCheck, Bike, Trophy } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface ConfirmedPilot {
  id: string;
  nome: string;
  apelidoNumero?: string;
  modalidade: string;
  equipe?: string;
}

/**
 * Seção de Pilotos Confirmados.
 * Exibe apenas quem foi aprovado pelo administrador.
 */
export const ParticipantsSection = () => {
  const [pilots, setPilots] = useState<ConfirmedPilot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca apenas pilotos com status 'confirmed'
    const q = query(
      collection(db, "registrations"), 
      where("status", "==", "confirmed"),
      orderBy("nome", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        apelidoNumero: doc.data().apelidoNumero,
        modalidade: doc.data().modalidade,
        equipe: doc.data().equipe,
      })) as ConfirmedPilot[];
      
      setPilots(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar pilotos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!loading && pilots.length === 0) return null;

  return (
    <section id="pilotos" className="py-20 bg-secondary/20 relative overflow-hidden">
      <div className="container-tight relative z-10">
        <Reveal variant="up" className="text-center mb-12">
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Grid de Largada
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 mb-4 italic">
            Pilotos <span className="text-primary animate-glow-pulse">Confirmados</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Confira quem já garantiu o seu lugar no Meruoca Off Road 2026.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border p-4 rounded-sm flex items-center gap-4">
                <Skeleton className="h-10 w-10 bg-secondary" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            pilots.map((pilot, index) => (
              <Reveal key={pilot.id} variant="up" delay={index * 50}>
                <div className="group relative bg-card border border-border p-4 hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-neon-sm overflow-hidden rounded-sm">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bike size={40} />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary text-primary p-2 clip-slash">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl uppercase italic group-hover:text-primary transition-colors">
                        {pilot.nome}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pilot.apelidoNumero && (
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 font-bold uppercase">
                            #{pilot.apelidoNumero}
                          </span>
                        )}
                        <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 font-bold uppercase">
                          {pilot.modalidade}
                        </span>
                        {pilot.equipe && (
                           <span className="text-[10px] italic text-muted-foreground truncate max-w-[100px]">
                            {pilot.equipe}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
