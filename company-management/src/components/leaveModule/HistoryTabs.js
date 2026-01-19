import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import LeaveHistoryRecord from "./LeaveHistoryRecord";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "73vh",
    borderRadius: ".5rem !important",
  },
  indicator: {
    display: "none",
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: "red",
    },
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HistoryTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Card className={`${classes.card} tab2`} elevation={0}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="tab_header"
            classes={{ indicator: classes.indicator }}
            sx={{
              padding: "6px",
            }}
          >
            <Tab label="Leave History" {...a11yProps(0)} />
            <Tab label="Attendance History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LeaveHistoryRecord />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Comming Soon...
        </CustomTabPanel>
      </Card>
    </div>
  );
}
