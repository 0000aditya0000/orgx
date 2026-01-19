import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import doughnutChart from './DoughnutChart';

const chartData = {
        bench: 80,
        project: 10,
  };

describe('DoughnutChart component renders',()=>{
    test('renders doughnut chart',()=>{
        render(<doughnutChart   title={"Working Format"}
            label={["WFO", "WFH"]}
            data={chartData}/>)
    })
})