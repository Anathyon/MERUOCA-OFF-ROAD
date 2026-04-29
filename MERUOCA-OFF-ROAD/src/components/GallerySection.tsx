import { useState } from "react";
import { Reveal } from "./Reveal";
import { Play, X, ZoomIn } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const localMediaItems = [
  {
    type: "image",
    src: "/assets/Acude-Jenipapo.jpg",
    alt: "Açude Jenipapo - Meruoca",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    type: "image",
    src: "/assets/Cahoeira-veu-noiva.jpg",
    alt: "Cachoeira Véu de Noiva",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/Cachoeira-buraco-velha.jpg",
    alt: "Cachoeira Buraco da Velha",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/ARTE-DA-CAMISA-MERUOCA-OFFROAD.jpg.jpeg",
    alt: "Camisa Oficial Meruoca Off-Road",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/dji_fly_20260420_131616_0135_1776702616765_photo.jpg.jpeg",
    alt: "Vista aérea da trilha técnica",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    type: "video",
    src: "/assets/20260419_104035.mp4",
    title: "Ação na Trilha 01",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/quadriciclo.jpg.jpeg",
    alt: "Quadriciclo enfrentando lama",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "video",
    src: "/assets/20260419_104419.mp4",
    title: "Trecho Técnico 01",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/dji_fly_20260420_131546_0134_1776702616973_photo.jpg.jpeg",
    alt: "Vista panorâmica da Serra",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/dji_fly_20260420_131632_0136_1776702616533_photo.jpg.jpeg",
    alt: "Paisagem exuberante da Serra",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "video",
    src: "/assets/20260419_104751.mp4",
    title: "Aventura Off-Road extrema",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "video",
    src: "/assets/20260419_114828.mp4",
    title: "Ação na Trilha 02",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    type: "image",
    src: "/assets/utv.jpg.jpeg",
    alt: "UTV superando obstáculos",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    src: "/assets/dji_fly_20260420_132734_0144_1776702594362_photo.jpg.jpeg",
    alt: "Preparação para a largada",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "video",
    src: "/assets/20260419_104946.mp4",
    title: "Subida íngreme na Meruoca",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "video",
    src: "/assets/20260419_112416.mp4",
    title: "Travessia de Obstáculos complexos",
    span: "md:col-span-2 md:row-span-1",
  },
];

export const GallerySection = () => {
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const mediaItems = localMediaItems;

  return (
    <section id="galeria" className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 checker-bg opacity-5 pointer-events-none" />
      
      <div className="container-tight relative">
        <Reveal variant="up" className="text-center mb-16">
          <span className="font-condensed text-xs uppercase tracking-[0.4em] text-primary mb-2 block">
            Registros Reais
          </span>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
            Galeria do <span className="text-primary animate-glow-pulse">Evento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Confira um pouco do que espera por você na Serra de Meruoca. Adrenalina pura em cada curva.
          </p>
        </Reveal>

        <Dialog.Root open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {mediaItems.map((item: any, i: number) => (
              <Reveal
                key={item.src + i}
                variant="zoom"
                delay={i * 50}
                className={`relative group overflow-hidden rounded-sm border border-primary/20 cursor-pointer ${item.span}`}
              >
                <div onClick={() => setSelectedMedia(item)} className="w-full h-full">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    </div>
                  )}
                  
                  {/* Overlay sutil e Ícone de Zoom/Play */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center bg-background/20 group-hover:scale-110 transition-transform">
                      {item.type === "video" ? (
                        <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                      ) : (
                        <ZoomIn className="w-7 h-7 text-primary" />
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-linear-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-lg text-white uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform truncate">
                      {item.alt || item.title}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/95 backdrop-blur-md z-100 animate-in fade-in duration-300" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl z-100 outline-none animate-in zoom-in-95 duration-300">
              <div className="relative bg-card border border-primary/30 rounded-sm overflow-hidden shadow-neon">
                <Dialog.Close className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-primary hover:text-background rounded-full transition-all border border-primary/20">
                  <X size={24} />
                </Dialog.Close>

                {selectedMedia?.type === "image" ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="w-full max-h-[85vh] object-contain mx-auto"
                  />
                ) : (
                  <video
                    src={selectedMedia?.src}
                    className="w-full max-h-[85vh] aspect-video"
                    controls
                    autoPlay
                    playsInline
                  />
                )}

                <div className="p-6 bg-background/80 border-t border-primary/20">
                  <h3 className="font-display text-3xl text-primary uppercase tracking-tight truncate">
                    {selectedMedia?.alt || selectedMedia?.title}
                  </h3>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
};
