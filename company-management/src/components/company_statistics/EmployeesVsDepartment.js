import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const data = {
  2023: [
    { value: 28, label: "Frontend" },
    { value: 7, label: "AI/ML" },
    { value: 15, label: "DevOps" },
    { value: 25, label: "Backend" },
    { value: 18, label: "Scala" },
    { value: 10, label: "UI/UX" },
  ],
  2024: [
    { value: 30, label: "Frontend" },
    { value: 8, label: "AI/ML" },
    { value: 17, label: "DevOps" },
    { value: 28, label: "Backend" },
    { value: 20, label: "Scala" },
    { value: 12, label: "UI/UX" },
  ],
  "Q1-FMA23": [
    { value: 24, label: "Frontend" },
    { value: 5, label: "AI/ML" },
    { value: 13, label: "DevOps" },
    { value: 20, label: "Backend" },
    { value: 16, label: "Scala" },
    { value: 8, label: "UI/UX" },
  ],
  "Q2-FMA23": [
    { value: 26, label: "Frontend" },
    { value: 6, label: "AI/ML" },
    { value: 14, label: "DevOps" },
    { value: 22, label: "Backend" },
    { value: 17, label: "Scala" },
    { value: 9, label: "UI/UX" },
  ],
  "Q3-FMA23": [
    { value: 29, label: "Frontend" },
    { value: 8, label: "AI/ML" },
    { value: 16, label: "DevOps" },
    { value: 26, label: "Backend" },
    { value: 19, label: "Scala" },
    { value: 11, label: "UI/UX" },
  ],
  "Q4-FMA23": [
    { value: 30, label: "Frontend" },
    { value: 9, label: "AI/ML" },
    { value: 17, label: "DevOps" },
    { value: 28, label: "Backend" },
    { value: 20, label: "Scala" },
    { value: 12, label: "UI/UX" },
  ],
  "Q1-FMA24": [
    { value: 25, label: "Frontend" },
    { value: 6, label: "AI/ML" },
    { value: 12, label: "DevOps" },
    { value: 22, label: "Backend" },
    { value: 15, label: "Scala" },
    { value: 8, label: "UI/UX" },
  ],
  "Q2-FMA24": [
    { value: 35, label: "Frontend" },
    { value: 9, label: "AI/ML" },
    { value: 20, label: "DevOps" },
    { value: 30, label: "Backend" },
    { value: 22, label: "Scala" },
    { value: 14, label: "UI/UX" },
  ],
  "Q3-FMA24": [
    { value: 22, label: "Frontend" },
    { value: 5, label: "AI/ML" },
    { value: 10, label: "DevOps" },
    { value: 18, label: "Backend" },
    { value: 12, label: "Scala" },
    { value: 7, label: "UI/UX" },
  ],
  "Q4-FMA24": [
    { value: 40, label: "Frontend" },
    { value: 10, label: "AI/ML" },
    { value: 22, label: "DevOps" },
    { value: 35, label: "Backend" },
    { value: 25, label: "Scala" },
    { value: 15, label: "UI/UX" },
  ],
};

const size = {
  width: 400,
  height: 250,
};

export default function EmployeesVsDepartment({year, quarter}) {
  // Get the appropriate data - use quarter data if available and not 'Select', otherwise use year data
  const getChartData = () => {
    if (quarter && quarter !== "Select" && data[quarter]) {
      return data[quarter];
    }
    return data[year] || data[2024] || []; // Fallback to 2024 or empty array
  };

  var datasync = getChartData();
  console.log(datasync);
  return (
    <div style={{ padding: "20px" }}>
      {datasync && datasync.length > 0 ? (
        <PieChart
          series={[
            {
              arcLabelMinAngle: 45,
              data: datasync,
              innerRadius: 40,
              outerRadius: 100,
              paddingAngle: 0,
              borderColor: "black",
              borderWidth: 1,
              cornerRadius: 0,
              startAngle: -90,
              endAngle: 270,
              cx: 150,
              cy: 110,
            },
          ]}
        slotProps={{
          legend: {
            labelStyle: {
              fill: "#999999",
              fontWeight: "normal",
            },
          },
        }}
        sx={{
            marginLeft: "-5rem",
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
          "& .MuiPieArc-root": {
            stroke: "none",
            strokeWidth: 0,
          },
        }}
          {...size}
        />
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
