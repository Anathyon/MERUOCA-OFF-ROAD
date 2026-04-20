import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md animate-float-up">
        <h1 className="text-9xl font-black text-primary text-glow">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Caminho não encontrado</h2>
          <p className="text-muted-foreground">
            A trilha que você procurou não existe ou foi movida.
          </p>
        </div>
        <Button asChild variant="hero" size="lg">
          <a href="/">Voltar para o Início</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
