import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {DrawerWrapper} from './DrawerWrapper';
import '@testing-library/jest-dom';
const mockOnHandleClose = jest.fn();
const mockOpenProfileEditModal = jest.fn();

describe('renders drawer wrapper component',()=>{
    test('test wrapper component',()=>{
        render(
            <DrawerWrapper
                open={mockOpenProfileEditModal}
                onHandleClose={mockOpenProfileEditModal}
                title="Employee"
                action="Add"
            />
        );
        expect(screen.getByText('Add Employee')).toBeInTheDocument();
    })
})