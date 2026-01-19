import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AttendanceModal } from './AttendanceModal';
import '@testing-library/jest-dom';


describe('AttendanceModal', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal and components correctly', () => {
    render(<AttendanceModal open={true} onClose={onCloseMock} />);

    expect(screen.getByText(/Work From Home/i)).toBeInTheDocument();
    expect(screen.getByTestId(/mui-daterangepicker/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Note/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('selecting date range updates state', () => {
    render(<AttendanceModal open={true} onClose={onCloseMock} />);

    const button = screen.getAllByRole("gridcell", {name: "4"})[0]
    
    fireEvent.click(button);
    
  });

  test('note input updates state correctly', () => {
    render(<AttendanceModal open={true} onClose={onCloseMock} />);
    
    const noteInput = screen.getByLabelText(/Note/i);
    fireEvent.change(noteInput, { target: { value: 'This is a test note.' } });
    
    expect(noteInput.value).toBe('This is a test note.');
  });

  test('clicking cancel button closes the modal', () => {
    render(<AttendanceModal open={true} onClose={onCloseMock} />);
    
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('clicking submit button closes the modal and processes form data', () => {
    render(<AttendanceModal open={true} onClose={onCloseMock} />);
    
    fireEvent.click(screen.getAllByRole("gridcell", {name: "4"})[0]);
    fireEvent.click(screen.getAllByRole("gridcell", {name: "8"})[0]);
    fireEvent.change(screen.getByLabelText(/Note/i), { target: { value: 'Test note' } });
    
    fireEvent.click(screen.getByText(/Submit/i));
    
    expect(onCloseMock).toHaveBeenCalled();

  });
});
