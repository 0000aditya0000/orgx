import { Paper, Typography, Box } from "@mui/material";
import React from "react";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { makeStyles } from "@mui/styles";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  leaveChartContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ".5rem",
    padding: "1rem",
  },
  leaveChartWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "75%",
    marginBottom: 20,
    marginTop: 20,
  },
  noData: { height: "11.9rem" },
}));

export const LeaveBalanceChart = (props) => {
  const classes = useStyles();
  const data = {
    labels: ["Consumed", "Available"],
    datasets: [
      {
        data: props.data,
        backgroundColor: props.color,
        borderColor: props.color,
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 50px sans-serif";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${data.datasets[0].data[1]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 30
      );
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `_____________`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.fillText(
        `Left`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 20
      );
      ctx.fillText(
        `Out of ${data.datasets[0].data[1] + data.datasets[0].data[0]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 40
      );
    },
  };
  return (
    <Paper
      className={`${classes.leaveChartContainer} paperclass`}
      elevation={0}
    >
      <Typography className="h5" variant="h5" fontWeight={500}>
        {props.label}
      </Typography>
      <Box className={classes.leaveChartWrapper}>
        {props.data.length === 0 ? (
          <Typography
            className={`h5 ${classes.noData}`}
            variant="h5"
            fontWeight={500}
          >
            No Data To Display
          </Typography>
        ) : (
          <Doughnut
            data={data}
            options={options}
            plugins={[textCenter]}
          ></Doughnut>
        )}
      </Box>
    </Paper>
  );
};
