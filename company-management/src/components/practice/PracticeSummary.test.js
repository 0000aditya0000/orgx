import React from 'react';
import { render,screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import PracticeSummary from './PracticeSummary.js'

const mockData = {
    message: "Practice retrieved successfully.",
    data: {
        id: 5,
        title: "Example",
        description: "Example",
        total_employee: 0,
        status: "active",
        studio_head: "Devansh Shukla",
        location: "India",
        code: "6751",
        image: "",
        created_at: "2024-06-11T07:52:32.207Z",
        updated_at: "2024-06-11T08:05:57.437Z"
    }
}

describe('Practce Summary Component',()=>{
    test('fetches studio details and renders correctly', async () => {
  
        render(<PracticeSummary summaryData={mockData}  />);
        const divElement = screen.getByText('Example');
        expect(divElement).toBeInTheDocument();
      });
      test('renders Practice Summary component', () => {
  
        const { getByText } = render( <MemoryRouter>
          <PracticeSummary summaryData={mockData} />
        </MemoryRouter>);
        const divElement = getByText('About');
        expect(divElement).toBeInTheDocument();
        
      });
      test('renders Practice Summary component', () => {
  
        const { getByText } = render( <MemoryRouter>
          <PracticeSummary summaryData={mockData} />
        </MemoryRouter>);
        const divElement = getByText('Competencies');
        expect(divElement).toBeInTheDocument();
        
      });
      
})
