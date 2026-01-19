import { Grid, Paper } from "@mui/material";
import React from "react";
import LeaveBalance from "./LeaveBalance";
import Holiday from "./Holiday";
import { makeStyles } from "@mui/styles";
import AttendanceSection from "./AttendanceSection";
import ProjectWork from "./ProjectWork";
import Okr from "./Okr";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius:"2rem !important",
  },
}));
export default function CardSection() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} height={'75vh'}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0} >
          
          <AttendanceSection />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
          <LeaveBalance />
          
          </Paper>
        </Grid>
        <Grid item xs={12} >
        <Paper className={classes.paper}  elevation={0}>
          <ProjectWork />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}   elevation={0}>
          <Holiday />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
          <Okr />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
