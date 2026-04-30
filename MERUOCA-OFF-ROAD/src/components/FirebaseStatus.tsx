import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Loader2, MessageCircle } from "lucide-react";

/**
 * Componente que exibe a contagem de pilotos inscritos e botão de suporte rápido.
 * Posicionado de forma fixa para fornecer prova social e canal direto de dúvidas.
 */
export const FirebaseStatus = () => {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const allDocs = await getDocs(collection(db, "registrations"));
        setCount(allDocs.size);
        setStatus("connected");
      } catch (err) {
        console.error("Erro ao buscar contagem:", err);
        setStatus("error");
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Botão de WhatsApp (Suporte) em evidência com animação pulsante no hover */}
      <a 
        href="https://wa.me/558894368177"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-3 bg-emerald-500 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 group hover:scale-105 active:scale-95 relative"
      >
        {/* Efeito de Pulso (Ping) no Hover */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:animate-ping group-hover:opacity-20 pointer-events-none"></span>
        
        <span className="text-sm font-bold tracking-wide">
          Dúvidas? Fale conosco
        </span>
        <div className="bg-white/20 p-1 rounded-full">
          <MessageCircle className="w-5 h-5 fill-white" />
        </div>
      </a>

      {/* Contador de Pilotos */}
      {status !== "error" && (
        <div className="pointer-events-auto bg-background/80 backdrop-blur-xl border border-primary/20 p-1 pl-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:border-primary/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 leading-tight">
              Pilotos Confirmados
            </span>
            <div className="flex items-baseline gap-1">
              {status === "loading" ? (
                <Loader2 className="w-3 h-3 animate-spin text-primary" />
              ) : (
                <span className="text-xl font-display font-bold text-foreground leading-none">
                  {count}
                </span>
              )}
              <span className="text-[9px] text-muted-foreground font-medium">inscritos</span>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );
};
