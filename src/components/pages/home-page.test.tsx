import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "@/components/pages/home-page";

describe("HomePage tests", () => {
  render(<HomePage products={[]} inventories={[]} employees={[]} />);

  test("HomePage Products Card test without data", () => {
    expect(
      screen.getByText("Nenhum produto cadastrado até o momento."),
    ).toBeDefined();
  });

  test("HomePage Invetories Card test without data", () => {
    expect(
      screen.getByText("Nenhum inventário registrado até o momento."),
    ).toBeDefined();
  });

  test("HomePage Employees Card test without data", () => {
    expect(
      screen.getByText("Nenhum funcionário cadastrado até o momento."),
    ).toBeDefined();
  });
});
