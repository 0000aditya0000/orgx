import React, { useState } from "react";
import { Box, Card, Button, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    height: "220px",
    borderRadius: "1rem !important",
  },
  holidayHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  holidayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  holidayDataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
}));

export default function Holiday() {
  const classes = useStyles();
  const [crousal, setCrousal] = useState(0);
  const data = [
    { title: "New Year's Day", date: "Mon, 01 January, 2024" },
    { title: "Republic Day", date: "Fri, 26 January, 2024" },
    { title: "Holi", date: "Mon, 25 March, 2024" },
    { title: "Good Friday", date: "Fri, 29 March, 2024" },
    { title: "Ramzan Id/Eid-ul-Fitar", date: "Thu, 11 April, 2024" },
    { title: "Independence Day", date: "Thu, 15 August, 2024" },
    { title: "Raksha Bandhan (Rakhi)", date: "Mon, 19 August, 2024" },
    { title: "Mahatma Gandhi Jayanti", date: "Wed, 02 October, 2024" },
    { title: "Dussehra", date: "Sat, 12 October, 2024" },
    { title: "Diwali", date: "Thu, 31 October, 2024" },
    { title: "Bhai Dooj", date: "Sun, 03 November, 2024" },
    { title: "Christmas", date: "Wed, 25 December, 2024" },
  ];
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.holidayHeader}>
          <Typography variant="h6">Holidays</Typography>
          <Button size="small" color="error">
            View All
          </Button>
        </Box>
        <Box className={classes.holidayContainer} my={4}>
          <Box width={"10%"}>
            {crousal > 0 && (
              <IconButton
                onClick={() => setCrousal(crousal - 1)}
                style={{ color: "black" }}
              >
                <ArrowBackIosIcon
                  fontSize="large"
                  className="employee-dashboard-logo"
                />
              </IconButton>
            )}
          </Box>
          <Box className={classes.holidayDataContainer}>
            <Typography variant="h4">{data[crousal].title}</Typography>
            <Typography fontSize={17}>{data[crousal].date}</Typography>
          </Box>
          <Box width={"15%"}>
            {crousal < 11 && (
              <IconButton
                onClick={() => setCrousal(crousal + 1)}
                style={{ color: "black" }}
              >
                <ArrowForwardIosIcon
                  fontSize="large"
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
