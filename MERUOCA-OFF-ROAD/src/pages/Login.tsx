import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck, Lock, Mail, Loader2, Chrome } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/**
 * Página de Login do Sistema Administrativo.
 * Design baseado na paleta neon/dark do site original.
 */
const Login = () => {
  const [gatePassed, setGatePassed] = useState(() => localStorage.getItem("admin_gate") === "true");
  const [gatePassword, setGatePassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  /**
   * Validação do Código de Acesso (Gate)
   */
  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = import.meta.env.VITE_ADMIN_GATE_PASSWORD;
    
    if (gatePassword === secret) {
      setGatePassed(true);
      localStorage.setItem("admin_gate", "true");
      toast.success("Acesso liberado");
    } else {
      toast.error("Código incorreto");
    }
  };

  /**
   * Autenticação via E-mail e Senha
   */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Acesso autorizado!");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      console.error("Login error:", err);
      toast.error("Credenciais inválidas ou erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Autenticação via Google
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Acesso autorizado!");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      console.error("Google login error:", err);
      toast.error("Falha na autenticação com Google.");
    } finally {
      setLoading(false);
    }
  };

  // --- Tela do Gate (Segurança Extra) ---
  if (!gatePassed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 checker-bg opacity-5" />
        <div className="container max-w-sm relative z-10 text-center">
          <Reveal variant="up">
            <Lock className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse-neon rounded-full p-2 border border-primary/20" />
            <h1 className="font-display text-3xl uppercase italic text-glow mb-2">Acesso Restrito</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-8">Insira o código mestre para prosseguir</p>
            
            <form onSubmit={handleGateSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Código de Acesso"
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                className="text-center bg-card border-primary/20 h-14 text-2xl tracking-[0.5em] focus:border-primary"
                autoFocus
              />
              <Button type="submit" variant="hero" className="w-full">Desbloquear</Button>
            </form>
          </Reveal>
        </div>
      </div>
    );
  }

  // --- Tela de Login Real (Firebase) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorativo similar ao resto do site */}
      <div className="absolute inset-0 checker-bg opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-md relative z-10">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-background rounded-sm mb-4 shadow-neon-sm animate-float-up">
              <ShieldCheck size={32} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl uppercase italic text-glow">
              Área <span className="text-primary">Admin</span>
            </h1>
            <p className="text-muted-foreground mt-2 uppercase tracking-widest text-xs">
              Acesso restrito para organizadores
            </p>
          </div>
        </Reveal>

        <Reveal variant="zoom" delay={150}>
          <div className="bg-card/80 border border-border p-8 backdrop-blur-md shadow-card hover:shadow-neon-soft transition-all duration-500 rounded-sm">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-primary font-bold">E-mail</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-primary font-bold">Senha</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full h-12 uppercase font-bold tracking-widest"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar no Sistema"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Ou continuar com</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 gap-3"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome className="w-5 h-5" />
              Google Admin
            </Button>
          </div>
        </Reveal>

        <Reveal variant="up" delay={300}>
          <p className="text-center mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.3em] opacity-50">
            Meruoca Off Road • 2026 • © Todos os direitos reservados
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default Login;
