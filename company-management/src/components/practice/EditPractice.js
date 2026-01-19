import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import PracticeCompetency from "./PracticeCompetency";
import PracticeSummary from "./PracticeSummary";
import { useState } from "react";
import { Card, Avatar, Input, Button, Grid, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PraticeModal from "./practiceModal";
import { useGetPracticeByIdQuery } from "../../features/practiceApiSlice";
const useStyles = makeStyles((theme) => ({
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

  profilecontainer: {
    width: "98%",
    borderRadius: "1rem",
  },
  profiletabcontainer: {
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    height: "4rem",
    padding: "0.5rem",
  },
  modal: {
    position: "absolute",
    top: "54%",
    left: "53%",
    transform: "translate(-50%, -50%)",
    width: 800,
    boxShadow: 24,
    borderRadius: "1rem",
    p: 4,
  },
  modalbutton: {
    float: "right",
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  },
  modaluppercontent: {
    display: "flex",
    gap: "3rem",
    marginTop: "1rem",
    justifyContent: "space-around",
    marginLeft: "2rem",
  },
  modalcontent: {
    marginTop: "-1.5rem",
    marginRight: "2rem",
  },
  "@media (max-width: 900px)": {
    profiletabcontainer: {
      marginTop: "3rem",
    },
    profilecontainer: {
      width: "75%",
    },
  },
  "@media (max-width: 768px)": {
    profiletabcontainer: {
      marginTop: "3rem",
    },
    profilecontainer: {
      width: "90%",
    },
  },
  "@media (max-width: 390px)": {
    profiletabcontainer: {
      marginTop: "6rem",
    },
    profilecontainer: {
      width: "78%",
    },
  },

  header: {
    padding: "1rem",
    background: "white",
    display: "flex !important",
    flexDirection: "row !important",
    gap: 20,
    color: "black",
    [theme.breakpoints.down("md")]: {
      display: "flex !important",
      flexDirection: "column !important",
      flexWrap: "wrap",
    },
  },
  user_details: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
  },
  user_details_box: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
  },
  details_box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly ",
    width: "100%",
    flexWrap: "wrap",
  },
  indicator: {
    display: "none",
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: "red",
    },
  },
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  uploadPic: {
    position: "absolute",
    opacity: 0,
    "&:hover": {
      opacity: 0.8,
    },
  },
  uploadButton: {
    display: "flex",
    justifyContent: "flex-end",
    height: 200,
    width: 200,
    borderRadius: "50% !important",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold !important",
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
  submitButton: {
    backgroundColor: "red !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "red !important",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
      {...other}
    >
      {value === index && (
        <Box className="tab_panel" sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role')
  const [formValue, setFormValue] = useState({
    practiceName: "",
    practiceHeadName: "",
    totalEmployees: "",
    practiceDescription: "",
  });
  const { id } = useParams();
  const {data, isLoading} = useGetPracticeByIdQuery(id);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [formData, setFormData] = useState({
    profilepic: null,
  });
  /* istanbul ignore next */
  const handleImageChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "file") {
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
 
  const handleAddClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className="emp-edit">
        <Button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "gray",
            borderRadius: 20,
            margin: "10px 10px 0 10px",
          }}
        >
          <ArrowBackIcon sx={{ color: "white" }} />
        </Button>
        <Box className={`${classes.header} emp-edit`}>
          <Box className={classes.uploadBox}>
            <Avatar
              sx={{ width: 200, height: 200 }}
              src={formData.profilepic}
            ></Avatar>
            <Box className={classes.uploadPic}>
              <Input
                type="file"
                name="profilepic"
                id="profilePic"
                accept="image/*"
                onChange={handleImageChange}
                disableUnderline={true}
                sx={{ display: "none" }}
              />
              <label htmlFor="profilePic">
                <Button
                  component="span"
                  variant="contained"
                  className={classes.uploadButton}
                  size="small"
                >
                  <CloudUploadIcon size="small" />
                </Button>
              </label>
            </Box>
          </Box>
          <Box className={`${classes.details_box} `}>
            <Box className={classes.backButton}>
              <Typography variant="h4">{data?.data.title}</Typography>
            </Box>
            <Divider className="employee-devider"></Divider>
            <Grid container className={classes.user_details}>
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <PersonIcon fontSize="small" />
                  <Typography className={classes.heading}>
                    Practice Head Name
                  </Typography>
                </Box>
                <Typography mx={3}>{data?.data?.studio_head}</Typography>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <PiIdentificationBadgeFill size={20} />
                  <Typography className={classes.heading}>
                    Practice Code
                  </Typography>
                </Box>
                <Typography mx={3}>{data?.data?.code}</Typography>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <GroupsIcon fontSize="small" />
                  <Typography className={classes.heading}>
                    Total Employees
                  </Typography>
                </Box>
                <Typography mx={3}>10</Typography>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <BusinessCenterIcon fontSize="small" />
                  <Typography className={classes.heading}>
                    Total Competencies
                  </Typography>
                </Box>
                <Typography mx={3}>{data?.data?.total_employee}</Typography>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography className={classes.heading}>
                    Practice Location
                  </Typography>
                </Box>
                <Typography mx={3}>Noida</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider className="employee-devider"></Divider>
        <Box
          className="emp-edit"
          sx={{ bgcolor: "background.paper", width: "100%" }}
        >
          <Box
            className="emp-edit"
            sx={{
              borderBottom: 3,
              borderColor: "divider",
              borderBottomColor: "red",
            }}
          >
            <Tabs
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
              sx={{
                padding: "10px",
              }}
            >
              <Tab sx={{ color: "gray" }} label="Summary" {...a11yProps(0)} />
              <Tab
                sx={{ color: "gray" }}
                label="Competencies"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {!isLoading && (<PracticeSummary summaryData={data} />)}
            
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PracticeCompetency />
          </TabPanel>
        </Box>
      </Card>
      {open && (
        <PraticeModal
          openModal={open}
          handleClose={handleAddClose}
          buttonName={"Update"}
          modalType={"edit"}
          practiceData={data}
        />
      )}
    </div>
    
  );
}
