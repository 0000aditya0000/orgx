import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { LeaveControl } from "./LeaveControl";
import { LeaveBalanceChart } from "./LeaveBalanceChart";
import { LeaveStatus } from "./LeaveStatus";
import HistoryTabs from "./HistoryTabs";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  leaveRoot: { display: "flex", flexDirection: "column", marginTop: "0.5rem" },
  leaveDesc: {
    margin: "1rem 0 1rem 0 !important",
    fontWeight: "500 !important",
  },
}));

export const LeavePage = () => {
  const classes = useStyles();
  const leaves = [
    {
      empId: 1253,
      leaveId: "igvdghowdhcishjz",
      startDate: "2024-06-18T18:30:00.000Z",
      endDate: "2024-06-26T18:30:00.000Z",
      leaveType: "Earned Leave",
      note: "aksbhxa javsxjhkab kjabsvxkahsbxajks ikasvbxkjxhashxkj kuagsxjhaxkhasbb khagsvxgjvax",
      status: "Approved",
      leaveDays: 8.5,
    },
    {
      empId: 1253,
      leaveId: "igvdkjsgbcvyghauugiuh",
      startDate: "2024-09-12T18:30:00.000Z",
      endDate: "2024-09-12T18:30:00.000Z",
      leaveType: "Sick Leave",
      note: "aksbhxa javsxjhkab kjabsvxkahsbxajks ikasvbxkjxhashxkj kuagsxjhaxkhasbb khagsvxgjvax",
      status: "Pending",
      leaveDays: 1,
    },
  ];
  const leaveData = [
    {
      label: "Comp Offs",
      data: [0, 0],
      otherStats: [
        {
          label: "Annual Quota",
          value: 0,
        },
      ],
      color: ["rgb(235,134,134)", "gray"],
    },
    {
      label: "Earned Leaves",
      data: [25, 10],
      otherStats: [
        {
          label: "Accured So Far",
          value: 0,
        },
        {
          label: "Carryover",
          value: 0,
        },
        {
          label: "Annual Quota",
          value: 0,
        },
      ],
      color: ["rgb(235,134,134)", "gray"],
    },
    {
      label: "Sick Leaves",
      data: [2, 2.5],
      otherStats: [
        {
          label: "Accured So Far",
          value: 0,
        },
        {
          label: "Annual Quota",
          value: 0,
        },
      ],
      color: ["rgb(100,195,209)", "gray"],
    },
    {
      label: "Optional Leaves",
      data: [1, 2],
      otherStats: [
        {
          label: "Accured So Far",
          value: 0,
        },
      ],
      color: ["rgb(152,179,51)", "gray"],
    },
  ];

  return (
    <Box className={classes.leaveRoot}>
      <Typography className={classes.leaveDesc} variant="h5">
        Pending Leave requests
      </Typography>
      <Grid container>
        <Grid item xs={12} md={9}>
          <LeaveStatus data={leaves} />
        </Grid>
        <Grid item xs={12} md={3}>
          <LeaveControl />
        </Grid>
      </Grid>
      <Typography
        className={classes.leaveDesc}
        variant="h5"
        style={{ margin: "1rem 0 1rem 0" }}
      >
        Leave Balance
      </Typography>
      <Grid container gap={2}>
        {leaveData.map((chart, index) => (
          <Grid item xs={12} md={5} lg={5} xl={2.9} key={chart.toString()}>
            <LeaveBalanceChart
              label={chart.label}
              data={chart.data}
              color={chart.color}
              otherStats={chart.otherStats}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        className={classes.leaveDesc}
        variant="h5"
        style={{ margin: "1rem 0 1rem 0" }}
      >
        History
      </Typography>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <HistoryTabs />
        </Grid>
      </Grid>
    </Box>
  );
};
