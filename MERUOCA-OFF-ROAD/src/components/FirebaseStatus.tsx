import { MessageCircle } from "lucide-react";

/**
 * Componente que exibe o botão flutuante do WhatsApp do evento.
 */
export const FirebaseStatus = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Botão de WhatsApp (Suporte) em evidência com animação pulsante no hover */}
      <a 
        href="https://wa.me/558894867591"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 group hover:scale-105 active:scale-95 relative border-2 border-white/20"
      >
        {/* Efeito de Pulso (Ping) no Hover */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:animate-ping group-hover:opacity-20 pointer-events-none"></span>
        
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">WhatsApp do Evento</span>
          <span className="text-sm font-black tracking-wide">
            Falar com Organização
          </span>
        </div>
        <div className="bg-white/20 p-1.5 rounded-full">
          <MessageCircle className="w-6 h-6 fill-white" />
        </div>
      </a>
    </div>
  );
};
