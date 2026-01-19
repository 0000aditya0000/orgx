import React from "react";
import { Box, Card, Typography, Avatar, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CakeIcon from "@mui/icons-material/Cake";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "220px",
    width: "100%",
  },
  birthdayHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  birthdayContainer: {
    display: "flex !important",
    flexDirection: "row !important",
    justifyContent: "space-between",
    width: "100%",
  },
  birthdayDataContainer: {
    display: "flex !important",
    flexDirection: "row !important",
    gap: 5,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  birthdayAvatarContainer: {
    display: "flex !important",
    flexDirection: "column !important",
    alignItems: "center",
  },
}));
export default function Birthday() {
  const classes = useStyles();
  const [crousal, setCrousal] = React.useState(0);
  const data = [
    { title: "Aditya.." },
    { title: "Deepak.." },
    { title: "Devansh.." },
    { title: "Arjun.." },
    { title: "Siddharth.." },
    { title: "Aditya.." },
    { title: "Deepak.." },
    { title: "Devansh.." },
    { title: "Arjun.." },
    { title: "Siddharth.." },
  ];
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.birthdayHeader}>
          <CakeIcon className="employee-dashboard-logo" fontSize="small" />
          <Typography>Birthdays Today</Typography>
        </Box>
        <Box my={3} className={classes.birthdayContainer}>
          <Box width={"5%"}>
            {crousal > 0 && (
              <IconButton
                onClick={() => setCrousal(crousal - 4)}
                style={{ color: "black" }}
                size="small"
              >
                <ArrowBackIosIcon
                  fontSize="small"
                  className="employee-dashboard-logo"
                />
              </IconButton>
            )}
          </Box>
          <Box my={-2} className={classes.birthdayDataContainer}>
            <Box className={classes.birthdayAvatarContainer}>
              <Avatar />
              <Typography>{data[crousal].title}</Typography>
            </Box>
            {crousal + 1 <= 11 && (
              <Box className={classes.birthdayAvatarContainer}>
                <Avatar />
                <Typography>{data[crousal + 1].title}</Typography>
              </Box>
            )}
            {crousal + 2 <= 11 && (
              <Box className={classes.birthdayAvatarContainer}>
                <Avatar />
                <Typography>{data[crousal + 2].title}</Typography>
              </Box>
            )}
            {crousal + 3 <= 11 && (
              <Box className={classes.birthdayAvatarContainer}>
                <Avatar />
                <Typography>{data[crousal + 3].title}</Typography>
              </Box>
            )}
            {crousal + 4 <= 11 && (
              <Box className={classes.birthdayAvatarContainer}>
                <Avatar />
                <Typography>{data[crousal + 4].title}</Typography>
              </Box>
            )}
          </Box>
          <Box width={"5%"} my={-1}>
            {crousal < 20 && (
              <IconButton
                onClick={() => setCrousal(crousal + 4)}
                style={{ color: "black" }}
                size="small"
              >
                <ArrowForwardIosIcon
                  fontSize="small"
                  className="employee-dashboard-logo"
                />
              </IconButton>
            )}
          </Box>
        </Box>
      </Card>
    </div>
  );
}
