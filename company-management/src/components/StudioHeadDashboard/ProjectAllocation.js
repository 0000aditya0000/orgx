import React from "react";
import { Box, Card, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);
const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    borderRadius: "1rem !important",
    // width: "500px",
  },
  projectAllocationHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  doughnutChart: {
    width: 200,
    height: 200,
  },
}));
export default function ProjectAllocation() {
  const classes = useStyles();
  const navigate = useNavigate();
  const data = {
    labels: ["Project", "Bench"],
    datasets: [
      {
        label: "Allocated",
        data: [20, 5],
        backgroundColor: ["rgb(152,179,51)", "gray"],
        borderColor: ["rgb(152,179,51)", "gray"],
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
        `Aligned - ${data.datasets[0].data[0]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 20
      );
      ctx.fillText(
        `Bench - ${data.datasets[0].data[1]}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 40
      );
    },
  };
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.projectAllocationHeader}>
          <Typography variant="h5" fontWeight={'bold'}>Project Allocation</Typography>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={() =>
              navigate("/home/competency-dashboard/projectStatistics")
            }
          >
            Project Statistics
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box className={classes.doughnutChart} my={3}>
            <Doughnut
              data={data}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
