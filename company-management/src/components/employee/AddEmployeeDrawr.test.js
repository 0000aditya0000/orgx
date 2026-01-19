import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { AddEmployeeDrawr } from "./AddEmployeeDrawr";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const studioMock = [
  { competency_name: "Studio One" },
  { competency_name: "Studio Two" },
];
const designationMock = [
  { title: "Developer" },
  { title: "Automation Tester" },
  { title: "Designer" },
];

describe("AddEmployeeDrawr component", () => {
  const handleClose = jest.fn();
  const mockIsUpdated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });

  test("renders form fields correctly", () => {
    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={jest.fn()}
        designation={designationMock}
        studio={studioMock}
      />
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Designation")).toBeInTheDocument();
    expect(screen.getByText("Studio")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    const divElement = screen.getByText("Add Employee");
    expect(divElement).toBeInTheDocument();
  });

  test("validates form fields correctly", async () => {
    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={jest.fn()}
        isUpdated={jest.fn()}
        studio={studioMock}
        designation={designationMock}
      />
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Please Enter Full Name.")).toBeInTheDocument();
      expect(screen.getByText("Please Enter Designation.")).toBeInTheDocument();
      expect(screen.getByText("Please Enter Studio.")).toBeInTheDocument();
      expect(screen.getByText("Please Enter Gender.")).toBeInTheDocument();
      expect(screen.getByText("Please Enter Email.")).toBeInTheDocument();
      expect(screen.getByText("Please Enter Password.")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    await waitFor(() => {
      expect(
        screen.getByText("Please Enter a Valid Email")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "short" },
    });
    fireEvent.blur(screen.getByLabelText("Password *"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be 8 characters long")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password1234" },
    });
    fireEvent.blur(screen.getByLabelText("Password *"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must have atleast one number, one uppercase, one lowercase and a special character."
        )
      ).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={jest.fn()}
        isUpdated={mockIsUpdated}
        studio={studioMock}
        designation={designationMock}
      />
    );

    fireEvent.change(screen.getByLabelText("Full Name *"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "Password123!" },
    });

    fireEvent.mouseDown(screen.getByLabelText("Designation *"));
    const designationOption = screen.getByText("Developer");
    fireEvent.click(designationOption);

    fireEvent.mouseDown(screen.getByLabelText("Studio *"));
    const studioOption = screen.getByText("Studio One");
    fireEvent.click(studioOption);

    fireEvent.mouseDown(screen.getByLabelText("Gender *"));
    const genderOption = screen.getByText("Male");
    fireEvent.click(genderOption);

    fetch.mockResponseOnce(
      JSON.stringify({ message: "Employee created successfully" })
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockIsUpdated).toHaveBeenCalledTimes(1);
    });
  });

  test("check for duplicate email.", async () => {
    const handleClose = jest.fn();

    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={handleClose}
        studio={studioMock}
        designation={designationMock}
      />
    );

    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "duplicate@example.com" },
    });

    fetch.mockResponseOnce(
      JSON.stringify({ message: "Employee with this email already exist" })
    );

    await waitFor(() => {
      expect(screen.getByText("Employee with this email already exist"));
    });
  });

  test("toggles password visibility", () => {
    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={handleClose}
        isUpdated={mockIsUpdated}
        studio={studioMock}
        designation={designationMock}
      />
    );

    const passwordInput = screen.getByLabelText("Password *");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("cancel button click and invoke the onHandleClose", () => {
    render(
      <AddEmployeeDrawr
        openProfileEditModal={true}
        onHandleClose={handleClose}
        studio={studioMock}
        designation={designationMock}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
