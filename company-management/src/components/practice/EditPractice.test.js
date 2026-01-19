import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import EditPractice from './EditPractice'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import fetchMock from  "jest-fetch-mock"

const theme = createTheme();

fetchMock.enableMocks();

describe('Practice Profile Component',()=>{
    const mockData = {
        message: "Practice retrieved successfully.",
        data: {
            id: 5,
            title: "React",
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
    beforeEach(()=>{
        fetch.resetMocks();
      })

      test('renders studio profile component', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/practice/1']}>
            <Routes>
                <Route path="/practice/:id" element={<EditPractice />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('React')).toBeInTheDocument();
         })
      })
      test('checks API call', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/practice/1']}>
            <Routes>
                <Route path="/practice/:id" element={<EditPractice />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('Example')).toBeInTheDocument();
         })
      })
      test('checks API response data', async () => {
        fetch.mockResponseOnce(JSON.stringify(mockData));
        render(
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/practice/1']}>
            <Routes>
                <Route path="/practice/:id" element={<EditPractice />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByText('Devansh Shukla')).toBeInTheDocument();
         })
      })
})