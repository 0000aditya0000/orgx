import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadFileModal from "./UploadFileModal";
import "@testing-library/jest-dom";


describe("UploadFileModal", () => {
  const onHandleClose = jest.fn();
  const getInfo = jest.fn();

  const defaultProps = {
    open: true,
    onHandleClose,
    getInfo,
    successMessage: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal with correct elements", () => {
    render(<UploadFileModal {...defaultProps} />);

    expect(screen.getByText(/Upload Bulk Employee's/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload CSV file/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload/i })).toBeInTheDocument();
  });

  test("handles file upload and displays loading spinner", async () => {
    render(<UploadFileModal {...defaultProps} />);

    const file = new File(["dummy content"], "employees.csv", {
      type: "text/csv",
    });
    const fileInput = screen.getByLabelText(/Upload CSV file/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText(/employees.csv/i)).toBeInTheDocument();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            message:
              '{"datas":[{"id":1,"name":"John Doe"}]}',
          }),
      })
    );

    const uploadButton = screen.getByRole("button", { name: /Upload/i });
    fireEvent.click(uploadButton);

    expect(
      await screen.findByText(/Employee's data is uploading/i)
    ).toBeInTheDocument();
  });

  test("handles duplicate error and displays error message", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message:
              '{"datas":[{"id":1,"name":"John Doe","message":"Duplicate record"}]}',
          }),
      })
    );

    render(<UploadFileModal {...defaultProps} />);

    const file = new File(["dummy content"], "employees.csv", {
      type: "text/csv",
    });
    const fileInput = screen.getByLabelText(/Upload CSV file/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByRole("button", { name: /Upload/i });
    fireEvent.click(uploadButton);

    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();

    const errorButton = screen.getByText(/Click Here/i);
    fireEvent.click(errorButton);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Duplicate record/i)).toBeInTheDocument();
  });

  test("handles close button click", () => {
    render(<UploadFileModal {...defaultProps} />);

    const closeButton = screen.getByTestId("CloseIcon");
    fireEvent.click(closeButton);

    expect(onHandleClose).toHaveBeenCalled();
  });

  test("handles cancel button click", () => {
    render(<UploadFileModal {...defaultProps} />);

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(onHandleClose).toHaveBeenCalled();
  });
});
