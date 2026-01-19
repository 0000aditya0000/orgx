import React, { useState } from "react";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { makeStyles } from "@mui/styles";
import { Card, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LeaveModal } from "../leaveModule/LeaveModal";
ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  card: {
    height: "220px",
    padding: 10,
    borderRadius: "1rem !important",
  },
  leaveContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  leaveHeader: {
    display: "flex",
    justifyContent: "space-around",
  },
  leaveButton: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
    alignItems: "baseline",
  },
  leaveChartContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "25%",
    height: "20%",
  },
  button: {
    fontSize: "0.7rem",
    width: "50%",
  },
}));

export default function LeaveBalance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const data = {
    labels: ["Consumed", "Available"],
    datasets: [
      {
        label: "Optional Leave",
        data: [3, 2],
        backgroundColor: ["rgb(200, 223, 120)", "rgb(152,179,51)"],
        borderColor: ["rgb(200, 223, 120)", "rgb(152,179,51)"],
        cutout: "80%",
      },
    ],
  };
  const data1 = {
    labels: ["Consumed", "Available"],
    datasets: [
      {
        label: "Earned Leave",
        data: [4.5, 0.5],
        backgroundColor: ["rgb(247,207,207)", "rgb(235,134,134)"],
        borderColor: ["rgb(247,207,207)", "rgb(235,134,134)"],
        cutout: "80%",
      },
    ],
  };
  const data2 = {
    labels: ["Consumed", "Available"],
    datasets: [
      {
        label: "Sick Leave",
        data: [4, 1],
        backgroundColor: ["rgb(202,234,242)", "rgb(100,195,209)"],
        borderColor: ["rgb(202,234,242)", "rgb(100,195,209)"],
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
      ctx.font = "normal 10px sans-serif";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${data.datasets[0].data[1]} Days`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 10
      );
      ctx.fillText(
        `Available`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 15
      );
    },
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.leaveHeader}>
          <Typography variant="h6">Leave Balance</Typography>
          <Box className={classes.leaveButton}>
            <Button
              size="small"
              color="error"
              variant="text"
              className={classes.button}
              onClick={handleModalOpen}
            >
              Request Leave
            </Button>
            <LeaveModal open={modalOpen} onClose={handleModalClose} />
            <Button
              size="small"
              color="error"
              variant="text"
              className={classes.button}
              onClick={()=>{navigate('/home/leave')}}
            >
              View All Balances
            </Button>
          </Box>
        </Box>
        <Box className={classes.leaveContainer} my={2}>
          <Box className={classes.leaveChartContainer}>
            <Doughnut
              data={data}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
            <Typography fontSize={"0.8rem"}>Optional Leave</Typography>
          </Box>
          <Box className={classes.leaveChartContainer}>
            <Doughnut
              data={data1}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
            <Typography fontSize={"0.8rem"}>Earned Leave</Typography>
          </Box>
          <Box className={classes.leaveChartContainer}>
            <Doughnut
              data={data2}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
            <Typography fontSize={"0.8rem"}>Sick Leave</Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
