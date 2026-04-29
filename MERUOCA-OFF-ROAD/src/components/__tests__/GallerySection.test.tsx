import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GallerySection } from "../GallerySection";
import "@testing-library/jest-dom";

describe("GallerySection Component", () => {
  it("renders the gallery title", () => {
    render(<GallerySection />);
    expect(screen.getByText(/Galeria do/i)).toBeInTheDocument();
  });

  it("renders multiple media items", () => {
    const { container } = render(<GallerySection />);
    const items = container.querySelectorAll("img, video");
    expect(items.length).toBeGreaterThan(5);
  });
});
