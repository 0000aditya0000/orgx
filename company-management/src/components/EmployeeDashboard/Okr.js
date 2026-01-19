import React from "react";
import { Box, Card,Button,Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BarChart } from "@mui/x-charts/BarChart";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    height: "220px",
    borderRadius:"1rem !important",
  },
  birthdayHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
export default function Okr() {
  const classes = useStyles();
  const data = [100, 20, 30, 40, 50, 60, 70, 80, 100, 100, 50, 70];
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.birthdayHeader}>
          <Typography variant="h6">OKR Progress</Typography>
          <Button size="small" variant="text" color="error">
            Advance
          </Button>
        </Box>
        <Box sx={{width:"100%"}} my={-2} mx={-2}>
        <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: xLabels,
                categoryGapRatio: 0.6,
                barGapRatio: 0.6,
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
            series={[{ data: data, stack: "Data", color: "purple" }]}
            width={450}
            height={200}
            slotProps={{
              axisLine: { display: "none" },
              axisTick: { display: "none" },
              bar: {
                rx: 10,
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
