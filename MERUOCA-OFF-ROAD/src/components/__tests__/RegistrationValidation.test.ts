import { describe, it, expect } from "vitest";
import { registrationSchema } from "../RegistrationForm";

describe("Registration Schema Validation", () => {
  const validData = {
    nome: "João Silva",
    cpf: "123.456.789-00",
    nascimento: "1990-01-01",
    email: "joao@email.com",
    telefone: "88999999999",
    cidade: "Meruoca",
    estado: "CE",
    emergenciaNome: "Maria Silva",
    emergenciaTelefone: "88888888888",
    modeloMoto: "Honda CRF",
    cilindrada: "161-250",
    modalidade: "Moto",
    nivel: "intermediario",
    participarHard: "SIM",
    tipoSanguineo: "O+",
    camisa: "G",
    termoSaude: true,
    termoImagem: true,
    termoAmbiente: true,
  };

  it("should validate a complete valid data object", () => {
    const result = registrationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail if name is too short", () => {
    const result = registrationSchema.safeParse({ ...validData, nome: "Jo" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Informe seu nome completo");
    }
  });

  it("should fail if CPF is invalid", () => {
    const result = registrationSchema.safeParse({ ...validData, cpf: "123" });
    expect(result.success).toBe(false);
  });

  it("should fail if terms are not accepted", () => {
    const result = registrationSchema.safeParse({ ...validData, termoSaude: false });
    expect(result.success).toBe(false);
  });

  it("should normalize email to lowercase", () => {
    const result = registrationSchema.safeParse({ ...validData, email: "TESTE@EMAIL.COM" });
    if (result.success) {
      expect(result.data.email).toBe("teste@email.com");
    }
  });
});
