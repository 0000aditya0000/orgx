import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubscriptionCard from './SubscriptionCard'

const mockData = [
    {
        id: 1,
        planName: "Silver",
        numberOfEmployees: 90,
        planDuration: 120,
        planDescription: "Updated description of the plan.",
        price: 199.991,
        status: "inactive",
        created_at: "2024-06-12T09:14:41.943Z",
        updated_at: "2024-06-12T09:14:41.943Z"
    }
]

describe('SubscriptionCard component renders',()=>{
    test('renders SubscriptionCard component',()=>{
        render(<SubscriptionCard data={mockData}/>)
        const divElement = screen.getByText('Upgrade');
        expect(divElement).toBeInTheDocument();
    })
    test('renders SubscriptionCard component',()=>{
        render(<SubscriptionCard data={mockData}/>)
        const divElement = screen.getByText('10 Users');
        expect(divElement).toBeInTheDocument();
    })
    test('renders SubscriptionCard component',()=>{
        render(<SubscriptionCard data={mockData}/>)
        const divElement = screen.getByText('Unlimited Projects');
        expect(divElement).toBeInTheDocument();
    })
})