import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashTopCard from './DashTopCard';

describe('SubscriptionCard component renders',()=>{
    test('renders SubscriptionCard component',()=>{
        render(<DashTopCard  title={"Total Employees"}
            count={"352"}
            change={"15"}/>)
        const divElement = screen.getByText('Total Employees');
        expect(divElement).toBeInTheDocument();
    })
    test('renders SubscriptionCard component',()=>{
        render(<DashTopCard  title={"Number of Leaves"}
            count={"352"}
            change={"15"}/>)
        const divElement = screen.getByText('Number of Leaves');
        expect(divElement).toBeInTheDocument();
    })
    test('renders SubscriptionCard component',()=>{
        render(<DashTopCard  title={"New Employees"}
            count={"352"}
            change={"15"}/>)
        const divElement = screen.getByText('New Employees');
        expect(divElement).toBeInTheDocument();
    })
    test('renders SubscriptionCard component',()=>{
        render(<DashTopCard  title={"Average Hours"}
            count={"352"}
            change={"15"}/>)
        const divElement = screen.getByText('Average Hours');
        expect(divElement).toBeInTheDocument();
    })
})