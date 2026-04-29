import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  /** Porcentagem do elemento visível para disparar o evento (0.0 a 1.0) */
  threshold?: number;
  /** Margem ao redor do root para detecção */
  rootMargin?: string;
  /** Se deve disparar apenas uma vez ao entrar na tela */
  triggerOnce?: boolean;
}

/**
 * Hook customizado para detectar quando um elemento entra na área visível do navegador (viewport).
 * Baseado na API IntersectionObserver.
 * 
 * @param options - Configurações do observador.
 * @returns Ref para o elemento e estado de visibilidade.
 */
export function useReveal<T extends HTMLElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const [visible, setVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // Verifica suporte ao IntersectionObserver (fallback para navegadores antigos)
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Se triggerOnce for true, para de observar após a primeira detecção
          if (triggerOnce && ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, visible };
}
