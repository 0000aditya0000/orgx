import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Leaderboard from "./Leaderboard";

const mockData = [
    {
        name: "Jesse Thomas",
        points: 637,
        correct: 98,
        rank: 1,
        rankColor: "success",
      },
      {
        name: "Thisal Mathiyazhagan",
        points: 500,
        correct: 89,
        rank: 2,
        rankColor: "error",
      },
      {
        name: "Helen Chuang",
        points: 748,
        correct: 88,
        rank: 3,
        rankColor: "success",
      },
      {
        name: "Lura Silverman",
        points: 689,
        correct: null,
        rank: 4,
        rankColor: "success",
      },
      {
        name: "Lura Silverman",
        points: 689,
        correct: 98,
        rank: 7,
        rankColor: "success",
      }
    ]

describe("Leaderboard Component", () => {
 

    test("renders Leaderboard Component ", () => {
      const { getByText } = render(
        <MemoryRouter>
          <Leaderboard data ={mockData}/>
        </MemoryRouter>
      );
      const divElement = getByText("Jesse Thomas");
      expect(divElement).toBeInTheDocument();
    });
    test("renders Leaderboard Component ", () => {
      const { getByText } = render(
        <MemoryRouter>
          <Leaderboard data ={mockData}/>
        </MemoryRouter>
      );
      const divElement = getByText("User Leaderboard");
      expect(divElement).toBeInTheDocument();
    });
    
  });