import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EventDetails } from "../EventDetails";
import "@testing-library/jest-dom";

describe("EventDetails Component", () => {
  it("renders the correct start location", () => {
    render(<EventDetails />);
    expect(screen.getByText(/Calçadão/i)).toBeInTheDocument();
    expect(screen.getByText(/Açude do Padre/i)).toBeInTheDocument();
  });

  it("renders all five info cards", () => {
    render(<EventDetails />);
    const labels = ["Data do Evento", "Largada", "Dificuldade", "Percurso", "Inscrição"];
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
