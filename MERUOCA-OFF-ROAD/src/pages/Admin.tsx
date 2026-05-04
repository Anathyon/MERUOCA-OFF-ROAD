import { useEffect, useState, useMemo } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Users, 
  LogOut, 
  Search, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  FileText,
  Bike
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Interface para os dados do piloto salvos no Firestore
 */
interface PilotRegistration {
  id: string;
  nome: string;
  apelidoNumero?: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  equipe?: string;
  emergenciaNome: string;
  emergenciaTelefone: string;
  modeloMoto: string;
  cilindrada: string;
  modalidade: string;
  nivel: string;
  participarHard: string;
  tipoSanguineo: string;
  camisa: string;
  observacoes?: string;
  comprovanteUrl?: string;
  status: "pending" | "confirmed" | "rejected";
  submittedAt: { toDate: () => Date } | null;
}

/**
 * Painel Administrativo do Meruoca Off Road.
 * Exibe todas as inscrições em uma tabela responsiva e otimizada.
 */
const Admin = () => {
  const [registrations, setRegistrations] = useState<PilotRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [selectedPilot, setSelectedPilot] = useState<PilotRegistration | null>(null);

  /**
   * Busca as inscrições em tempo real do Firestore
   */
  useEffect(() => {
    const q = query(collection(db, "registrations"), orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PilotRegistration[];
      
      setRegistrations(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar registros:", error);
      toast.error("Erro ao carregar dados do banco.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Filtro de busca (Nome, CPF ou E-mail)
   * Otimizado usando useMemo para evitar renders em cascata e cálculos desnecessários.
   */
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return registrations.filter(r => 
      r.nome.toLowerCase().includes(term) || 
      r.cpf.includes(term) || 
      r.email.toLowerCase().includes(term) ||
      r.apelidoNumero?.toLowerCase().includes(term)
    );
  }, [searchTerm, registrations]);

  /**
   * Atualiza o status da inscrição
   */
  const handleStatusChange = async (id: string, newStatus: PilotRegistration["status"]) => {
    try {
      await updateDoc(doc(db, "registrations", id), { status: newStatus });
      toast.success(`Status atualizado para ${newStatus}`);
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Falha ao atualizar status.");
    }
  };

  /**
   * Exclui um registro (Apenas em casos extremos)
   */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta inscrição?")) return;
    try {
      await deleteDoc(doc(db, "registrations", id));
      toast.success("Registro removido.");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Falha ao remover registro.");
    }
  };

  const handleLogout = () => signOut(auth);

  /**
   * Exporta os dados filtrados para CSV
   */
  const exportToCSV = () => {
    const headers = [
      "Nome", "Apelido/Nº", "CPF", "Nascimento", "E-mail", "WhatsApp", 
      "Cidade", "Estado", "Equipe", "Emergência Nome", "Emergência Fone", 
      "Modelo", "Cilindrada", "Modalidade", "Nível", "Hard?", "Sangue", "Camisa", "Obs", "Status"
    ];
    
    const rows = filteredData.map((r: PilotRegistration) => [
      `"${r.nome}"`, `"${r.apelidoNumero || ""}"`, `"${r.cpf}"`, `"${r.nascimento}"`, `"${r.email}"`, `"${r.telefone}"`,
      `"${r.cidade}"`, `"${r.estado}"`, `"${r.equipe || ""}"`, `"${r.emergenciaNome}"`, `"${r.emergenciaTelefone}"`,
      `"${r.modeloMoto}"`, `"${r.cilindrada}"`, `"${r.modalidade}"`, `"${r.nivel}"`, `"${r.participarHard}"`, 
      `"${r.tipoSanguineo}"`, `"${r.camisa}"`, `"${r.observacoes || ""}"`, `"${r.status}"`
    ]);
    
    const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.map((e: string[]) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pilotos_meruoca_2026_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header Admin */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-20">
        <div className="container-tight py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-background p-1.5 clip-slash">
              <Bike size={20} />
            </div>
            <h1 className="font-display text-2xl uppercase italic hidden md:block">
              Painel <span className="text-primary">Admin</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
              Usuário: <span className="text-primary">{auth.currentUser?.email}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-border hover:bg-destructive/10 hover:text-destructive gap-2">
              <LogOut size={16} /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container-tight py-8 animate-float-up">
        {/* Barra de Ferramentas */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Buscar por nome, CPF ou e-mail..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border/50 focus:border-primary/50 h-12"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={exportToCSV} className="flex-1 md:flex-initial gap-2 border-primary/20 hover:bg-primary/5 text-primary">
              <Download size={16} /> Exportar CSV
            </Button>
            <div className="bg-card border border-border px-4 py-2 flex items-center gap-2 rounded-sm text-sm">
              <Users size={16} className="text-primary" />
              <span className="font-bold">{filteredData.length}</span> <span className="text-muted-foreground">Inscrições</span>
            </div>
          </div>
        </div>

        {/* Tabela de Inscrições */}
        <div className="bg-card border border-border rounded-sm overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold border-b border-border">
                  <th className="px-6 py-4">Piloto / Dados</th>
                  <th className="px-6 py-4">Veículo / Categoria</th>
                  <th className="px-6 py-4">Localização</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                      <p className="text-muted-foreground uppercase text-xs tracking-widest">Carregando dados...</p>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                      Nenhuma inscrição encontrada para o filtro atual.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((reg: PilotRegistration) => (
                    <tr key={reg.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {reg.nome} {reg.apelidoNumero && <span className="text-primary/70 font-normal ml-1">({reg.apelidoNumero})</span>}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">{reg.cpf}</span>
                          <span className="text-[10px] text-muted-foreground mt-1">{reg.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-sm">
                          <span className="font-medium">{reg.modeloMoto}</span>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-primary uppercase font-bold">{reg.modalidade}</span>
                            <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold">{reg.nivel}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs text-muted-foreground">
                          <span>{reg.cidade} - {reg.estado}</span>
                          <span className="italic">{reg.equipe || "Sem Equipe"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={reg.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-primary hover:bg-primary/10" 
                            onClick={() => setSelectedPilot(reg)}
                            title="Ver Detalhes"
                          >
                            <FileText size={16} />
                          </Button>
                          {reg.comprovanteUrl && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-primary hover:bg-primary/10" 
                              onClick={() => setSelectedProof(reg.comprovanteUrl!)}
                              title="Ver Comprovante"
                            >
                              <Eye size={16} />
                            </Button>
                          )}
                          <div className="flex bg-secondary/50 rounded-sm p-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={cn("h-7 w-7", reg.status === "confirmed" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary")}
                              onClick={() => handleStatusChange(reg.id, "confirmed")}
                              title="Confirmar"
                            >
                              <CheckCircle size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={cn("h-7 w-7", reg.status === "pending" ? "text-yellow-500 bg-yellow-500/10" : "text-muted-foreground hover:text-yellow-500")}
                              onClick={() => handleStatusChange(reg.id, "pending")}
                              title="Pendente"
                            >
                              <Clock size={14} />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(reg.id)}
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal para ver Comprovante */}
      <Dialog open={!!selectedProof} onOpenChange={(open) => !open && setSelectedProof(null)}>
        <DialogContent className="max-w-3xl bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase text-primary">Comprovante de Pagamento</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            <img src={selectedProof || ""} alt="Comprovante" className="max-h-[70vh] object-contain rounded-sm border border-border shadow-neon-sm" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes Completos */}
      <Dialog open={!!selectedPilot} onOpenChange={(open) => !open && setSelectedPilot(null)}>
        <DialogContent className="max-w-4xl bg-card border-primary/20 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase text-primary italic">Ficha Completa do Piloto</DialogTitle>
          </DialogHeader>
          
          {selectedPilot && (
            <div className="grid md:grid-cols-2 gap-8 p-2">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-primary mb-3 font-bold border-b border-primary/10 pb-1">Identificação</h4>
                  <div className="space-y-2">
                    <DetailItem label="Nome Completo" value={selectedPilot.nome} />
                    <DetailItem label="Apelido / Número" value={selectedPilot.apelidoNumero || "N/A"} />
                    <DetailItem label="CPF" value={selectedPilot.cpf} />
                    <DetailItem label="Nascimento" value={selectedPilot.nascimento} />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-primary mb-3 font-bold border-b border-primary/10 pb-1">Contato e Localização</h4>
                  <div className="space-y-2">
                    <DetailItem label="E-mail" value={selectedPilot.email} />
                    <DetailItem label="WhatsApp" value={selectedPilot.telefone} />
                    <DetailItem label="Cidade/UF" value={`${selectedPilot.cidade} - ${selectedPilot.estado}`} />
                    <DetailItem label="Equipe" value={selectedPilot.equipe || "Sem Equipe"} />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-primary mb-3 font-bold border-b border-primary/10 pb-1">Saúde</h4>
                  <div className="space-y-2">
                    <DetailItem label="Tipo Sanguíneo" value={selectedPilot.tipoSanguineo} />
                    <DetailItem label="Observações" value={selectedPilot.observacoes || "Nenhuma"} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-primary mb-3 font-bold border-b border-primary/10 pb-1">Veículo e Competição</h4>
                  <div className="space-y-2">
                    <DetailItem label="Modelo" value={selectedPilot.modeloMoto} />
                    <DetailItem label="Cilindrada" value={selectedPilot.cilindrada} />
                    <DetailItem label="Modalidade" value={selectedPilot.modalidade} />
                    <DetailItem label="Nível" value={selectedPilot.nivel} />
                    <DetailItem label="Participa do HARD?" value={selectedPilot.participarHard} />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-primary mb-3 font-bold border-b border-primary/10 pb-1">Evento</h4>
                  <div className="space-y-2">
                    <DetailItem label="Tamanho da Camisa" value={selectedPilot.camisa} />
                    <DetailItem label="Data da Inscrição" value={selectedPilot.submittedAt?.toDate ? selectedPilot.submittedAt.toDate().toLocaleString() : "Data indisponível"} />
                    <div className="pt-2">
                      <span className="text-[9px] uppercase text-muted-foreground block mb-1">Status Atual</span>
                      <StatusBadge status={selectedPilot.status} />
                    </div>
                  </div>
                </div>

                {selectedPilot.comprovanteUrl && (
                  <div className="pt-4">
                    <Button 
                      className="w-full gap-2" 
                      variant="outlineNeon" 
                      onClick={() => {
                        setSelectedProof(selectedPilot.comprovanteUrl!);
                        setSelectedPilot(null);
                      }}
                    >
                      <Eye size={16} /> Ver Comprovante
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[9px] uppercase text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

/**
 * Componente Visual para o Status
 */
const StatusBadge = ({ status }: { status: PilotRegistration["status"] }) => {
  const styles = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    confirmed: "bg-primary/10 text-primary border-primary/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20"
  };
  
  const labels = {
    pending: "Pendente",
    confirmed: "Confirmado",
    rejected: "Cancelado"
  };

  return (
    <span className={cn("px-2 py-1 rounded-sm text-[9px] font-bold uppercase border", styles[status])}>
      {labels[status]}
    </span>
  );
};

// Utilitário para concatenar classes
function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}

const Loader2 = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default Admin;
