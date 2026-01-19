/* istanbul ignore file */
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CompanySummary from '../company_profile_summary/CompanySummary';
import CompanyTimeline from '../company_profile_timeline/CompanyTimeline';
import { makeStyles } from "@material-ui/core";
import CompanyStatistics from '../company_statistics/CompanyStatistics';

const useStyles = makeStyles((theme) => ({
  
  indicator: {
    display: "none",
  },
  tabs: {
    "& button[aria-selected='true']": {
      borderBottom: "none !important",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ width: "100%", display: value === index ? "block" : "none", overflow: "visible" }}
      {...other}
    >
      {value === index && (
        <Box className='tab_panel' sx={{ p: 3, width: "100%", overflow: "visible" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function CompanyProfile() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box className='tab' sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box className='tab_header' sx={{ borderBottom: 3, borderColor: 'divider' }}>
        <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="basic tabs example" classes={{indicator: classes.indicator}}>
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Timeline" {...a11yProps(1)} />
          <Tab label="Statistics" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ flex: 1, width: "100%" }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CompanySummary />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CompanyTimeline />
        </TabPanel>
        {/* istanbul ignore next */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* istanbul ignore next */}
          <CompanyStatistics />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
