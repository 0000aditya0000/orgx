import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SkillModal from "./SkillModal";
import ToastMessage from "../snackbar/ToastMessage";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockHandleSkill = jest.fn();
const mockHandleSkillData = jest.fn();
const mockOnHandleClose = jest.fn();

const skillData = [
  { skill_name: "JavaScript", level: 3, id: 1 },
  { skill_name: "React", level: 4, id: 2 },
  { skill_name: "Typescript", level: 2, id: 3 },
  { skill_name: "Java", level: 5, id: 4 },
];

const allSkills = [
  { skill_name: "JavaScript" },
  { skill_name: "React" },
  { skill_name: "Node.js" },
  { skill_name: "Express" },
  { skill_name: "Angular" },
  { skill_name: "Typescript" },
  { skill_name: "Java" },
];

const employeeData = { id: 123 };
const studioId = 456;

describe("Skill Modal", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  test("renders the SkillModal with correct elements", () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    expect(screen.getByText(/Add Skill/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Close/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  test("allows user to add a skill", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Node.js" } });
    const skillOption = screen.getByText("Node.js");
    fireEvent.click(skillOption);
    fireEvent.blur(input);

    const ratingElement = screen.getAllByTestId("StarIcon")[2];
    fireEvent.click(ratingElement);

    fetch.mockResponseOnce(
      JSON.stringify({ message: "Skill added successfully" }),
      { status: 200 }
    );

    const addButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("employeeSkill"),
      expect.any(Object)
    );
  });

  test("allows user to see the snackbar while adding skill and API response is not ok", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Node.js" } });
    const skillOption = screen.getByText("Node.js");
    fireEvent.click(skillOption);
    fireEvent.blur(input);

    const ratingElement = screen.getAllByTestId("StarIcon")[2];
    fireEvent.click(ratingElement);

    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

    const addButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByText(/Node.js/i)).not.toBeInTheDocument();
    });
  });

  test("allows user to see the snackbar while adding skill and API fails", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Node.js" } });
    const skillOption = screen.getByText("Node.js");
    fireEvent.click(skillOption);
    fireEvent.blur(input);

    const ratingElement = screen.getAllByTestId("StarIcon")[2];
    fireEvent.click(ratingElement);

    fetch.mockResponseOnce(new Error("API Failed"));

    const addButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByText(/Node.js/i)).not.toBeInTheDocument();
    });
  });

  test("allows user to delete a skill", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const deleteButton = screen.getAllByTestId("CancelIcon")[0];

    fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/JavaScript/i)).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("employeeSkill"),
      expect.any(Object)
    );
  });

  test("allows user to see snackbar when delete skill API respons is not ok", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const deleteButton = screen.getAllByTestId("CancelIcon")[0];

    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/JavaScript/i)).toBeInTheDocument();
      expect(screen.getByText(/unable to/i));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("employeeSkill"),
      expect.any(Object)
    );
  });

  test("allows user to see snackbar when delete skill API fails", async () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );

    const deleteButton = screen.getAllByTestId("CancelIcon")[0];

    fetch.mockResponseOnce(new Error("API Failed"));
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/JavaScript/i)).toBeInTheDocument();
      expect(screen.getByText(/something went wrong/i));
    });
  });

  test("add a new skill just by typing and clicking new skill", () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );
    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Next.js" } });
    const skillOption = screen.getByText("Next.js");

    fetch.mockResponseOnce(
      JSON.stringify({ message: "Skill added", data: "Next.js" })
    );
    fireEvent.click(skillOption);
    fireEvent.blur(input);
  });

  test("add a new skill API response not ok", () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );
    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Next.js" } });
    const skillOption = screen.getByText("Next.js");

    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    fireEvent.click(skillOption);
    fireEvent.blur(input);
  });

  test("add a new skill API fails", () => {
    render(
      <SkillModal
        openProfileEditModal={true}
        onHandleClose={mockOnHandleClose}
        handleSkill={mockHandleSkill}
        handleSkillData={mockHandleSkillData}
        skillData={skillData}
        employeeData={employeeData}
        allSkills={allSkills}
        studioId={studioId}
      />
    );
    const input = screen.getByLabelText(/Select Skill/i);
    fireEvent.change(input, { target: { value: "Next.js" } });
    const skillOption = screen.getByText("Next.js");

    fetch.mockResponseOnce(new Error("API failed"));
    fireEvent.click(skillOption);
    fireEvent.blur(input);
  });
});
