import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Card,
  Grid,
  Input,
  Button,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Profile from "../employee/EmployeeProfile";
import { useParams } from "react-router-dom";
import About from "./AboutEmployee";
import Job from "./EmployeeJob";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import EditModal from "./EditModal";
import { decodeToken } from "react-jwt";
import { getEmployeeById } from "../../services/employeeService";
import { getCompetencies } from "../../services/competencyService";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useGetEmployeeByIdQuery } from "../../features/employeeAPISlice";
import EditIcon from '@mui/icons-material/Edit';

const useStyle = makeStyles((theme) => ({
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
    gap: 30,
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
      color: "#310e68 !important",
      fontWeight: "bold",
      borderBottom: "none !important",
    },
  },
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  editBtn: {
    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
    color: "white !important",

    "&:hover ": {
      backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
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
    alignItems: "center",
    gap: "10px",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold !important",
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function Edits() {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const tabIndex = location.state;
  const { id } = useParams();
  const [openProfileEditModal, setOpenProfileEditModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const tenantCode = localStorage.getItem("tenant_code");
  const authToken = localStorage.getItem("token");
  const [competency, setCompetency] = useState([]);
  const [value, setValue] = useState(
    tabIndex?.index == null ? 0 : tabIndex?.index
  );
  const [formData, setFormData] = useState({
    profilepic: null,
  });
  const { data, isLoading, isError, error, refetch: refetchEmployee } = useGetEmployeeByIdQuery(id);
  const tokenDecode = authToken;
  const decodedToken = decodeToken(tokenDecode);
  const labels = decodedToken?.labels;
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleOpen = () => setOpenEditModal(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllCompetency = async () => {
    try {
      const data = await getCompetencies();
      setCompetency(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `${error.data?.message}`,
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    getAllCompetency();
    // getInfo(id);
  }, []);

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
  const navigate = useNavigate();
  let employeeData = data?.data;

  if(isError){
    if(error.status === 401) {
      return (
        <h2>Something Went wrong !! Please Log In again</h2>
      )
    }
  }
  return (
    <>
      <div>
        <Card className="emp-edit">
          <Button className="back-to-list-button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
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
              {labels.isprojectupdate && (
                <Box className={classes.backButton}>
                  <Typography variant="h4" sx={{ margin: 0 }}>
                    {employeeData?.first_name} {employeeData?.last_name || ""}
                  </Typography>
                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                        opacity: 0.9
                      }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
              {openEditModal && (
                <EditModal
                  openProfileEditModal={openEditModal}
                  onHandleClose={handleCloseEditModal}
                  type="adminDetails"
                  onHandleSubmit="UPDATE"
                  competencyData={competency}
                  onUpdateSuccess={refetchEmployee}
                />
              )}
              <Grid container className={classes.user_details}>
                <Grid item className={classes.user_details_box}>
                  <BusinessCenterIcon />
                  <Typography>{employeeData?.designation}</Typography>
                </Grid>
                <Grid item className={classes.user_details_box}>
                  <EmailIcon />
                  <Typography>{employeeData?.email}</Typography>
                </Grid>
                <Grid item className={classes.user_details_box}>
                  <LocalPhoneIcon />
                  <Typography>{employeeData?.phone || "--"}</Typography>
                </Grid>
                <Grid item className={classes.user_details_box}>
                  <LocationOnIcon />
                  <Typography>{employeeData?.location || "--"}</Typography>
                </Grid>
                <Grid item className={classes.user_details_box}>
                  <PiIdentificationBadgeFill size={20} />
                  <Typography>{employeeData?.id}</Typography>
                </Grid>
              </Grid>
              <Divider className="employee-devider"></Divider>
              <Grid container className={classes.user_details}>
                <Grid item>
                  <Typography className={classes.heading}>
                    Business Unit
                  </Typography>
                  <Typography>Knoldus Noida</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.heading}>
                    Competency
                  </Typography>
                  <Typography>{employeeData?.studio_name}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.heading}>
                    Reporting Manager
                  </Typography>
                  <Typography>{employeeData?.reporting_manager}</Typography>
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
              className="emp-edit tab_header"
              sx={{
                borderBottom: 3,
                borderColor: "divider",
                borderBottomColor: "#310e68",
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
                <Tab sx={{ color: "gray" }} label="ABOUT" {...a11yProps(0)} />
                <Tab sx={{ color: "gray" }} label="Profile" {...a11yProps(1)} />
                <Tab sx={{ color: "gray" }} label="JOBS" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {isLoading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: "initial",
                    height: "10rem",
                    marginTop: "1rem",
                    background: "transparent",
                  }}
                  open
                  data-testid="ClassicSpinner"
                >
                  <ClassicSpinner size={70} color="#000" loading={isLoading} />
                </Backdrop>
              ) : (
                <About employee_data={employeeData} />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {isLoading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: "initial",
                    height: "10rem",
                    marginTop: "1rem",
                    background: "transparent",
                  }}
                  open
                >
                  <ClassicSpinner size={70} color="#000" loading={isLoading} />
                </Backdrop>
              ) : (
                <Profile employee_data={employeeData} />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Job />
            </TabPanel>
          </Box>
        </Card>
      </div>
    </>
  );
}

export default Edits;
