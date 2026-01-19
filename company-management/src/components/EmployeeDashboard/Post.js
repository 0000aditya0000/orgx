import React from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Badge,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Birthday from "./Birthday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationModal from "./NotificationModal";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "220px",
    borderRadius: "1rem !important",
    display: "flex",
    justifyContent: "center",
  },
  indicator: {
    display: "none",
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: "red !important",
    },
    padding: "4px",
    borderBottom: "1.5px solid red",
  },
  tabsStyle: {
    fontSize: "0.8rem !important",
    color: "gray !important",
  },
  field: {
    width: "100%",
    "& .MuiInputBase-root": {
      color: "grey",
    },
    "& .MuiFormLabel-root": {
      color: "grey",

      "&.Mui-focused ": {
        color: "red",
      },
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B2BAC2",
      },
      "&:hover fieldset": {
        borderColor: "#6F7E8C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },

    "&.MuiOutlinedInput-input": {
      color: "white",
    },
  },
  cancelButton: {
    backgroundColor: "grey !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "grey !important",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  badgeStyle: {
    marginTop: "10px",
    marginLeft: "2px",
  },
  postContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  postButtonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "flex-end",
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
        <Box sx={{ p: 2 }}>
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
export default function Post() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [notification, setNotification] = React.useState(4);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
            >
              <Tab
                label="Post"
                {...a11yProps(0)}
                className={classes.tabsStyle}
              />
              <Tab
                label="Announcement"
                {...a11yProps(1)}
                className={classes.tabsStyle}
              />
              <Tab
                label="Poll"
                {...a11yProps(2)}
                className={classes.tabsStyle}
              />
              <Tab
                label="Praise"
                {...a11yProps(3)}
                className={classes.tabsStyle}
              />
              <Tab
                label="Birthday"
                {...a11yProps(4)}
                className={classes.tabsStyle}
              />
              <Box className={classes.badgeStyle}>
                <Badge badgeContent={notification} color="error">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setOpenModal(true);
                      setNotification(0);
                    }}
                  >
                    <NotificationsIcon
                      fontSize="small"
                      className="employee-dashboard-logo"
                    />
                  </IconButton>
                </Badge>
              </Box>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box className={classes.postContainer}>
              <TextField
                multiline
                rows={2}
                sx={{ width: "100%" }}
                placeholder="Write your post here"
                className={classes.field}
              />
              <Box className={classes.postButtonContainer}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.cancelButton}
                >
                  Cancel{" "}
                </Button>
                <Button variant="contained" size="small" color="error">
                  Post{" "}
                </Button>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box className={classes.postContainer}>
              <TextField
                multiline
                rows={2}
                sx={{ width: "100%" }}
                placeholder="Title of the announcement"
                className={classes.field}
              />
              <Box className={classes.postButtonContainer}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.cancelButton}
                >
                  Cancel{" "}
                </Button>
                <Button variant="contained" size="small" color="error">
                  Post{" "}
                </Button>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Box className={classes.postContainer}>
              <TextField
                multiline
                rows={2}
                sx={{ width: "100%" }}
                placeholder="Title of the poll"
                className={classes.field}
              />
              <Box className={classes.postButtonContainer}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.cancelButton}
                >
                  Cancel{" "}
                </Button>
                <Button variant="contained" size="small" color="error">
                  Post{" "}
                </Button>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box className={classes.postContainer}>
              <TextField
                multiline
                rows={2}
                sx={{ width: "100%" }}
                placeholder="Give praise from here"
                className={classes.field}
              />
              <Box className={classes.postButtonContainer}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.cancelButton}
                >
                  Cancel{" "}
                </Button>
                <Button variant="contained" size="small" color="error">
                  Post{" "}
                </Button>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Birthday />
          </CustomTabPanel>
        </Box>
      </Card>
      {openModal && (
        <NotificationModal openModal={openModal} closeModal={handleClose} />
      )}
    </div>
  );
}
