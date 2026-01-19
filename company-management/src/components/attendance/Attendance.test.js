import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Attendance } from "./Attendance";


describe("AttendanceControl", () => {

  test("renders time and date correctly", () => {
    render(<Attendance />);
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    const dateElement = screen.getByText(/^\w+\s\d{2}\s\w+,\s\d{4}$/);
    expect(timeElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

});
