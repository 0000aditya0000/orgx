import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Card,
  Grid,
  Input,
  Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import StudioTeam from "../studioTeam/StudioTeam";
import StudioContribution from "../studioContribution/StudioContribution";
import StudioSummary from "../studioSummary/StudioSummary";
import { FaUser } from "react-icons/fa";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { MdEmail, MdWork } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import StudioModal from "../studioSummary/StudioModal";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useGetCompetencyByIdQuery } from "../../features/competencyApi";

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
    gap: 4,
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
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: "red",
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
    justifyContent: "space-between",
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

function studioProfile() {
  const { id } = useParams();
  const classes = useStyle();
  const tabIndex = location.state;
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [value, setValue] = useState(
    tabIndex?.index == null ? 0 : tabIndex?.index
  );
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data, isLoading } = useGetCompetencyByIdQuery(id);
  console.log("RTK", data);

  const role = localStorage.getItem("role");

  return (
    <div>
      <Card className="emp-edit">
        <Button
          data-testid="back-button"
          onClick={() => navigate(-1)}
          sx={{
            background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)',
            color: 'white',
            borderRadius: 20,
            margin: "10px 10px 0 10px",
            '&:hover': {
              background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)',
              opacity: 0.9
            }
          }}
        >
          <ArrowBackIcon style={{ color: "white" }} />
        </Button>
        <Box className={`${classes.header} emp-edit`}>
          <Box className={classes.uploadBox}>
            <Avatar
              sx={{ width: 200, height: 200 }}
              src={
                "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=176&h=190&c=7&r=0&o=5&pid=1.7"
              }
            ></Avatar>
            <Box className={classes.uploadPic}>
              <Input
                type="file"
                name="profilepic"
                id="profilePic"
                accept="image/*"
                // onChange={handleImageChange}
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
            {/* {role === "admin" && (
              <Box className={classes.backButton}>
                <Typography variant="h4">
                  {data?.data?.competency_name}
                </Typography>
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  color="error"
                  sx={{ height: "35px" }}
                >
                  Edit
                </Button>
              </Box>
            )}
            <Divider className="employee-devider"></Divider> */}
            <Grid container className={classes.user_details}>
              <Grid item>
                <Box className={classes.user_details_box}>
                  <FaUser size={20} />
                  <Typography className={classes.heading}>
                    Competency Head
                  </Typography>
                </Box>
                <Typography mx={3.5}>{data?.data?.competency_head}</Typography>
              </Grid>
              <Grid item>
                <Box className={classes.user_details_box}>
                  <RiTeamFill size={20} />
                  <Typography className={classes.heading}>
                    Total Employees
                  </Typography>
                </Box>
                <Typography mx={3.5}>{data?.data?.total_employee}</Typography>
              </Grid>
              <Grid item>
                <Box className={classes.user_details_box}>
                  <PiIdentificationBadgeFill size={20} />
                  <Typography className={classes.heading}>
                    Competency Code
                  </Typography>
                </Box>
                <Typography mx={3.5}>{data?.data?.competency_code}</Typography>
              </Grid>
              <Grid item>
                <Box className={classes.user_details_box}>
                  <MdWork size={20} />
                  <Typography className={classes.heading}>
                    Total Project
                  </Typography>
                </Box>
                <Typography mx={3.5}>{data?.data?.total_project}</Typography>
              </Grid>
              <Grid item>
                <Box className={classes.user_details_box}>
                  <MdEmail size={20} />
                  <Typography className={classes.heading}>
                    Competency Email
                  </Typography>
                </Box>
                <Typography mx={3.5}>
                  {data?.data?.competency_admin_email}
                </Typography>
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
              <Tab sx={{ color: "gray" }} label="About" {...a11yProps(0)} />
              <Tab
                sx={{ color: "gray" }}
                label="Contribution"
                {...a11yProps(1)}
              />
              <Tab sx={{ color: "gray" }} label="Team" {...a11yProps(2)} />
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
              >
                <ClassicSpinner size={70} color="#000" loading={isLoading} />
              </Backdrop>
            ) : (
              <StudioSummary data={data?.data?.description} />
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
              <StudioContribution />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <StudioTeam />
          </TabPanel>
        </Box>
      </Card>
      {openModal && (
        <StudioModal
          open={openModal}
          handleClose={handleCloseModal}
          onhandlesubmitButton={"Update"}
          modalData={data}
        />
      )}
    </div>
  );
}

export default studioProfile;
