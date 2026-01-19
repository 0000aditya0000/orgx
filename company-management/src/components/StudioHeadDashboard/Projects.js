import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "310px",
    borderRadius: "1rem !important",
  },
  projectWorkHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  projectWorkBox: {
    overflow: "auto",
    height: "220px",
    padding: "10px",
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
  projectCard: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    padding: "10px",
  },
  projectTimePeriod: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
export default function Projects() {
  const classes = useStyles();
  const navigate = useNavigate();
  const projectWorkData = [
    {
      projectTitle: "Project 1",
      projectStartOn: "Feb 2024",
      projectEndOn: "On going",
      projectStatus: "In Progress",
    },
    {
      projectTitle: "Project 2",
      projectStartOn: "Nov 2023",
      projectEndOn: "Dec 2023",
      projectStatus: "Completed",
    },
    {
      projectTitle: "Project 3",
      projectStartOn: "Sept 2023",
      projectEndOn: "Oct 2023",
      projectStatus: "Completed",
    },
    {
      projectTitle: "Project 4",
      projectStartOn: "Aug 2023",
      projectEndOn: "Sept 2023",
      projectStatus: "Completed",
    },
  ];
  return (
    <div>
      <Box className={`${classes.card} employee-dashboard-card`}>
        <Box className={classes.projectWorkHeader}>
          <Typography variant="h5" fontWeight={"500"}>
            Project Work
          </Typography>
        </Box>
        <Box my={0.5} className={classes.projectWorkBox}>
          {projectWorkData.map((data) => (
            <Box key={data.id}>
              <Box className={classes.projectCard}>
                <Typography sx={{ alignSelf: "center" }}>
                  {data.projectTitle}
                </Typography>
                <Box className={classes.projectTimePeriod}>
                  <Box className={classes.timeContainer}>
                    <Typography>Started on</Typography>
                    <Typography>{data.projectStartOn}</Typography>
                  </Box>
                  <Typography>-</Typography>
                  <Box className={classes.timeContainer}>
                    <Typography>Ended on</Typography>
                    <Typography>{data.projectEndOn}</Typography>
                  </Box>
                </Box>
                <Typography
                  color={
                    data.projectStatus === "In Progress" ? "primary" : "#66bb6a"
                  }
                  sx={{ justifySelf: "end", alignSelf: "center" }}
                >
                  {data.projectStatus}
                </Typography>
                <IconButton
                  sx={{ justifySelf: "end" }}
                  onClick={() =>
                    navigate(
                      "/home/competency-dashboard/projectStatistics/projects/1"
                    )
                  }
                >
                  <OpenInNewIcon className="employee-dashboard-logo" />
                </IconButton>
              </Box>
              <Divider className="employee-dashboard-divider" />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
