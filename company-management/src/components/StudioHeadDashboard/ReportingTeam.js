import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TeamsCard from "./TeamsCard";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardsContainer: {
    width: "100%",
    height: "24rem",
    overflowY: "auto",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};
function ReportingTeam() {
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const teamData = [
    {
      name: "Devansh Shukla",
      designation: "Software Consultant",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
    },
    {
      name: "Divyanshu Sharma",
      designation: "Intern",
      avatar: "https://mui.com/static/images/avatar/4.jpg",
    },
    {
      name: "Deepak Srivastava",
      designation: "Software Consultant",
      avatar: "https://mui.com/static/images/avatar/5.jpg",
    },
    {
      name: "Arjun Pandit",
      designation: "Software Consultant",
      avatar: "https://mui.com/static/images/avatar/2.jpg",
    },
    {
      name: "Deepanshi Mirg",
      designation: "Software Consultant",
      avatar: "https://mui.com/static/images/avatar/7.jpg",
    },
    {
      name: "Devansh Shukla",
      designation: "Software Consultant",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
    },
  ];
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          marginBottom: "18px",
          gap: "18px",
          padding: "16px",
          borderRadius: "inherit"
        }}
        className="okr"
      >
        <Box>
          <Box className={classes.container}>
            <Typography className="title" variant="h5">
              Reporting Team (15)
            </Typography>
          </Box>
          <Divider
            className="employee-devider"
            sx={{
              marginBottom: "1rem",
              // marginTop: "1rem",
            }}
          />
          <Box className={classes.cardsContainer}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {teamData.map((value) => (
                <Grid item xs={12}>
                  <TeamsCard
                    name={value.name}
                    designation={value.designation}
                    avatar={value.avatar}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default ReportingTeam;
