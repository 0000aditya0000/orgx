import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContactUs from './ContactUs';

describe('renders contact us page',()=>{
    test('check for the conatct us page',()=>{
        render(
            <ThemeProvider theme={createTheme()}>
                <MemoryRouter initialEntries={['/contact-us']}>
                    <Routes>
                        <Route path="/contact-us" element={<ContactUs />} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );
        const submitButton = screen.getByText(/submit/i);
        expect(submitButton).toBeInTheDocument();

    })
    test('check for the conatct us page image render',()=>{
        render(
            <ThemeProvider theme={createTheme()}>
                <MemoryRouter initialEntries={['/contact-us']}>
                    <Routes>
                        <Route path="/contact-us" element={<ContactUs />} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );
        const imageElement = screen.getByAltText(/contactushelp/i);
        expect(imageElement).toBeInTheDocument();

    })
})
test('check for the conatct us page image render',()=>{
    render(
        <ThemeProvider theme={createTheme()}>
            <MemoryRouter initialEntries={['/contact-us']}>
                <Routes>
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    );
    const emailElement = screen.getByText(/We will contact you as soon as we receive your request! Your information is protected by NashTech Policy./i);
    expect(emailElement).toBeInTheDocument();

})
test('check for the conatct us page image render',()=>{
    render(
        <ThemeProvider theme={createTheme()}>
            <MemoryRouter initialEntries={['/contact-us']}>
                <Routes>
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    );
    const emailElement = screen.getByText(/Contact Us request a deep dive demo/i);
    expect(emailElement).toBeInTheDocument();

})