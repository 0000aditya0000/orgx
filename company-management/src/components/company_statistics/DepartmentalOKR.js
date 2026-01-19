import React, { useState } from "react";
import { Card, Box, Typography, Select, MenuItem } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "15px !important",
    padding: 20,
  },
  text: {
    fontSize: "1.5rem !important",
    fontWeight: "bolder !important",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
}));

const dataset = [
  {
    2024: [
      { department: "Frontend", okrs: 100 },
      { department: "Scala", okrs: 20 },
      { department: "Java", okrs: 30 },
      { department: "AI/ML", okrs: 40 },
      { department: "Testing Automation", okrs: 50 },
      { department: "Backend", okrs: 60 },
      { department: "DevOps", okrs: 45 },
      { department: "UI/UX", okrs: 80 },
      { department: "HR", okrs: 35 },
      { department: "Finance", okrs: 70 },
      { department: "Sales", okrs: 90 },
    ],
    2023: [
      { department: "Frontend", okrs: 80 },
      { department: "Scala", okrs: 35 },
      { department: "Java", okrs: 45 },
      { department: "AI/ML", okrs: 60 },
      { department: "Testing Automation", okrs: 25 },
      { department: "Backend", okrs: 70 },
      { department: "DevOps", okrs: 55 },
      { department: "UI/UX", okrs: 90 },
      { department: "HR", okrs: 40 },
      { department: "Finance", okrs: 65 },
      { department: "Sales", okrs: 75 },
    ],
    "Q1-FMA23": [
      { department: "Frontend", okrs: 75 },
      { department: "Scala", okrs: 30 },
      { department: "Java", okrs: 40 },
      { department: "AI/ML", okrs: 55 },
      { department: "Testing Automation", okrs: 20 },
      { department: "Backend", okrs: 65 },
      { department: "DevOps", okrs: 50 },
      { department: "UI/UX", okrs: 85 },
      { department: "HR", okrs: 35 },
      { department: "Finance", okrs: 60 },
      { department: "Sales", okrs: 70 },
    ],
    "Q2-FMA23": [
      { department: "Frontend", okrs: 78 },
      { department: "Scala", okrs: 32 },
      { department: "Java", okrs: 42 },
      { department: "AI/ML", okrs: 58 },
      { department: "Testing Automation", okrs: 22 },
      { department: "Backend", okrs: 68 },
      { department: "DevOps", okrs: 52 },
      { department: "UI/UX", okrs: 87 },
      { department: "HR", okrs: 37 },
      { department: "Finance", okrs: 62 },
      { department: "Sales", okrs: 72 },
    ],
    "Q3-FMA23": [
      { department: "Frontend", okrs: 82 },
      { department: "Scala", okrs: 37 },
      { department: "Java", okrs: 47 },
      { department: "AI/ML", okrs: 62 },
      { department: "Testing Automation", okrs: 27 },
      { department: "Backend", okrs: 72 },
      { department: "DevOps", okrs: 57 },
      { department: "UI/UX", okrs: 92 },
      { department: "HR", okrs: 42 },
      { department: "Finance", okrs: 67 },
      { department: "Sales", okrs: 77 },
    ],
    "Q4-FMA23": [
      { department: "Frontend", okrs: 85 },
      { department: "Scala", okrs: 40 },
      { department: "Java", okrs: 50 },
      { department: "AI/ML", okrs: 65 },
      { department: "Testing Automation", okrs: 30 },
      { department: "Backend", okrs: 75 },
      { department: "DevOps", okrs: 60 },
      { department: "UI/UX", okrs: 95 },
      { department: "HR", okrs: 45 },
      { department: "Finance", okrs: 70 },
      { department: "Sales", okrs: 80 },
    ],
    "Q1-FMA24": [
      { department: "Frontend", okrs: 65 },
      { department: "Scala", okrs: 30 },
      { department: "Java", okrs: 50 },
      { department: "AI/ML", okrs: 55 },
      { department: "Testing Automation", okrs: 40 },
      { department: "Backend", okrs: 75 },
      { department: "DevOps", okrs: 45 },
      { department: "UI/UX", okrs: 85 },
      { department: "HR", okrs: 55 },
      { department: "Finance", okrs: 60 },
      { department: "Sales", okrs: 80 },
    ],
    "Q2-FMA24": [
      { department: "Frontend", okrs: 70 },
      { department: "Scala", okrs: 25 },
      { department: "Java", okrs: 55 },
      { department: "AI/ML", okrs: 45 },
      { department: "Testing Automation", okrs: 35 },
      { department: "Backend", okrs: 80 },
      { department: "DevOps", okrs: 50 },
      { department: "UI/UX", okrs: 75 },
      { department: "HR", okrs: 60 },
      { department: "Finance", okrs: 65 },
      { department: "Sales", okrs: 85 },
    ],
    "Q3-FMA24": [
      { department: "Frontend", okrs: 75 },
      { department: "Scala", okrs: 20 },
      { department: "Java", okrs: 60 },
      { department: "AI/ML", okrs: 50 },
      { department: "Testing Automation", okrs: 30 },
      { department: "Backend", okrs: 85 },
      { department: "DevOps", okrs: 55 },
      { department: "UI/UX", okrs: 80 },
      { department: "HR", okrs: 65 },
      { department: "Finance", okrs: 70 },
      { department: "Sales", okrs: 90 },
    ],
    "Q4-FMA24": [
      { department: "Frontend", okrs: 85 },
      { department: "Scala", okrs: 15 },
      { department: "Java", okrs: 65 },
      { department: "AI/ML", okrs: 40 },
      { department: "Testing Automation", okrs: 25 },
      { department: "Backend", okrs: 90 },
      { department: "DevOps", okrs: 60 },
      { department: "UI/UX", okrs: 70 },
      { department: "HR", okrs: 70 },
      { department: "Finance", okrs: 75 },
      { department: "Sales", okrs: 95 },
    ],
  },
];

export default function DepartmentalOKR({ year, quarter }) {
  const classes = useStyle();

  console.log(dataset[0][year]);

  // Get the appropriate dataset - use quarter data if available and not 'Select', otherwise use year data
  const getDataset = () => {
    if (quarter && quarter !== "Select" && dataset[0][quarter]) {
      return dataset[0][quarter];
    }
    return dataset[0][year] || dataset[0][2024]; // Fallback to 2024 if year data not found
  };

  return (
    <div style={{ borderRadius: "inherit" }}>
      <Card className={`${classes.root} d-okr`} elevation={0}>
        <Box className={`${classes.header} d-okr`}>
          <Typography className={`${classes.text} okr-header-color`}>
            Departmental OKRs
          </Typography>
        </Box>
        <Box my={-3} className={`${classes.bar} d-okr`}>
          <BarChart
            dataset={getDataset()}
            series={[{ dataKey: "okrs", color: "purple" }]}
            xAxis={[
              {
                dataKey: "department",
                scaleType: "band",
                categoryGapRatio: 0.8,
                barGapRatio: 0.5,
                tickLabelStyle: {
                  fill: "#999999",
                  fontWeight: "bolder",
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fill: "#999999",
                  fontWeight: "bold",
                },
              },
            ]}
            height={250}
            slotProps={{
              axisLine: { display: "none" },
              axisTick: { display: "none" },
              bar: {
                rx: 15,
                style: { shapeRendering: "auto" },
              },
            }}
            tooltip={{ trigger: "axis" }}
            axisHighlight={{ x: "none", y: "none" }}
          />
        </Box>
      </Card>
    </div>
  );
}
