import { screen, render, fireEvent } from "@testing-library/react";
import CompanyTimeline from "./CompanyTimeline";
import "@testing-library/jest-dom";

describe("Company Timeline", () => {
  test("renders correctly", () => {
    render(<CompanyTimeline />);
    expect(screen.getByText("Company founded by John Doe and Jane Smith"));
  });
});
