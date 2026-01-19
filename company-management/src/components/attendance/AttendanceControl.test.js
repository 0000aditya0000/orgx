import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AttendanceControl } from "./AttendanceControl";
import "@testing-library/jest-dom";


beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };
});

describe("AttendanceControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGeolocation = (success = true, lat = 51.1, lng = 45.3) => {
    jest.spyOn(navigator.geolocation, "getCurrentPosition").mockImplementation(
      success
        ? (successCallback) =>
            successCallback({
              coords: { latitude: lat, longitude: lng },
            })
        : (_, errorCallback) =>
            errorCallback(new Error("User denied Geolocation"))
    );
  };

  test("renders time and date correctly", () => {
    render(<AttendanceControl />);
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    const dateElement = screen.getByText(/^\w+\s\d{2}\s\w+,\s\d{4}$/);
    expect(timeElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

  test("toggles clock in and clock out states correctly", async () => {
    mockGeolocation(true);
    render(<AttendanceControl />);

    const clockInButton = screen.getByText(/Clock In/i);
    fireEvent.click(clockInButton);

    await waitFor(() => {
      expect(screen.getByText(/Clock Out/i)).toBeInTheDocument();
    });

    const clockOutButton = screen.getByText(/Clock Out/i);
    fireEvent.click(clockOutButton);

    await waitFor(() => {
      expect(screen.getByText(/Clock In/i)).toBeInTheDocument();
    });
  });

  test("displays snackbar on location error", async () => {
    mockGeolocation(false);

    render(<AttendanceControl />);

    fireEvent.click(screen.getByText(/Clock In/i));

    await waitFor(() => {
      expect(screen.getByText(/failed to get location/i)).toBeInTheDocument();
    });
  });

  test("opens and closes the modal", async () => {
    render(<AttendanceControl />);

    const modalButton = screen.getByText(/Work From Home/i);
    fireEvent.click(modalButton);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /work from home/i }));
    });

    fireEvent.click(screen.getByTestId("CloseIcon"));
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /work from home/i })
      ).not.toBeInTheDocument();
    });
  });
});
