import { describe, it, expect, beforeEach } from "vitest";
import { useRegistrationStore } from "../useRegistrationStore";

describe("useRegistrationStore", () => {
  beforeEach(() => {
    useRegistrationStore.getState().resetForm();
  });

  it("should initialize with default values", () => {
    const state = useRegistrationStore.getState();
    expect(state.formData.nome).toBe("");
    expect(state.formData.termoSaude).toBe(false);
  });

  it("should update form data", () => {
    const { setFormData } = useRegistrationStore.getState();
    setFormData({ nome: "Piloto Teste", email: "teste@email.com" });
    
    const state = useRegistrationStore.getState();
    expect(state.formData.nome).toBe("Piloto Teste");
    expect(state.formData.email).toBe("teste@email.com");
  });

  it("should reset form data", () => {
    const { setFormData, resetForm } = useRegistrationStore.getState();
    setFormData({ nome: "Piloto Teste" });
    resetForm();
    
    const state = useRegistrationStore.getState();
    expect(state.formData.nome).toBe("");
  });

  it("should not update if data is the same (prevent re-renders)", () => {
    const { setFormData } = useRegistrationStore.getState();
    const initialNome = "Mesmo Nome";
    setFormData({ nome: initialNome });
    
    const stateBefore = useRegistrationStore.getState().formData;
    setFormData({ nome: initialNome });
    const stateAfter = useRegistrationStore.getState().formData;
    
    expect(stateBefore).toBe(stateAfter); // Referential equality should hold if JSON stringify check works
  });
});
