import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { AttendanceControl } from "../attendance/AttendanceControl";
import Post from "../EmployeeDashboard/Post";
import OKRCompletion from "../OKRCompletion/OKRCompletion";
import Announcement from "../EmployeeDashboard/Announcement";
import { makeStyles } from "@mui/styles";
import SkillStatistics from "../company_statistics/SkillStatistics";
import ProjectAllocation from './ProjectAllocation'
import { EmployeeBySkill } from "../filter-by-skill/EmployeeBySkill";
import StudioTeams from "../studioTeam/StudioTeam";
import TeamsCard from "./TeamsCard";
import ReportingTeam from "./ReportingTeam";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "2.5rem !important",
    marginTop: "20px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif !important",
    fontWeight: "700 !important",
    lineHeight: "1.625 !important",
    letterSpacing: "-0.00833em !important",
  },
  competencyPaper: {
    padding: "10px",
    borderRadius: "1rem !important",
    height: "100%",
    width: "100%",
  },
}));

export const StudioHeadDashboard = () => {
  const classes = useStyles();
  const data = [100, 20, 30, 40, 50, 60, 70, 80, 100, 100, 50, 70];
  const [skillForFilter, setSkillForFilter] = useState({});

  const handleSkillForFilter = (value) => {
    setSkillForFilter(value)
  }
  return (
    <Stack direction={"column"} my={2} gap={2}>
      <Typography className={`${classes.title}`}>Competency Analytics</Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper
              className={`${classes.competencyPaper} paperclass`}
              elevation={0}
            >
              <OKRCompletion data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              className={`${classes.competencyPaper} paperclass`}
              elevation={0}
              sx={{
                padding: "10px"
              }}
            >
              <ProjectAllocation />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {" "}
            <Paper
              className={`${classes.competencyPaper} paperclass`}
              elevation={0}
            >
              <SkillStatistics year={2024} quarter={"Select"} handleSkillForFilter={handleSkillForFilter} filterSkill={skillForFilter}/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <Paper
              className={`${classes.competencyPaper} paperclass`}
              elevation={0}
            >
              <EmployeeBySkill skill={skillForFilter} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              className={`paperclass`}
              sx={{ borderRadius: "1rem !important" }}
              elevation={0}
            >
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              className={`paperclass`}
              sx={{ borderRadius: "1rem !important" }}
              elevation={0}
            >
              <ReportingTeam />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};