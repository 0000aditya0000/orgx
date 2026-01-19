import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Typography, IconButton, InputBase, Select, ClickAwayListener, Popper, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// import DashTopCard from "../dashTopCard/DashTopCard";
import ProjectWiseAllocationChart from "../projectWiseAllocationChart/ProjectWiseAllocationChart";
import TotalVsOnProject from "../totalVsOnProject/TotalVsOnProject";
import EmployeesWorking from "../employeesWorking/EmployeesWorking";
import SkillDistribution from "../skillDistribution/SkillDistribution";
import SkillTrends from "../skillTrends/SkillTrends";
import EmployeesSkillsListing from "../employeesSkillsListing/EmployeesSkillsListing";
import EmployeesOnLeave from "../employeesOnLeave/EmployeesOnLeave";
import OKRCompletion from "../OKRCompletion/OKRCompletion";
import DoughnutChart from "../doughnutChart/DoughnutChart";
import Project from "../projectEmployement/projectEmployement";
import SearchIcon from "@material-ui/icons/Search";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HistoryIcon from "@material-ui/icons/History";
import ReceiptIcon from "@material-ui/icons/Receipt";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    marginLeft: "2%",
    width: "90%",
    marginTop: "1rem",
  },
  paper: {
    height: "100%",
    borderRadius: "1rem",
    marginBottom: ".5rem",
    boxShadow: "none !important",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "1rem",
    width: "100%",
    marginTop: "-1.2rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  title: {
    fontWeight: 700,
    letterSpacing: "-0.00833em",
    marginTop: "20px",
    fontSize: "1.75rem",
    lineHeight: "1.625",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  },
  search: {
    display: "flex",
    height: "2.5rem",
    borderRadius: "1rem",
  },
  header: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: "12px",
    alignItems: "baseline",
    flexWrap: "wrap",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "row",
    },
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  scrollableContent: {
    maxHeight: '350px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome, Safari, Opera
    }
  },
  hiddenScrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
}));
export default function CenteredGrid() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Navigation function
  const handleActionClick = (actionTitle) => {
    if (actionTitle.toLowerCase().includes('leave')) {
      navigate('/home/leave/');
    }
    // Close the search dropdown after navigation
    setSearchAnchorEl(null);
    setSearchValue("");
  };

  // Quick Actions data
  const quickActions = [
    { icon: <AccessTimeIcon />, title: "Web Clock-In", description: "Log work hours by clocking in." },
    { icon: <ExitToAppIcon />, title: "Web Clock-out", description: "Log work hours by clocking out." },
    { icon: <CalendarTodayIcon />, title: "Attendance", description: "View & manage attendance" },
    { icon: <EditIcon />, title: "Apply Leave", description: "Request for time-off." },
    { icon: <AttachMoneyIcon />, title: "Payslips", description: "View & download your payslips." },
    { icon: <TrendingUpIcon />, title: "Leaves", description: "View leave summary." },
    { icon: <HistoryIcon />, title: "Attendance Logs", description: "Access logs detailing your working hours." },
    { icon: <ReceiptIcon />, title: "Expenses", description: "Raise or manage your expense claims." }
  ];

  // Employee data
  const employees = [
    {
      id: "1977",
      name: "Aditya Gangwar",
      role: "Software Consultant | L1",
      department: "FrontEnd",
      email: "aditya.gangwar@nashtechglobal.com",
      phone: "9319410265",
      location: "Noida",
      avatar: "https://via.placeholder.com/40/4CAF50/FFFFFF?text=AG"
    },
    {
      id: "2112",
      name: "Aditya Kumar",
      role: "Technical Lead",
      department: "FrontEnd",
      email: "aditya.kumar@nashtechglobal.com",
      phone: "8700985371",
      location: "Noida",
      avatar: "https://via.placeholder.com/40/2196F3/FFFFFF?text=AK"
    },
    {
      id: "1850",
      name: "Aditya Kumar Singh",
      role: "Automation Consultant | L2",
      department: "Testing",
      email: "aditya.singh@nashtechglobal.com",
      phone: "8448563112",
      location: "Noida",
      avatar: "https://via.placeholder.com/40/FF9800/FFFFFF?text=AKS"
    },
    {
      id: "1234",
      name: "John Doe",
      role: "Senior Developer",
      department: "Backend",
      email: "john.doe@nashtechglobal.com",
      phone: "9876543210",
      location: "Delhi",
      avatar: "https://via.placeholder.com/40/9C27B0/FFFFFF?text=JD"
    },
    {
      id: "5678",
      name: "Jane Smith",
      role: "UI/UX Designer",
      department: "Design",
      email: "jane.smith@nashtechglobal.com",
      phone: "8765432109",
      location: "Mumbai",
      avatar: "https://via.placeholder.com/40/E91E63/FFFFFF?text=JS"
    },
    {
      id: "2345",
      name: "Michael Johnson",
      role: "DevOps Engineer",
      department: "Infrastructure",
      email: "michael.johnson@nashtechglobal.com",
      phone: "8765432109",
      location: "Bangalore",
      avatar: "https://via.placeholder.com/40/FF5722/FFFFFF?text=MJ"
    },
    {
      id: "3456",
      name: "Sarah Wilson",
      role: "Product Manager",
      department: "Product",
      email: "sarah.wilson@nashtechglobal.com",
      phone: "7654321098",
      location: "Hyderabad",
      avatar: "https://via.placeholder.com/40/607D8B/FFFFFF?text=SW"
    },
    {
      id: "4567",
      name: "David Brown",
      role: "Data Scientist",
      department: "Analytics",
      email: "david.brown@nashtechglobal.com",
      phone: "6543210987",
      location: "Pune",
      avatar: "https://via.placeholder.com/40/795548/FFFFFF?text=DB"
    },
    {
      id: "5679",
      name: "Lisa Anderson",
      role: "QA Engineer",
      department: "Testing",
      email: "lisa.anderson@nashtechglobal.com",
      phone: "5432109876",
      location: "Chennai",
      avatar: "https://via.placeholder.com/40/3F51B5/FFFFFF?text=LA"
    },
    {
      id: "6789",
      name: "Robert Taylor",
      role: "System Architect",
      department: "Architecture",
      email: "robert.taylor@nashtechglobal.com",
      phone: "4321098765",
      location: "Gurgaon",
      avatar: "https://via.placeholder.com/40/009688/FFFFFF?text=RT"
    },
    {
      id: "7890",
      name: "Emily Davis",
      role: "Business Analyst",
      department: "Business",
      email: "emily.davis@nashtechglobal.com",
      phone: "3210987654",
      location: "Kolkata",
      avatar: "https://via.placeholder.com/40/FFC107/FFFFFF?text=ED"
    },
    {
      id: "8901",
      name: "James Wilson",
      role: "Security Engineer",
      department: "Security",
      email: "james.wilson@nashtechglobal.com",
      phone: "2109876543",
      location: "Ahmedabad",
      avatar: "https://via.placeholder.com/40/8BC34A/FFFFFF?text=JW"
    }
  ];

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
    setSearchValue("");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Open dropdown when typing
    if (event.target.value.length > 0 && !searchAnchorEl) {
      setSearchAnchorEl(event.currentTarget.closest('.MuiPaper-root') || event.currentTarget);
    }
  };

  const handleSearchFocus = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  // Filter actions and employees based on search
  const filteredActions = quickActions.filter(action => 
    action.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    action.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchValue.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  const hasSearchResults = searchValue.length > 0 && (filteredActions.length > 0 || filteredEmployees.length > 0);
  const hasNoResults = searchValue.length > 0 && filteredActions.length === 0 && filteredEmployees.length === 0;
  const employeeCountData = [
    {
      title: "Total Employees",
      count: 352,
      change: 15,
    },
    {
      title: "Total Projects",
      count: 24,
      change: -10,
    },
    {
      title: "Employee On Bench",
      count: 27,
      change: 12,
    },
    {
      title: "Employee On Project",
      count: 12,
      change: 5,
    },
  ];
  const chartData = {
    1: [
      {
        bench: 90,
        project: 80,
      },
    ],
    2: [
      {
        bench: 50,
        project: 30,
      },
    ],
    3: [
      {
        bench: 50,
        project: 30,
      },
    ],
    4: [
      {
        bench: 50,
        project: 30,
      },
    ],
    2024: [
      {
        bench: 80,
        project: 10,
      },
    ],
    2023: [
      {
        bench: 5,
        project: 80,
      },
    ],
    2022: [
      {
        bench: 5,
        project: 60,
      },
    ],
  };
  const okrData = {
    1: [95, 85, 70, 60, 80, 90, 75, 85, 95, 100, 65, 80],
    2: [80, 70, 60, 50, 75, 85, 65, 75, 85, 90, 55, 70],
    3: [90, 80, 65, 55, 35, 85, 70, 80, 90, 95, 60, 75],
    4: [75, 65, 55, 45, 70, 80, 60, 70, 80, 85, 50, 75],
    2024: [90, 80, 65, 55, 75, 85, 70, 80, 90, 95, 60, 75],
    2023: [85, 75, 55, 45, 70, 80, 60, 70, 80, 85, 50, 65],
    2022: [80, 71, 51, 43, 72, 89, 69, 78, 56, 25, 89, 78],
  };
  const projectEmployeeData = {
    1: [
      {
        Project: 160,
        Bench: 100,
        competency: "Frontend",
      },
      {
        Project: 78,
        Bench: 80,
        competency: "Testing",
      },
      {
        Project: 106,
        Bench: 41,
        competency: "AI/ML",
      },
      {
        Project: 92,
        Bench: 73,
        competency: "Scala",
      },
      {
        Project: 92,
        Bench: 99,
        competency: "Java",
      },
      {
        Project: 200,
        Bench: 144,
        competency: "DevOps",
      },
      {
        Project: 105,
        Bench: 70,
        competency: ".Net",
      },
      {
        Project: 106,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 105,
        Bench: 70,
        competency: "NOC",
      },
      {
        Project: 106,
        Bench: 150,
        competency: "Project Managmnt",
      },
    ],
    2: [
      {
        Project: 155,
        Bench: 95,
        competency: "Frontend",
      },
      {
        Project: 70,
        Bench: 75,
        competency: "Testing",
      },
      {
        Project: 100,
        Bench: 35,
        competency: "AI/ML",
      },
      {
        Project: 85,
        Bench: 65,
        competency: "Scala",
      },
      {
        Project: 85,
        Bench: 45,
        competency: "Java",
      },
      {
        Project: 100,
        Bench: 120,
        competency: "DevOps",
      },
      {
        Project: 90,
        Bench: 50,
        competency: ".Net",
      },
      {
        Project: 90,
        Bench: 45,
        competency: "Kotlin",
      },
      {
        Project: 75,
        Bench: 78,
        competency: "NOC",
      },
      {
        Project: 103,
        Bench: 145,
        competency: "Project Managmnt",
      },
    ],
    3: [
      {
        Project: 145,
        Bench: 80,
        competency: "Frontend",
      },
      {
        Project: 75,
        Bench: 65,
        competency: "Testing",
      },
      {
        Project: 78,
        Bench: 34,
        competency: "AI/ML",
      },
      {
        Project: 85,
        Bench: 70,
        competency: "Scala",
      },
      {
        Project: 85,
        Bench: 50,
        competency: "Java",
      },
      {
        Project: 150,
        Bench: 120,
        competency: "DevOps",
      },
      {
        Project: 95,
        Bench: 75,
        competency: ".Net",
      },
      {
        Project: 106,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 90,
        Bench: 56,
        competency: "NOC",
      },
      {
        Project: 90,
        Bench: 100,
        competency: "Project Managmnt",
      },
    ],
    4: [
      {
        Project: 160,
        Bench: 100,
        competency: "Frontend",
      },
      {
        Project: 78,
        Bench: 80,
        competency: "Testing",
      },
      {
        Project: 106,
        Bench: 41,
        competency: "AI/ML",
      },
      {
        Project: 92,
        Bench: 73,
        competency: "Scala",
      },
      {
        Project: 92,
        Bench: 99,
        competency: "Java",
      },
      {
        Project: 200,
        Bench: 144,
        competency: "DevOps",
      },
      {
        Project: 105,
        Bench: 70,
        competency: ".Net",
      },
      {
        Project: 106,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 105,
        Bench: 70,
        competency: "NOC",
      },
      {
        Project: 106,
        Bench: 150,
        competency: "Project Managmnt",
      },
    ],
    2024: [
      {
        Project: 140,
        Bench: 120,
        competency: "Frontend",
      },
      {
        Project: 73,
        Bench: 75,
        competency: "Testing",
      },
      {
        Project: 106,
        Bench: 41,
        competency: "AI/ML",
      },
      {
        Project: 76,
        Bench: 67,
        competency: "Scala",
      },
      {
        Project: 90,
        Bench: 93,
        competency: "Java",
      },
      {
        Project: 56,
        Bench: 13,
        competency: "DevOps",
      },
      {
        Project: 85,
        Bench: 78,
        competency: ".Net",
      },
      {
        Project: 90,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 105,
        Bench: 70,
        competency: "NOC",
      },
      {
        Project: 106,
        Bench: 150,
        competency: "Project Managmnt",
      },
    ],
    2023: [
      {
        Project: 160,
        Bench: 100,
        competency: "Frontend",
      },
      {
        Project: 78,
        Bench: 80,
        competency: "Testing",
      },
      {
        Project: 106,
        Bench: 41,
        competency: "AI/ML",
      },
      {
        Project: 92,
        Bench: 73,
        competency: "Scala",
      },
      {
        Project: 92,
        Bench: 99,
        competency: "Java",
      },
      {
        Project: 200,
        Bench: 144,
        competency: "DevOps",
      },
      {
        Project: 105,
        Bench: 70,
        competency: ".Net",
      },
      {
        Project: 106,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 105,
        Bench: 70,
        competency: "NOC",
      },
      {
        Project: 106,
        Bench: 150,
        competency: "Project Managmnt",
      },
    ],
    2022: [
      {
        Project: 160,
        Bench: 100,
        competency: "Frontend",
      },
      {
        Project: 78,
        Bench: 80,
        competency: "Testing",
      },
      {
        Project: 106,
        Bench: 41,
        competency: "AI/ML",
      },
      {
        Project: 92,
        Bench: 73,
        competency: "Scala",
      },
      {
        Project: 92,
        Bench: 99,
        competency: "Java",
      },
      {
        Project: 200,
        Bench: 144,
        competency: "DevOps",
      },
      {
        Project: 105,
        Bench: 70,
        competency: ".Net",
      },
      {
        Project: 106,
        Bench: 50,
        competency: "Kotlin",
      },
      {
        Project: 105,
        Bench: 70,
        competency: "NOC",
      },
      {
        Project: 106,
        Bench: 150,
        competency: "Project Managmnt",
      },
    ],
  };
  const [year, setYear] = React.useState(2024);
  const [quarter, setQuarter] = React.useState(1);
  const [selectQuarter, setSelectQuarter] = React.useState(0);
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());
  
  const handleYearChange = (event) => {
    setYear(event.target.value);
    setSelectQuarter(0);
  };
  const handleQuarterChange = (event) => {
    setQuarter(event.target.value);
    setSelectQuarter(1);
  };
  
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    // If end date is before new start date, update end date to start date
    if (endDate && newDate && endDate.isBefore(newDate, 'day')) {
      setEndDate(newDate);
    }
  };
  
  const handleEndDateChange = (newDate) => {
    // Prevent selecting end date before start date
    if (newDate && startDate && newDate.isBefore(startDate, 'day')) {
      return; // Don't update if end date is before start date
    }
    setEndDate(newDate);
  };
  const doughnutChartData =
    selectQuarter === 0 ? chartData[year] : chartData[quarter];
  const okrChartData = selectQuarter === 0 ? okrData[year] : okrData[quarter];
  const projectChartData =
    selectQuarter === 0
      ? projectEmployeeData[year]
      : projectEmployeeData[quarter];

  // Helper function to convert quarter number to Q format
  const getQuarterString = (quarterNum) => {
    return `Q${quarterNum}`;
  };

  // Debug logging
  console.log('Dashboard filter values:', { year, quarter, quarterString: getQuarterString(quarter) });
  return (
    <div className={classes.root}>
      <Box className={classes.heading} sx={{}}>
        <Box width={"30%"}>
          <Typography className={classes.title} sx={{}}>
            Dashboard
          </Typography>
        </Box>
        
        {/* Right-aligned Search Bar - COMMENTED OUT FOR NOW */}
        {/* <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ flex: 1, paddingRight: "20px" }}>
          <div style={{ marginTop: "1.3rem" }}>
            <Paper
              className={classes.search}
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: searchAnchorEl ? 600 : 400,
                borderRadius: '4px',
                transition: 'width 0.4s ease-in-out'
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search any action, employee or competency"
                inputProps={{ "aria-label": "Search" }}
                style={{ paddingLeft: "1rem" }}
                onClick={handleSearchClick}
                onFocus={handleSearchFocus}
                value={searchValue}
                onChange={handleSearchChange}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          
          <Popper
            open={Boolean(searchAnchorEl)}
            anchorEl={searchAnchorEl}
            placement="bottom"
            style={{ 
              zIndex: 1300, 
              width: searchAnchorEl ? '600px' : '400px',
              transform: 'translateX(-50%)',
              left: '50%'
            }}
          >
            <ClickAwayListener onClickAway={handleSearchClose}>
              <Paper
                elevation={8}
                style={{
                  borderRadius: '8px',
                  marginTop: '8px',
                  width: '100%',
                  maxHeight: '400px',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  p={2}
                  className={`${classes.scrollableContent} ${classes.hiddenScrollbar}`}
                >
                  {hasNoResults ? (
                    <>
                      <Box 
                        display="flex" 
                        justifyContent="flex-end" 
                        alignItems="center" 
                        mb={2}
                      >
                        <IconButton size="small" onClick={handleSearchClose}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100px' }}>
                        <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                          No results found
                        </Typography>
                      </Box>
                    </>
                  ) : hasSearchResults ? (
                    <>
                      <Box 
                        display="flex" 
                        justifyContent="flex-end" 
                        alignItems="center" 
                        mb={2}
                      >
                        <IconButton size="small" onClick={handleSearchClose}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {filteredActions.length > 0 && (
                        <>
                          <Typography 
                            variant="h6" 
                            style={{ 
                              marginBottom: '12px', 
                              fontSize: '16px',
                              background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '4px',
                              textAlign: 'center'
                            }}
                          >
                            Quick Actions
                          </Typography>
                          <List>
                            {filteredActions.map((action, index) => (
                              <ListItem
                                key={index}
                                button
                                style={{
                                  borderRadius: '4px',
                                  marginBottom: '4px',
                                  padding: '12px'
                                }}
                                onClick={() => handleActionClick(action.title)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)';
                                  e.currentTarget.style.color = 'white';
                                  
                                  const allElements = e.currentTarget.querySelectorAll('*');
                                  allElements.forEach(el => {
                                    if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV') {
                                      el.style.color = 'white';
                                    }
                                    if (el.classList.contains('MuiTypography-root')) {
                                      el.style.color = 'white';
                                    }
                                    if (el.tagName === 'SVG' || el.classList.contains('MuiSvgIcon-root')) {
                                      el.style.color = 'white';
                                    }
                                  });
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'inherit';
                                  
                                  const allElements = e.currentTarget.querySelectorAll('*');
                                  allElements.forEach(el => {
                                    if (el.style) {
                                      el.style.color = '';
                                    }
                                  });
                                }}
                              >
                                <ListItemIcon style={{ minWidth: '40px' }}>
                                  {action.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={action.title}
                                  secondary={action.description}
                                  primaryTypographyProps={{ style: { fontSize: '14px' } }}
                                  secondaryTypographyProps={{ style: { fontSize: '12px' } }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}

                      {filteredEmployees.length > 0 && (
                        <>
                          <Typography 
                            variant="h6" 
                            style={{ 
                              marginBottom: '12px', 
                              fontSize: '16px',
                              background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '4px',
                              textAlign: 'center'
                            }}
                          >
                            Employees
                          </Typography>
                          <List>
                            {filteredEmployees.map((employee, index) => (
                              <ListItem
                                key={index}
                                button
                                style={{
                                  borderRadius: '4px',
                                  marginBottom: '8px',
                                  padding: '16px',
                                  display: 'flex',
                                  alignItems: 'flex-start'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)';
                                  e.currentTarget.style.color = 'white';
                                  
                                  const allElements = e.currentTarget.querySelectorAll('*');
                                  allElements.forEach(el => {
                                    if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV') {
                                      el.style.color = 'white';
                                    }
                                    if (el.classList.contains('MuiTypography-root')) {
                                      el.style.color = 'white';
                                    }
                                    if (el.tagName === 'SVG' || el.classList.contains('MuiSvgIcon-root')) {
                                      el.style.color = 'white';
                                    }
                                  });
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'inherit';
                                  
                                  const allElements = e.currentTarget.querySelectorAll('*');
                                  allElements.forEach(el => {
                                    if (el.style) {
                                      el.style.color = '';
                                    }
                                  });
                                }}
                              >
                                <Avatar 
                                  src={employee.avatar} 
                                  style={{ marginRight: '12px', width: '40px', height: '40px' }}
                                />
                                <Box style={{ flex: 1 }}>
                                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                    {employee.name}
                                  </Typography>
                                  <Typography variant="body2" style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>
                                    {employee.role}
                                  </Typography>
                                  <Typography variant="body2" style={{ color: '#ff9800', fontSize: '12px', fontWeight: 'bold' }}>
                                    #{employee.id}
                                  </Typography>
                                  <Box style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <PersonIcon style={{ fontSize: '14px', color: '#666' }} />
                                      <Typography variant="body2" style={{ fontSize: '12px' }}>
                                        {employee.department}
                                      </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <EmailIcon style={{ fontSize: '14px', color: '#666' }} />
                                      <Typography variant="body2" style={{ fontSize: '12px' }}>
                                        {employee.email}
                                      </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <PhoneIcon style={{ fontSize: '14px', color: '#666' }} />
                                      <Typography variant="body2" style={{ fontSize: '12px' }}>
                                        {employee.phone}
                                      </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <LocationOnIcon style={{ fontSize: '14px', color: '#666' }} />
                                      <Typography variant="body2" style={{ fontSize: '12px' }}>
                                        {employee.location}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography 
                        variant="h6" 
                        style={{ 
                          marginBottom: '16px',
                          background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          textAlign: 'center'
                        }}
                      >
                        Quick Actions
                      </Typography>
                      <List>
                        {quickActions.map((action, index) => (
                          <ListItem
                            key={index}
                            button
                            style={{
                              borderRadius: '4px',
                              marginBottom: '4px',
                              padding: '12px'
                            }}
                            onClick={() => handleActionClick(action.title)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)';
                              e.currentTarget.style.color = 'white';
                              
                              const allElements = e.currentTarget.querySelectorAll('*');
                              allElements.forEach(el => {
                                if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV') {
                                  el.style.color = 'white';
                                }
                                if (el.classList.contains('MuiTypography-root')) {
                                  el.style.color = 'white';
                                }
                                if (el.tagName === 'SVG' || el.classList.contains('MuiSvgIcon-root')) {
                                  el.style.color = 'white';
                                }
                              });
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'inherit';
                              
                              const allElements = e.currentTarget.querySelectorAll('*');
                              allElements.forEach(el => {
                                if (el.style) {
                                  el.style.color = '';
                                }
                              });
                            }}
                          >
                            <ListItemIcon style={{ minWidth: '40px' }}>
                              {action.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={action.title}
                              secondary={action.description}
                              primaryTypographyProps={{ style: { fontSize: '14px' } }}
                              secondaryTypographyProps={{ style: { fontSize: '12px' } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                  <Divider style={{ margin: '16px 0' }} />
                  <Box display="flex" justifyContent="space-between" alignItems="center" style={{ fontSize: '12px' }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <KeyboardArrowUpIcon style={{ fontSize: '16px' }} />
                      <KeyboardArrowDownIcon style={{ fontSize: '16px' }} />
                      <span>Navigate</span>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <span>To select</span>
                      <span style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        fontSize: '10px'
                      }}>
                        ↵
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Box> */}
        
        <Box className={classes.header} my={-0.5}>
          <Box className={classes.filterContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ justifySelf: "center" }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        boxShadow: "none",
                        width: "150px",
                        "& .MuiOutlinedInput-root": {
                          height: "30px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ justifySelf: "center" }}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        boxShadow: "none",
                        width: "150px",
                        "& .MuiOutlinedInput-root": {
                          height: "30px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Box>
          
        </Box>
      </Box>

      <Grid
        container
        spacing={1}
        style={{
          height: "300px",
          marginBottom: "1rem",
          marginTop: "0.5rem",
        }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} style={{ display: "flex" }}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "280px", width: "100%" }}>
            <ProjectWiseAllocationChart year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} style={{ display: "flex" }}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "280px", width: "100%" }}>
            <TotalVsOnProject year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} style={{ display: "flex" }}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "280px", width: "100%" }}>
            <EmployeesWorking key={`employees-working-${year}-${quarter}`} year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
      </Grid>
      {/* Row 2: Skill Distribution and Skill Trends */}
      <Grid
        container
        spacing={2}
        style={{
          height: "380px",
          marginBottom: "1rem",
        }}
      >
        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "360px" }}>
            <SkillDistribution key={`skill-distribution-${year}-${quarter}`} year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={9}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "360px" }}>
            <SkillTrends key={`skill-trends-${year}-${quarter}`} year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
      </Grid>

      {/* Row 3: React Skills and Employees on Leave */}
      <Grid
        container
        spacing={2}
        style={{
          height: "380px",
          marginBottom: "1rem",
        }}
      >
        <Grid item xs={12} sm={6} md={5} lg={5}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "360px" }}>
            <EmployeesSkillsListing key={`employees-skills-${year}-${quarter}`} year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={7}>
          <Paper className={`${classes.paper} paperclass`} elevation={0} style={{ height: "360px" }}>
            <EmployeesOnLeave key={`employees-on-leave-${year}-${quarter}`} year={year} quarter={getQuarterString(quarter)} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
