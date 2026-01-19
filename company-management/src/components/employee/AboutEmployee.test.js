import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import About from './AboutEmployee';
import '@testing-library/jest-dom';

describe('About Component', () => {
  const mockEmployeeData = {
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    marital_status: 'Single',
    blood_group: 'O+',
    phy_disable: 'No',
    aadhaar_card: '1234-5678-9101',
    pan_card: 'ABCDE1234F',
    uan: '',
    email: 'john.doe@company.com',
    personal_email: 'john.doe@gmail.com',
    phone: '+91-9876543210',
    github: 'johndoe',
    whatsapp: '+91-9876543210',
    bitbuket: '',
    wordpress: 'johnwordpress',
    work_phone: '+91-1122334455'
  };

  const mockSkills = [
    { id: 1, skill_name: 'JavaScript', level: 5 },
    { id: 2, skill_name: 'React', level: 3 },
  ];

  test('should render Primary Details section correctly', () => {
    render(<About employee_data={mockEmployeeData} skills={mockSkills} />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();

    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();

    expect(screen.getByText('Marital Status')).toBeInTheDocument();
    expect(screen.getByText('Single')).toBeInTheDocument();

    expect(screen.getByText('Blood Group')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();

    expect(screen.getByText('Aadhar Card Number')).toBeInTheDocument();
    expect(screen.getByText('1234-5678-9101')).toBeInTheDocument();
  });

  test('should render Contact Details section correctly', () => {
    render(<About employee_data={mockEmployeeData} skills={mockSkills} />);

    expect(screen.getByText('Work Email')).toBeInTheDocument();
    expect(screen.getByText('john.doe@company.com')).toBeInTheDocument();

    expect(screen.getByText('Personal Email')).toBeInTheDocument();
    expect(screen.getByText('john.doe@gmail.com')).toBeInTheDocument();

    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getAllByText('+91-9876543210')[0]).toBeInTheDocument();

    expect(screen.getByText('Git Hub Id')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
  });

  test('should render EmployeeSkills component with correct props', async () => {
    render(<About employee_data={mockEmployeeData} skills={mockSkills} handleSkill={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    })
  });

  test('should display placeholders for missing data', () => {
    const incompleteData = {
      first_name: '',
      last_name: '',
      gender: '',
      marital_status: '',
      blood_group: '',
      phy_disable: '',
      aadhaar_card: '',
      pan_card: '',
      uan: '',
      email: '',
      personal_email: '',
      phone: '',
      github: '',
      whatsapp: '',
      bitbuket: '',
      wordpress: '',
      work_phone: ''
    };

    render(<About employee_data={incompleteData} skills={mockSkills} />);

    expect(screen.getAllByText('--')).toHaveLength(16);
    expect(screen.getByText('NA')).toBeInTheDocument();
  });
});
