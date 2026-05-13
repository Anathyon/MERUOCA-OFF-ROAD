import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Interface que define os dados da inscrição.
 */
interface RegistrationData {
  nome: string;
  apelidoNumero: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
  cidade: string;
  equipe: string;
  emergenciaNome: string;
  emergenciaTelefone: string;
  modeloMoto: string;
  cilindrada: string;
  modalidade: string;
  nivel: string;
  participarHard: string;
  tipoSanguineo: string;
  camisa: string;
  observacoes: string;
  termoSaude: boolean;
  termoImagem: boolean;
  termoAmbiente: boolean;
}

interface RegistrationStore {
  formData: RegistrationData;
  setFormData: (data: Partial<RegistrationData>) => void;
  resetForm: () => void;
}

const initialData: RegistrationData = {
  nome: "",
  apelidoNumero: "",
  cpf: "",
  nascimento: "",
  email: "",
  telefone: "",
  cidade: "",
  equipe: "",
  emergenciaNome: "",
  emergenciaTelefone: "",
  modeloMoto: "",
  cilindrada: "",
  modalidade: "",
  nivel: "",
  participarHard: "",
  tipoSanguineo: "",
  camisa: "",
  observacoes: "",
  termoSaude: false,
  termoImagem: false,
  termoAmbiente: false,
};

/**
 * Store global para persistência dos dados da inscrição.
 * Otimizado para evitar loops de renderização.
 */
export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set, get) => ({
      formData: initialData,
      setFormData: (data) => {
        const currentData = get().formData;
        const newData = { ...currentData, ...data };
        
        // Verificação profunda simples para evitar re-renders infinitos
        if (JSON.stringify(currentData) === JSON.stringify(newData)) return;
        
        set({ formData: newData });
      },
      resetForm: () => set({ formData: initialData }),
    }),
    {
      name: "meruoca-registration-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
