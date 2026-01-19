import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudioTeam from './StudioTeam';

describe('StudioTeam component renders',()=>{
    test('renders StudioTeam component',()=>{
        render(<StudioTeam/>)
        const divElement = screen.getByText('StudioTeam');
        expect(divElement).toBeInTheDocument();
    })
})