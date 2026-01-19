import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Announcement from './Announcement';

describe('Announcement component renders',()=>{
    test('renders doughnut chart',()=>{
        render(<Announcement/>)
        const divElement = screen.getByText('Announcement');
        expect(divElement).toBeInTheDocument();
    })
})