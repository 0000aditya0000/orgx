import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PracticeCompetency from './PracticeCompetency';

describe('practice competency component renders',()=>{
    test('renders practice competency component',()=>{
        render(<PracticeCompetency/>)
        const divElement = screen.getByText('Coming Soon');
        expect(divElement).toBeInTheDocument();
    })
})