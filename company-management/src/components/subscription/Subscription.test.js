import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Subscription from './Subscription';

import fetchMock from  "jest-fetch-mock"

const theme = createTheme();

fetchMock.enableMocks();

describe('Subscription component renders',()=>{
    const mockData = {
        message: "Get All Subscription List Successfully .",
        data: [
            {
                id: 1,
                planName: "Silver",
                numberOfEmployees: 90,
                planDuration: 120,
                planDescription: "Updated description of the plan.",
                price: 199.991,
                status: "active",
                created_at: "2024-06-12T09:14:41.943Z",
                updated_at: "2024-06-12T09:14:41.943Z"
            }
        ]

    }
    beforeEach(()=>{
        fetch.resetMocks();
      })
      test('renders subscription component', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/subscription']}>
            <Routes>
                <Route path="/subscription" element={<Subscription />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('Silver')).toBeInTheDocument();
         })
      })
      test('renders subscription component API Call', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/subscription']}>
            <Routes>
                <Route path="/subscription" element={<Subscription />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('Updated description of the plan.')).toBeInTheDocument();
         })
      })
      test('renders subscription component API Call Response', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/subscription']}>
            <Routes>
                <Route path="/subscription" element={<Subscription />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('199.991')).toBeInTheDocument();
         })
      })
    test('renders Subscription component',()=>{
        render(<Subscription/>)
        const divElement = screen.getByText('Subscription Plans');
        expect(divElement).toBeInTheDocument();
    })
})