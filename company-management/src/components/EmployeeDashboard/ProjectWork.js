import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    height: "220px",
    borderRadius: "1rem !important",
  },
  projectWorkHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  projectWorkBox: {
    overflow: "auto",
    height: "130px",
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
    gridTemplateColumns: "repeat(3,1fr)",
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
export default function ProjectWork() {
  const classes = useStyles();
  const projectWorkData = [
    {
      projectTitle:"Project 1",
      projectStartOn:"Feb 2024",
      projectEndOn:"On going",
      projectStatus:"In Progress",
    },
    {
      projectTitle:"Project 2",
      projectStartOn:"Nov 2023",
      projectEndOn:"Dec 2023",
      projectStatus:"Completed",
    },
    {
      projectTitle:"Project 3",
      projectStartOn:"Sept 2023",
      projectEndOn:"Oct 2023",
      projectStatus:"Completed",
    },
    {
      projectTitle:"Project 4",
      projectStartOn:"Aug 2023",
      projectEndOn:"Sept 2023",
      projectStatus:"Completed",
    },
  ]
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.projectWorkHeader}>
          <Typography variant="h6">Project Work</Typography>
          <Button size="small" color="error">
            Advance
          </Button>
        </Box>
        <Box my={0.5} className={classes.projectWorkBox}>
        {
          projectWorkData.map((data)=>(
            <Box  key={data.id}>
            <Box className={classes.projectCard}>
            <Typography>{data.projectTitle}</Typography>
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
            <Typography color={data.projectStatus==="In Progress"?"primary":"#66bb6a"} sx={{ justifySelf: "end" }}>
              {data.projectStatus}
            </Typography>
            </Box>
             <Divider className="employee-dashboard-divider" />
          </Box>
          ))
        }
        </Box>
      </Card>
    </div>
  );
}
