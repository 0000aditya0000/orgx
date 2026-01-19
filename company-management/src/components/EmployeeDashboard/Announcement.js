import React from "react";
import { Box, Card, Typography, Paper, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Badge from "@mui/material/Badge";
import AnnouncementIcon from "@mui/icons-material/Announcement";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "462px",
    borderRadius: "1rem !important",
    padding: 20,
  },
  indicator: {
    display: "none",
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: "red",
    },
  },
  box: {
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
  announcementHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  announcementCardContainer: {
    overflow: "auto",
    height: "370px",
    display: "flex",
    flexDirection: "column",
    gap: "10px !important",
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
  announcementCard: {
    padding: "10px !important",
    backgroundColor: "whitesmoke !important",
  },
}));
/* istanbul ignore next */
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

export default function Announcement() {
  const classes = useStyles();
  const announcementData = [
    {
      details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
    {
      details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
    {
      details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
    {
      details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
  ]
  return (
    <div>
      <Card className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box className={classes.announcementHeader}>
          <Typography variant="h6">Announcement</Typography>
          <Badge badgeContent={4} color="error">
            <IconButton>
              <AnnouncementIcon className="employee-dashboard-logo" />
            </IconButton>
          </Badge>
        </Box>
        <Box my={1} className={classes.announcementCardContainer}>
        {
          announcementData.map((data)=>(
            <Paper
            elevation={0}
            className={`employee-dashboard-paper ${classes.announcementCard}`}
            key={data.id}
          >
            <Typography>
              {data.details}
            </Typography>
          </Paper>
          ))
        }
        </Box>
      </Card>
    </div>
  );
}
