import React from "react";
import ActivityCard from "./ActivityCard";
import OKRCompletion from "../OKRCompletion/OKRCompletion";
import Grid from "@mui/material/Grid";
import DoughnutChart from "../doughnutChart/DoughnutChart";
import { Box, Typography } from "@mui/material";
import Leaderboard from "./Leaderboard";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Project from "../projectEmployement/projectEmployement";

function StudioContribution() {
  const [defaultYear, setDefaultYear] = React.useState("2024");
  const [defaultQuarter, setDefaultQuarter] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState(2024);

  const handleChangeYear = (event) => {
    const selectedValue = event.target.value;
    setDefaultYear(selectedValue);
    setSelectedYear(selectedValue);
    setDefaultQuarter(1);
  };
  const handleChangeQuarter = (event) => {
    const selectedValue = event.target.value;
    setDefaultQuarter(selectedValue);
    setSelectedYear(selectedValue);
  };

  const chartData = {
    1: [
      {
        bench: 90,
        project: 80,
      },
    ],
    2: [
      {
        bench: 50,
        project: 30,
      },
    ],
    2024: [
      {
        bench: 80,
        project: 10,
      },
    ],
    2023: [
      {
        bench: 5,
        project: 80,
      },
    ],
  };

  const cardData = {
    1: [
      {
        heading: "KnolX",
        count: 0o2,
        percent: -10,
      },
      {
        heading: "Certification",
        count: 10,
        percent: 30,
      },
      {
        heading: "Webinar",
        count: 15,
        percent: -15,
      },
      {
        heading: "TechHub",
        count: 13,
        percent: -19,
      },
      {
        heading: "Training",
        count: 18,
        percent: 18,
      },
      {
        heading: "Learning",
        count: 12,
        percent: 14,
      },
    ],
    2: [
      {
        heading: "KnolX",
        count: 11,
        percent: 10,
      },
      {
        heading: "Certification",
        count: 23,
        percent: 20,
      },
      {
        heading: "Webinar",
        count: 0o7,
        percent: 15,
      },
      {
        heading: "TechHub",
        count: 13,
        percent: 19,
      },
      {
        heading: "Training",
        count: 10,
        percent: -18,
      },
      {
        heading: "Learning",
        count: 11,
        percent: -14,
      },
    ],
    2024: [
      {
        heading: "KnolX",
        count: 12,
        percent: 10,
      },
      {
        heading: "Certification",
        count: 20,
        percent: 20,
      },
      {
        heading: "Webinar",
        count: 5,
        percent: -5,
      },
      {
        heading: "TechHub",
        count: 10,
        percent: -19,
      },
      {
        heading: "Training",
        count: 15,
        percent: 18,
      },
      {
        heading: "Learning",
        count: 16,
        percent: 14,
      },
    ],
    2023: [
      {
        heading: "KnolX",
        count: 15,
        percent: 12,
      },
      {
        heading: "Certification",
        count: 25,
        percent: 22,
      },
      {
        heading: "Webinar",
        count: 5,
        percent: 5,
      },
      {
        heading: "TechHub",
        count: 10,
        percent: 19,
      },
      {
        heading: "Training",
        count: 15,
        percent: -18,
      },
      {
        heading: "Learning",
        count: 16,
        percent: -14,
      },
    ],
  };
  const users = {
    1: [
      {
        name: "Jesse Thomas",
        points: 637,
        correct: 98,
        rank: 1,
        rankColor: "success",
      },
      {
        name: "Thisal Mathiyazhagan",
        points: 500,
        correct: 89,
        rank: 2,
        rankColor: "error",
      },
      {
        name: "Helen Chuang",
        points: 748,
        correct: 88,
        rank: 3,
        rankColor: "success",
      },
      {
        name: "Lura Silverman",
        points: 689,
        correct: null,
        rank: 4,
        rankColor: "success",
      },
      {
        name: "Lura Silverman",
        points: 689,
        correct: 98,
        rank: 7,
        rankColor: "success",
      },
      {
        name: "John Doe",
        points: 637,
        correct: 85,
        rank: 5,
        rankColor: "success",
      },
      {
        name: "Jane Smith",
        points: 600,
        correct: 70,
        rank: 6,
        rankColor: "success",
      },
    ],
    2: [
      {
        name: "Jesse Thomas",
        points: 700,
        correct: 99,
        rank: 1,
        rankColor: "success",
      },
      {
        name: "Thisal Mathiyazhagan",
        points: 620,
        correct: 80,
        rank: 2,
        rankColor: "error",
      },
      {
        name: "Helen Chuang",
        points: 655,
        correct: 85,
        rank: 3,
        rankColor: "success",
      },
      {
        name: "Lura Silverman",
        points: 600,
        correct: 75,
        rank: 4,
        rankColor: "success",
      },
      {
        name: "John Smith",
        points: 630,
        correct: 82,
        rank: 7,
        rankColor: "success",
      },
      {
        name: "Alice Johnson",
        points: 645,
        correct: 87,
        rank: 5,
        rankColor: "success",
      },
      {
        name: "Michael Brown",
        points: 610,
        correct: 78,
        rank: 6,
        rankColor: "success",
      },
    ],
    2024: [
      {
        name: "Jack Johnson",
        points: 700,
        correct: 98,
        rank: 1,
        rankColor: "success",
      },
      {
        name: "Emma Watson",
        points: 600,
        correct: 89,
        rank: 2,
        rankColor: "error",
      },
      {
        name: "Oliver White",
        points: 650,
        correct: 88,
        rank: 3,
        rankColor: "success",
      },
      {
        name: "Sophia Lee",
        points: 625,
        correct: null,
        rank: 4,
        rankColor: "success",
      },
      {
        name: "Liam Smith",
        points: 630,
        correct: null,
        rank: 7,
        rankColor: "success",
      },
      {
        name: "Ava Brown",
        points: 640,
        correct: null,
        rank: 5,
        rankColor: "success",
      },
      {
        name: "Noah Taylor",
        points: 610,
        correct: null,
        rank: 6,
        rankColor: "success",
      },
    ],
    2023: [
      {
        name: "Ethan Johnson",
        points: 720,
        correct: 95,
        rank: 1,
        rankColor: "success",
      },
      {
        name: "Aria Wilson",
        points: 610,
        correct: 85,
        rank: 2,
        rankColor: "error",
      },
      {
        name: "Mason Lee",
        points: 680,
        correct: 88,
        rank: 3,
        rankColor: "success",
      },
      {
        name: "Sophia Miller",
        points: 645,
        correct: 75,
        rank: 4,
        rankColor: "success",
      },
      {
        name: "Liam Davis",
        points: 630,
        correct: 80,
        rank: 7,
        rankColor: "success",
      },
      {
        name: "Olivia Brown",
        points: 655,
        correct: 82,
        rank: 5,
        rankColor: "success",
      },
      {
        name: "Noah Taylor",
        points: 620,
        correct: 78,
        rank: 6,
        rankColor: "success",
      },
    ],
  };

  const okrData = {
    1: [95, 85, 70, 60, 80, 90, 75, 85, 95, 100, 65, 80],
    2: [80, 70, 60, 50, 75, 85, 65, 75, 85, 90, 55, 70],
    2023: [90, 80, 65, 55, 75, 85, 70, 80, 90, 95, 60, 75],
    2024: [85, 75, 55, 45, 70, 80, 60, 70, 80, 85, 50, 65],
  };
  const selectedCardData = cardData[selectedYear] || [];
  const selecteduserData = users[selectedYear] || [];
  const selectedChartData = chartData[selectedYear] || [];
  const selectedOkrData = okrData[selectedYear] || [];

  return (
    <Box>
      <Box sx={{ display: "flex", float: "right" }}>
        <Typography sx={{ marginTop: "1.2rem" }}>Filter By:</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={defaultYear}
            onChange={handleChangeYear}
            displayEmpty
            className="contriselect  filter-color"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={defaultQuarter}
            onChange={handleChangeQuarter}
            displayEmpty
            className="contriselect filter-color"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={1}>Q1 FMA 2024</MenuItem>
            <MenuItem value={2}>Q2 FMA 2024</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {selectedCardData.map((data) => (
              <Grid item xs={2} sm={4} md={4} key={data.heading}>
                <Box>
                  <ActivityCard
                    heading={data.heading}
                    count={data.count}
                    percent={data.percent}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* <Grid item xs={6}>
          <Box sx={{ borderRadius: "0.3rem" }}>
            <OKRCompletion data={selectedOkrData} />
          </Box>
        </Grid> */}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
          gap: "5rem",
        }}
      >
         <Box sx={{ width: "49%", height: "100% !important" }} my={2}>
         <Project/>
        </Box>
        <Box sx={{ width: "49%", height: "100% !important" }} my={2}>
          <DoughnutChart
            title={"Employee Skillset"}
            label={["Bench", "Project"]}
            data={selectedChartData}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default StudioContribution;
