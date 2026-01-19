import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CompanySummary from "./CompanySummary";
import { BrowserRouter } from "react-router-dom";
import Summary from "./CompanySummary.json";
import "@testing-library/jest-dom";

const MockCompanySummary = () => {
  return (
    <BrowserRouter>
      <CompanySummary />
    </BrowserRouter>
  );
};

describe("CompanySummary Component", () => {
  test("renders company details", () => {
    render(<MockCompanySummary />);
    expect(screen.getByText("Nashtech Global")).toBeInTheDocument();
    expect(screen.getByText("Software Consultancy")).toBeInTheDocument();
    expect(screen.getByText("211")).toBeInTheDocument();
    expect(screen.getByText("London, UK")).toBeInTheDocument();
    expect(screen.getByText("054")).toBeInTheDocument();
    expect(screen.getByText("admin@nashtechglobal.com")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Platinum")).toBeInTheDocument();
  });

  test("renders summary cards", () => {
    render(<MockCompanySummary />);
    expect(screen.getByText("Mission and Values")).toBeInTheDocument();
    expect(screen.getByText("Leadership Team")).toBeInTheDocument();
    expect(
      screen.getByText("Culture and Work Environment")
    ).toBeInTheDocument();
    expect(screen.getByText("Organizational Structure")).toBeInTheDocument();
  });

  test("renders mission and values list", () => {
    render(<MockCompanySummary />);
    Summary[0]["mission&values"].forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test("renders leadership team list", () => {
    render(<MockCompanySummary />);
    Summary[0]["leaders"].slice(0, 4).forEach((leader) => {
      expect(
        screen.getByText(`${leader.name}, ${leader.designation}`)
      ).toBeInTheDocument();
    });

    // If there are more than 5 leaders, "View More" button should be displayed
    if (Summary[0]["leaders"].length > 5) {
      expect(screen.getByText("View More")).toBeInTheDocument();
    }
  });

  test("opens and closes the leaders modal", () => {
    render(<MockCompanySummary />);
    if (Summary[0]["leaders"].length > 5) {
      const viewMoreButton = screen.getByText("View More");
      fireEvent.click(viewMoreButton);
      expect(
        screen.getByRole("heading", { name: "Leadership Team" })
      ).toBeInTheDocument();

      const closeButton = screen.getByTestId("CloseIcon");
      fireEvent.click(closeButton);
      expect(
        screen.queryByRole("heading", { name: "Leadership Team" })
      ).not.toBeInTheDocument();
    }
  });

  test("renders Edit button and opens modal", async () => {
    render(<MockCompanySummary />);
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    expect(screen.getByText("Edit Company Profile")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(
        screen.queryByText("Edit Company Profile")
      ).not.toBeInTheDocument();
    });
  });
});
