import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./EmployeeProfile";

const employeeData = {
  first_name: "John",
  last_name: "Doe",
  gender: "Male",
  marital_status: "Single",
  blood_group: "A+",
  phy_disable: "No",
  aadhaar_card: "1234-5678-9012",
  pan_card: "ABCDE1234F",
  uan: "1234567890",
  email: "john.doe@example.com",
  personal_email: "john.personal@example.com",
  phone: "123-456-7890",
  github: "johndoe",
  whatsapp: "123-456-7891",
  bitbuket: "johndoeb",
  wordpress: "johndoew",
  work_phone: "123-456-7892",
};

const skills = [
  { id: 1, skill_name: "React", level: 5 },
  { id: 2, skill_name: "Node.js", level: 4 },
  { id: 3, skill_name: "GraphQL", level: 3 },
];

describe("Profile component", () => {
  test("renders primary and contact details correctly", () => {
    render(
      <Profile
        employee_data={employeeData}
        skills={skills}
        handleSkill={jest.fn()}
        handleDelete={jest.fn()}
      />
    );

    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Marital Status")).toBeInTheDocument();
    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("Blood Group")).toBeInTheDocument();
    expect(screen.getByText("A+")).toBeInTheDocument();
    expect(screen.getByText("Specially Abled")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Aadhar Card Number")).toBeInTheDocument();
    expect(screen.getByText("1234-5678-9012")).toBeInTheDocument();
    expect(screen.getByText("PAN Card Number")).toBeInTheDocument();
    expect(screen.getByText("ABCDE1234F")).toBeInTheDocument();
    expect(screen.getByText("UAN Number (If any)")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();

    expect(screen.getByText("Work Email")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Personal Email")).toBeInTheDocument();
    expect(screen.getByText("john.personal@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("Git Hub Id")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("Whatsapp Number")).toBeInTheDocument();
    expect(screen.getByText("Bitbucket Id")).toBeInTheDocument();
    expect(screen.getByText("Wordpress ID")).toBeInTheDocument();
    expect(screen.getByText("Work Phone")).toBeInTheDocument();
  });

  test("handles profile edit modal open and close", async () => {
    render(
      <Profile
        employee_data={employeeData}
        skills={skills}
        handleSkill={jest.fn()}
        handleDelete={jest.fn()}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    await waitFor(() => {
      expect(screen.getByText("Personal Detail")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByTestId("edit-modal")).not.toBeInTheDocument();
    });
  });

  test("handles contact edit modal open and close", async () => {
    render(
      <Profile
        employee_data={employeeData}
        skills={skills}
        handleSkill={jest.fn()}
        handleDelete={jest.fn()}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[1]);

    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(screen.queryByTestId("edit-modal")).not.toBeInTheDocument();
    });
  });

  test("renders skills correctly", async () => {
    render(
      <Profile
        employee_data={employeeData}
        skills={skills}
        handleSkill={jest.fn()}
        handleDelete={jest.fn()}
      />
    );

    screen.debug();

    await waitFor(() => {
      skills.forEach((skill) => {
        expect(screen.getByText(skill.skill_name)).toBeInTheDocument();
      });
    });
  });
});
