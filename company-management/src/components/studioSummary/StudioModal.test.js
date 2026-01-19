import React from "react";
import { getByLabelText, render, screen,fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StudioModal from "./StudioModal";

describe("renders studio modal", () => {
  test("render correctly", () => {
    render(
      <StudioModal
        open={true}
        handleClose={jest.fn()}
        onhandlesubmitButton={"Save"}
      />
    );
    const divElement = screen.getByText("Add Competency");
    expect(divElement).toBeInTheDocument();
    const nameElement = screen.getByRole("searchbox", {
      name: "Competency Name",
    });
  });
  test("check for error validation after save buttton click", () => {
    render(
      <StudioModal
        open={true}
        handleClose={jest.fn()}
        onhandlesubmitButton={"Save"}
      />
    );
    fireEvent.click(screen.getByRole('button',{name:/SAVE/i}))
    const divElement1 = screen.getByText('Please enter a competency name');
    expect(divElement1).toBeInTheDocument();
  });
//   test("check for error validation after cancel buttton click", () => {
//     render(
//       <StudioModal
//         open={true}
//         handleClose={jest.fn()}
//         onhandlesubmitButton={"Save"}
//       />
//     );
//     fireEvent.click(screen.getByRole('button',{name:/CANCEL/i}))
//     const divElement1 = screen.getByText('Add Competency');
//     expect(divElement1).not.toBeInTheDocument();
//   });
});
