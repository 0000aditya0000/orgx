import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Box } from "@mui/material";
import ProjectStatus from "./ProjectStatus";
import BillablePositionChart from "./BillablePositionChart";
import Projects from "./Projects";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "red",
    borderRadius: "5px !important",
    padding: 10,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  },
}));
export default function ProjectStatistics() {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.layout} my={3}>
        <Box>
          <Card
            className={`${classes.card} employee-dashboard-card`}
            elevation={0}
          >
            <BillablePositionChart />
          </Card>
        </Box>
        <Box className={classes.container1}>
          <Box width={"30%"}>
            <Card
              className={`${classes.card} employee-dashboard-card`}
              sx={{ height: "330px !important" }}
              elevation={0}
            >
              <ProjectStatus />
            </Card>
          </Box>
          <Box width={"70%"}>
            <Card
              className={`${classes.card} employee-dashboard-card`}
              elevation={0}
            >
              <Projects />
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
