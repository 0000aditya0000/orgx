import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCards from './Tablecards';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'actions', label: 'Actions' },
];

const rows = {
  name: 'John Doe',
  age: 30,
  actions: 'Edit Actions',
};

describe('TableCards component', () => {
  test('renders with collapsed columns initially', () => {
    render(<TableCards rows={rows} columns={columns} />);

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.queryByText('Edit Actions')).not.toBeInTheDocument();
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
  });

  test('expands to show all columns including actions', () => {
    render(<TableCards rows={rows} columns={columns} />);

    fireEvent.click(screen.getByTestId('ExpandMoreIcon'));

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Edit Actions')).toBeInTheDocument();
    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
  });

  test('collapses back to show only first two columns', () => {
    render(<TableCards rows={rows} columns={columns} />);

    fireEvent.click(screen.getByTestId('ExpandMoreIcon'));

    fireEvent.click(screen.getByTestId('ExpandLessIcon'));

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.queryByText('Edit Actions')).not.toBeInTheDocument();
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
  });
});
