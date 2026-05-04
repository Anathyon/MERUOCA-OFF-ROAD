import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "../ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi, describe, it, expect, Mock } from "vitest";

// Mock do hook useAuth
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("ProtectedRoute", () => {
  it("deve exibir o loader enquanto está carregando", () => {
    (useAuth as Mock).mockReturnValue({ user: null, loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Conteúdo Protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("deve redirecionar para /login se o usuário não estiver autenticado", () => {
    (useAuth as Mock).mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <div>Painel Admin</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });

  it("deve exibir o conteúdo se o usuário estiver autenticado", () => {
    (useAuth as Mock).mockReturnValue({ user: { email: "admin@test.com" }, loading: false });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProtectedRoute>
          <div>Painel Admin</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Painel Admin")).toBeInTheDocument();
  });
});
