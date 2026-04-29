import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitário para concatenação de classes Tailwind.
 * Combina clsx e tailwind-merge para garantir que classes conflitantes sejam resolvidas corretamente.
 * @param inputs - Lista de classes ou condições.
 * @returns String de classes otimizada.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
