import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ActivityCard from "./ActivityCard";

describe("ActivityCard Component", () => {
  test("renders Knolx Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"KnolX"} count={"12"} percent={"23"} />
      </MemoryRouter>
    );
    const divElement = getByText("KnolX");
    expect(divElement).toBeInTheDocument();
  });
  test("renders Certification Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"Certification"} count={"12"} percent={"-1"} />
      </MemoryRouter>
    );
    const divElement = getByText("Certification");
    expect(divElement).toBeInTheDocument();
  });
  test("renders Webinar Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"Webinar"} count={"12"} percent={"23"} />
      </MemoryRouter>
    );
    const divElement = getByText("Webinar");
    expect(divElement).toBeInTheDocument();
  });
  test("renders TechHub Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"TechHub"} count={"12"} percent={"23"} />
      </MemoryRouter>
    );
    const divElement = getByText("TechHub");
    expect(divElement).toBeInTheDocument();
  });
  test("renders Training Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"Training"} count={"12"} percent={"23"} />
      </MemoryRouter>
    );
    const divElement = getByText("Training");
    expect(divElement).toBeInTheDocument();
  });
  test("renders Learning Card ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ActivityCard heading={"Learning"} count={"12"} percent={"23"} />
      </MemoryRouter>
    );
    const divElement = getByText("Learning");
    expect(divElement).toBeInTheDocument();
  });
});
