import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Hook personalizado para gerenciar o estado de autenticação do Firebase.
 * Fornece o usuário atual e um estado de carregamento.
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscreve para mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup da subscrição ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
