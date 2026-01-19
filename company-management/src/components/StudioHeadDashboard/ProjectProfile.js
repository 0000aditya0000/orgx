import React from "react";
import { makeStyles } from "@mui/styles";
import BillablePositionChart from "./BillablePositionChart";
import { Box, Card, Typography, Button } from "@mui/material";
import Contributors from "./Contributors";
import Progress from "./Progress";
import TechnologyList from "./TechnologyList";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    backgroundColor: "red",
    borderRadius: "5px !important",
    padding: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
}));
export default function ProjectProfile() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <Box className={classes.layout} my={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className="employee-dashboard-logo" variant="h5">
            Project Name
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
        <Box>
          <Card
            className={`${classes.card} employee-dashboard-card`}
            elevation={0}
          >
            <BillablePositionChart />
          </Card>
        </Box>
        <Box className={classes.container}>
          <Box width={"33%"}>
            <Card
              className={`${classes.card} employee-dashboard-card`}
              elevation={0}
            >
              <Contributors />
            </Card>
          </Box>
          <Box width={"33%"}>
            <Card
              className={`${classes.card} employee-dashboard-card`}
              elevation={0}
            >
              <Progress />
            </Card>
          </Box>
          <Box width={"33%"}>
            <Card
              className={`${classes.card} employee-dashboard-card`}
              elevation={0}
            >
              <TechnologyList />
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
