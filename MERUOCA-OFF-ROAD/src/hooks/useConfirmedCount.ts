import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Hook para obter a contagem de pilotos confirmados em tempo real.
 */
export const useConfirmedCount = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "registrations"),
      where("status", "==", "confirmed")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar contagem de confirmados:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { count, loading };
};
