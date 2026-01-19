import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  leaveCard: {
    display: "flex",
    flexDirection: "row",
    marginRight: "1rem",
    padding: "1rem",
    gap: "1rem",
    borderRadius: "0.5rem",
  },
  leaveTitle: { color: "#999999" },
  reasonBox: { wordWrap: "break-word" }
}));

export const LeaveStatus = (props) => {
  const classes = useStyles();
  const leaves = props.data;
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <>
      {leaves.length !== 0 ? (
        leaves.map((leave) => (
          <Paper
            className={`paperclass ${classes.leaveCard}`}
            elevation={0}
            key={leave.leaveId}
            
          >
            <BeachAccessIcon fontSize="large" color="warning" />
            <Box width={200}>
              <Typography className={classes.leaveTitle} variant="p">
                Start Date
              </Typography>
              <Typography className="p">
                {new Date(leave.startDate).toLocaleDateString("en-IN", options)}
              </Typography>
            </Box>
            <Box width={200}>
              <Typography className={classes.leaveTitle} variant="p">
                Leave Type
              </Typography>
              <Typography className="p">{leave.leaveType}</Typography>
            </Box>
            <Box className={classes.reasonBox} width={400}>
              <Typography className={classes.leaveTitle} variant="p">
                Reason
              </Typography>
              <Typography className="p">{leave.note}</Typography>
            </Box>
            <Box width={200}>
              <Typography className={classes.leaveTitle} variant="p">
                Status :{" "}
              </Typography>
              <Chip
                variant="outlined"
                label={`${leave.status}`}
                color={leave.status === "Approved" ? "success" : "warning"}
              />
            </Box>
          </Paper>
        ))
      ) : (
        <Paper
          className={`paperclass ${classes.leaveCard}`}
          elevation={0}
        >
          <LaptopMacIcon fontSize="Large" color="error" />
          <Typography variant="h4" fontWeight={500}>
            No Leave Requests ...
          </Typography>
        </Paper>
      )}
    </>
  );
};
