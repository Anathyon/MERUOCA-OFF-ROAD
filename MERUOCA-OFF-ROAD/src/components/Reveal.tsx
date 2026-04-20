import { ReactNode, CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "fade" | "tilt";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
  threshold?: number;
}

const baseStyles: Record<Variant, CSSProperties> = {
  up: { transform: "translate3d(0, 40px, 0)" },
  down: { transform: "translate3d(0, -40px, 0)" },
  left: { transform: "translate3d(-50px, 0, 0)" },
  right: { transform: "translate3d(50px, 0, 0)" },
  zoom: { transform: "scale(0.9)" },
  fade: { transform: "none" },
  tilt: { transform: "perspective(800px) rotateX(12deg) translate3d(0, 30px, 0)" },
};

export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className,
  as = "div",
  threshold,
}: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold });
  const Tag = as as any;

  const style: CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : baseStyles[variant].transform,
    willChange: "opacity, transform",
  };

  return (
    <Tag ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
};
