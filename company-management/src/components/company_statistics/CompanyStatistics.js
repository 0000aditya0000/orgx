import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { FormControl, Select, MenuItem } from "@mui/material";
import DashTopCard from "../dashTopCard/DashTopCard";
import SkillStatistics from "./SkillStatistics";
import DepartmentalOKR from "./DepartmentalOKR";
import EmployeesVsDepartment from "./EmployeesVsDepartment";
import { EmployeeBySkill } from "../filter-by-skill/EmployeeBySkill";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    marginLeft: "4%",
    width: "90%",
    marginTop: "-1.5rem",
  },
  paper: {
    width: "auto",
    height: "max-content",
    borderRadius: "1rem",
    marginBottom: ".5rem",
    boxShadow: "none !important",
  },
  paperSkill: {
    width: "auto",
    height: "max-content",
    borderRadius: "1rem",
    marginBottom: ".5rem",
    boxShadow: "none !important",
    padding: "10px"
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: "1rem",
    position: "relative",
    marginRight: "2rem",
    marginBottom: ".5rem",
  },
  title: {
    fontSize: "3rem",
  },
  filter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "1rem",
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function CompanyStatistics() {
  const classes = useStyles();
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuaerter] = useState("Select");
  const [skillForFilter, setSkillForFilter] = React.useState({});
  const employeeCountData = [
    {
      title: "Total Employees",
      count: 352,
      change: 15,
    },
    {
      title: "Number of Leaves",
      count: 24,
      change: -10,
    },
    {
      title: "New Employees",
      count: 27,
      change: 12,
    },
    {
      title: "Average Hours",
      count: "8 H",
      change: 5,
    },
  ];

  const handleYear = (event) => {
    setYear(event.target.value);
    setQuaerter("Select");
  };

  const handleQuarter = (event) => {
    setQuaerter(event.target.value);
  };

  const handleSkillForFilter = (value) => {
    setSkillForFilter(value)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.heading}>
        <Box className={`${classes.filter}`}>
          <Box className={classes.box}>
            <FormControl style={{ margin: 1, minWidth: 120 }}>
              <Select
                value={year}
                onChange={handleYear}
                className={`filter-color`}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {/* <MenuItem value={2025}>2025</MenuItem> */}
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                {/* <MenuItem value={2022}>2022</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.box} style={{ marginLeft: "2rem" }}>
            <FormControl style={{ margin: 1, minWidth: 120 }}>
              <Select
                value={quarter}
                onChange={handleQuarter}
                className={`filter-color`}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Select"}>Quarter</MenuItem>
                <MenuItem
                  value={`Q1-FMA${year.toString().slice(2, 5)}`}
                >{`Q1-FMA${year.toString().slice(2, 5)}`}</MenuItem>
                <MenuItem
                  value={`Q2-FMA${year.toString().slice(2, 5)}`}
                >{`Q2-FMA${year.toString().slice(2, 5)}`}</MenuItem>
                <MenuItem
                  value={`Q3-FMA${year.toString().slice(2, 5)}`}
                >{`Q3-FMA${year.toString().slice(2, 5)}`}</MenuItem>
                <MenuItem
                  value={`Q4-FMA${year.toString().slice(2, 5)}`}
                >{`Q4-FMA${year.toString().slice(2, 5)}`}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
        style={{
          height: "70%",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid container spacing={2}>
            {employeeCountData.map((data, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper className={`${classes.paper} paperclass2`}>
                  <DashTopCard
                    title={data.title}
                    count={data.count}
                    change={data.change}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Paper className={`${classes.paper} paperclass2`} elevation={0}>
            <EmployeesVsDepartment year={year} quarter={quarter} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            className={`${classes.paper} paperclass2`}
            elevation={0}
          ></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={`${classes.paper} paperclass2`} elevation={0}>
            <DepartmentalOKR year={year} quarter={quarter} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={`${classes.paper} paperclass2`} elevation={0}>
            <SkillStatistics year={year} quarter={quarter} handleSkillForFilter={handleSkillForFilter} filterSkill={skillForFilter} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={`${classes.paperSkill} paperclass2`} elevation={0}>
            <EmployeeBySkill skill={skillForFilter} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
