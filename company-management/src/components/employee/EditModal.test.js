import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditModal from "./EditModal";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "123" }),
}));

describe("EditModal Component", () => {
  const mockOnHandleClose = jest.fn();
  const mockIsUpdated = jest.fn();
  const mockEmployee = {
    first_name: "Test",
    last_name: null,
    designation: "Project Manager",
    role: "employee",
    gender: "Male",
    email: "test@nashtech.com",
    password: "Password@123",
    image: null,
    location: null,
    marital_status: null,
    blood_group: null,
    phy_disable: null,
    pan_card: null,
    aadhaar_card: null,
    uan: null,
    personal_email: null,
    phone: null,
    whatsapp: null,
    wordpress: null,
    github: null,
    bitbuket: null,
    work_phone: null,
    address: null,
    tenant_id: 1,
    studio_name: "Front-end",
  };

  const defaultProps = {
    openProfileEditModal: true,
    onHandleClose: mockOnHandleClose,
    onHandleSubmit: jest.fn(),
    isUpdated: mockIsUpdated,
    studio: [],
  };

  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("should render correctly with required fields for personal details", () => {
    render(<EditModal {...defaultProps} type="personalDetails" />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
  });

  test("should show validation errors when required fields are missing", () => {
    render(<EditModal {...defaultProps} type="personalDetails" />);

    const updateButton = screen.getByText(/Update/i);
    fireEvent.click(updateButton);

    expect(screen.getByText(/Please Enter Full Name./i)).toBeInTheDocument();
    expect(screen.getByText(/Please Enter Gender./i)).toBeInTheDocument();
  });

  test("should handle email validation correctly", async () => {
    fetch.mockResponses(
      [JSON.stringify({ data: mockEmployee }), { status: 200 }],
      [JSON.stringify({ message: "Employee can be created with this email" })]
    );

    render(<EditModal {...defaultProps} type="Contact Details" />);

    const emailInput = screen.getByLabelText(/Work Email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/Please Enter a Valid Email/i)).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: "valid.email@example.com" },
    });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.queryByText(/Please Enter a Valid Email/i)
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("CheckCircleOutlineIcon")).toBeInTheDocument();
    });
  });

  test("should handle duplicate email validation correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: mockEmployee }), {
      status: 200,
    });
    render(<EditModal {...defaultProps} type="Contact Details" />);

    const emailInput = screen.getByLabelText(/Work Email */i);
    jest.useFakeTimers();
    fireEvent.change(emailInput, {
      target: { value: "valid.email@example.com" },
    });

    jest.runAllTimers();
    fetch.mockResponseOnce(
      JSON.stringify({ message: "Employee with this email already exist" }),
      {
        status: 200,
      }
    );

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Employee with this email already exist/i)
      ).toBeInTheDocument();
    });
  });
  test("should handle duplicate email validation fails correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: mockEmployee }), {
      status: 200,
    });
    render(<EditModal {...defaultProps} type="Contact Details" />);

    const emailInput = screen.getByLabelText(/Work Email */i);
    jest.useFakeTimers();
    fireEvent.change(emailInput, {
      target: { value: "valid.email@example.com" },
    });

    jest.runAllTimers();
    fetch.mockResponseOnce(
      JSON.stringify({ }),
      {
        status: 404,
      }
    );

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Unable to fetch email/i)
      ).toBeInTheDocument();
    });
  });

  test("should call the update API and close modal on successful update", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: mockEmployee }), {
      status: 200,
    });

    render(<EditModal {...defaultProps} type="personalDetails" />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: "John" } });

    fetch.mockResponseOnce(
      JSON.stringify({
        message: "Employee updated successfully",
        data: { id: "123" },
      })
    );

    const updateButton = screen.getByText(/Update/i);
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockIsUpdated).toHaveBeenCalledWith("123", "updated");
      expect(mockOnHandleClose).toHaveBeenCalled();
    });
  });

  test("should handle API errors gracefully", async () => {
    fetch.mockReject(new Error("API Error"));

    render(<EditModal {...defaultProps} type={"personalDetails"} />);

    const updateButton = screen.getByText(/Update/i);
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockIsUpdated).toHaveBeenCalledWith(expect.any(String), "error");
      expect(mockOnHandleClose).toHaveBeenCalled();
    });
  });

  test("should close the modal when cancel button is clicked", () => {
    render(<EditModal {...defaultProps} type={"personalDetails"} />);

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(mockOnHandleClose).toHaveBeenCalled();
  });
});
