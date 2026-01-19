import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px",
  },
  box2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  contributorsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    height: "310px",
  },
  container: {
    height: "260px",
    overflow: "auto",
    "&::-webkit-scrollbar ": {
      width: "10px",
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "20px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "gray",
      borderRadius: "20px",
    },

    "&::-webkit-scrollbar-thumb:hover ": {
      background: "#555",
    },
  },
}));

const data = [
  {
    employeeName: "Rahul Kumar",
    designation: "Software Consultant | L1",
  },
  {
    employeeName: "Deepak Srivastava",
    designation: "Software Consultant | L1",
  },
  {
    employeeName: "Aditya Kumar",
    designation: "Software Consultant | L2",
  },
  {
    employeeName: "Arjun",
    designation: "Software Consultant | L1",
  },
  {
    employeeName: "Tejaswa Dayal",
    designation: "Software Consultant | L2",
  },
];

export default function Contributors() {
  const classes = useStyles();
  return (
    <div>
      <Box width={"100%"} className={classes.contributorsContainer}>
        <Box>
          <Typography variant="h5" fontWeight={"500"}>
            Contributions
          </Typography>
        </Box>
        <Box className={classes.container}>
          {data.map((item) => (
            <Box key={item.id}>
              <Box className={classes.box}>
                <Box className={classes.box2}>
                  <Avatar />
                  <Box>
                    <Typography variant="h6">{item.employeeName}</Typography>
                    <Typography fontSize={15}>{item.designation}</Typography>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: "baseline" }}>
                  <IconButton>
                    <OpenInNewIcon className="employee-dashboard-logo" />
                  </IconButton>
                </Box>
              </Box>
              <Divider className="employee-dashboard-divider" />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
