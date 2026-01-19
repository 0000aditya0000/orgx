import { screen, render, fireEvent } from "@testing-library/react";
import CompanyEditModal from "./CompanyEditModal";
import "@testing-library/jest-dom";

describe("Company Edit Modal", () => {
  const mockHandleClose = jest.fn();
  test("should render correctly", () => {
    render(<CompanyEditModal onClose={mockHandleClose} open={true} />);

    expect(screen.getByText(/Edit Company Profile/));
    expect(screen.getByLabelText(/Organizational Structure/i));
  });

  test("should be enter values in fields", () => {
    render(<CompanyEditModal onClose={mockHandleClose} open={true} />);

    const nameElement = screen.getByLabelText(/name/i);
    fireEvent.change(nameElement, { target: { value: "Nashtech" } });
  });

  test("submit correctly", () => {
    render(<CompanyEditModal onClose={mockHandleClose} open={true} />);

    const nameElement = screen.getByLabelText(/name/i);
    fireEvent.change(nameElement, { target: { value: "Nashtech" } });
    const emailElement = screen.getByLabelText(/email/i);
    fireEvent.change(emailElement, {
      target: { value: "Testing@example.com" },
    });
    const typeElement = screen.getByLabelText(/company type/i);
    fireEvent.change(typeElement, { target: { value: "IT Solution" } });
    const codeElement = screen.getByLabelText(/company code/i);
    fireEvent.change(codeElement, { target: { value: "1130" } });
    const projectElement = screen.getByLabelText(/total projects/i);
    fireEvent.change(projectElement, { target: { value: "50" } });
    const employeesElement = screen.getByLabelText(/total employees/i);
    fireEvent.change(employeesElement, { target: { value: "3000" } });

    const aboutElement = screen.getByLabelText(/about/i);
    fireEvent.change(aboutElement, {
      target: {
        value:
          "Aliquip ex id nostrud nulla velit elit tempor adipisicing velit. Pariatur dolore sint et et sit et culpa consectetur. Reprehenderit officia est amet ad non aliqua et nostrud minim proident. Eiusmod mollit eiusmod quis consectetur ipsum nisi nisi deserunt duis. Elit non elit sint do ex et eu. Qui et cupidatat dolor tempor occaecat laborum mollit mollit.",
      },
    });
    const cweElement = screen.getByLabelText(/Culture and work environment/i);
    fireEvent.change(cweElement, {
      target: {
        value:
          "Aliquip sint duis eiusmod magna tempor fugiat irure labore quis mollit. Amet excepteur eiusmod reprehenderit exercitation commodo laborum qui in ex duis eu elit dolor. Nulla culpa ea aliquip ex mollit nisi reprehenderit ea. Aliquip qui et cupidatat ea. Ipsum ad velit Lorem sit eu consequat elit tempor. Aute cillum esse aliqua aliquip cupidatat consequat consectetur reprehenderit et proident exercitation in cillum tempor.",
      },
    });

    const structureElement = screen.getByLabelText(/organizational structure/i);
    fireEvent.change(structureElement, {
      target: {
        value:
          "Eiusmod culpa ex ad ad consequat anim ullamco magna mollit. Quis incididunt aute non ea culpa velit Lorem. Nulla labore ea sunt voluptate. Est sint enim officia nisi aliquip pariatur id proident magna. Esse do est enim laborum ex veniam do id veniam irure magna. Adipisicing duis Lorem consectetur anim proident labore. Tempor commodo amet sunt sit laborum laboris officia veniam anim fugiat pariatur.",
      },
    });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test("closes correctly", () => {
    render(<CompanyEditModal onClose={mockHandleClose} open={true} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
