import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SideNav from './sideNavigation';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';

jest.mock('@mui/material/useMediaQuery');

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const renderComponent = (role, initialRoute = '/') => {
  localStorage.setItem('role', role);
  localStorage.setItem('id', '123');
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <SideNav />
    </MemoryRouter>
  );
};

describe('SideNav', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders SideNav with correct links for admin role', () => {
    useMediaQuery.mockReturnValue(false);
    renderComponent('admin', '/home/company');

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Competency/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee/i)).toBeInTheDocument();
    expect(screen.getByText(/Subscription/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Practices/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('renders SideNav with correct links for non-admin role', () => {
    useMediaQuery.mockReturnValue(false);
    renderComponent('employee', '/home/employee-dashboard/123');

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Competency/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee/i)).toBeInTheDocument();
    expect(screen.queryByText(/Subscription/i)).not.toBeInTheDocument(); 
    expect(screen.queryByText(/Projects/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Practices/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('highlights the current path correctly', async () => {
    useMediaQuery.mockReturnValue(false);
    renderComponent('admin', '/home/company/practices');

    const practicesLink = screen.getByText(/Practices/i);
    await waitFor(() => {
        expect(practicesLink.parentElement.parentElement).toHaveStyle('background-color: #e8ebfc');
    })
  });

  test('renders mobile view correctly', () => {
    useMediaQuery.mockReturnValue(true);
    renderComponent('admin', '/home/company');

    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("DashboardIcon")).toBeInTheDocument();
  });
});
