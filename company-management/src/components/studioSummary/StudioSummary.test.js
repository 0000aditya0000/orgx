import React from 'react';
import { render,screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import StudioSummary from './StudioSummary';

describe('StudioSummary Component', () => {

  test('fetches studio details and renders correctly', async () => {
  
    render(<StudioSummary data={"kotlin competency"} />);
    const divElement = screen.getByText('kotlin competency');
    expect(divElement).toBeInTheDocument();
  });

  test('renders StudioSummary component', () => {
  
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement = getByText('About');
    expect(divElement).toBeInTheDocument();
    
  });
  
  test('renders StudioSummary component', () => {
    
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement1 = getByText('Skill Matrix');
    expect(divElement1).toBeInTheDocument();
  });
  test('renders StudioSummary component', () => {
    
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement1 = getByText('Cloud Computing');
    expect(divElement1).toBeInTheDocument();
  });
  test('renders StudioSummary component', () => {
    
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement1 = getByText('React');
    expect(divElement1).toBeInTheDocument();
  });
  test('renders StudioSummary component', () => {
    
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement1 = getByText('Angular');
    expect(divElement1).toBeInTheDocument();
  });
  test('renders StudioSummary component', () => {
    
    const { getByText } = render( <MemoryRouter>
      <StudioSummary />
    </MemoryRouter>);
    const divElement1 = getByText('Nextjs');
    expect(divElement1).toBeInTheDocument();
  });
  
});

