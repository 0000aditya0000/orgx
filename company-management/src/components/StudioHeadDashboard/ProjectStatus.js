import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const useStyles = makeStyles((theme) => ({
  doughnutChart: {
    width: 250,
    height: 250,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "500",
  },
}));
export default function ProjectStatus() {
  const classes = useStyles();
  const data = {
    labels: ["Completed", "In progress"],
    datasets: [
      {
        label: "Allocated",
        data: [20, 5],
        backgroundColor: ["rgb(100,195,209)", "gray"],
        borderColor: ["rgb(100,195,209)", "gray"],
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
        `${data.datasets[0].data[0] + data.datasets[0].data[1]}`,
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
        `Completed - ${data.datasets[0].data[0]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 20
      );
      ctx.fillText(
        `In progress - ${data.datasets[0].data[1]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 40
      );
    },
  };
  return (
    <div>
      <Box>
        <Typography variant="h5" className={classes.header}>
          Project Status
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }} my={2}>
          <Box className={classes.doughnutChart}>
            <Doughnut
              data={data}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
