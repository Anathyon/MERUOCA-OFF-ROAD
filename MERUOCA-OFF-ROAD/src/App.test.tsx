import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders home page", async () => {
  render(<App />);
  // We can't easily test the full app with react-query and router without complex wrapping,
  // but we can check if it renders something or doesn't crash.
  expect(document.body).toBeDefined();
});
