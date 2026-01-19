import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useResolvedPath } from "react-router-dom";
import Studio from "/src/components/studio/Studio";
import Employee from "/src/components/employee/Employee";
import Edits from "./src/components/employee/EditEmployee";
import Header from "/src/components/header/Header";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Route, Routes } from "react-router-dom";
import { defineCustomElements } from "nash-web-components/loader";
import ContactUs from "./src/components/ContactUs/ContactUs";
import Practice from "./src/components/practice/Practice";
import SideNav from "./src/components/navigation/sideNavigation";
import Dashboard from "./src/components/dashboard/dasboard";
import EditPractice from "./src/components/practice/EditPractice";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, Box } from "@mui/material";
import StudioProfile from "./src/components/studioProfile/StudioProfile";
import CompanyProfile from "./src/components/company_profile/CompanyProfile";
import { LeavePage } from "./src/components/leaveModule/LeavePage";
import { Attendance } from "./src/components/attendance/Attendance";
import EmployeeDashboard from "./src/components/EmployeeDashboard/EmployeeDashboard";
import { StudioHeadDashboard } from "./src/components/StudioHeadDashboard/StudioHeadDashboard";
import ProjectStatistics from "./src/components/StudioHeadDashboard/ProjectStatistics";
import ProjectProfile from "./src/components/StudioHeadDashboard/ProjectProfile";
import { Projects } from "./src/components/Project/Projects";
import Subscription from "./src/components/subscription/Subscription";
import ProjectForm from "./src/components/Project/ProjectForm";
import { decodeToken } from "react-jwt";
import { Provider } from "react-redux";
import store from "./src/app/store.js";
import ToastMessage from "./src/components/snackbar/ToastMessage.js";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",

    [theme.breakpoints.up("sm")]: {
      marginTop: "2vh",
    },
  },
}));
const App = () => {
  const classes = useStyles();
  const pathname = useResolvedPath();
  const isMobile = useMediaQuery("(max-width:1024px)");
  const authToken = localStorage.getItem("token");
  const tokenDecode = authToken;
  const decodedToken = decodeToken(tokenDecode);
  const labels = decodedToken?.labels;
  const id = 10;
  return (
    <>
      <Stack
        className={classes.root}
        direction={"row"}
        justifyContent={"start"}
        spacing={2}
      >
        {pathname.pathname !== "/home/contact-us" && (
          <div>
            {/* <SideNav /> */}
          </div>
        )}

        <Box
          sx={{
            margin: ".5rem",
            width: isMobile ? "90%" : "100%",
            marginLeft: { sm: "10rem", md: "10rem", lg: "10rem" },
            height:'100%',
            overflowX: "auto",
            scrollbarGutter: "stable",
            overflowY: "hidden",
          }}
          ml={{ sm: "10rem", md: "10rem", lg: "10rem" }}
        >
          <Routes>
            {labels?.employee_id === null ? (
              <Route path="/home/company" element={<Dashboard />} />
            ) : (
              <Route
                path="/home/employee-dashboard/:id"
                element={<EmployeeDashboard />}
              />
            )}
            <Route path="/home/company/studio" element={<Studio />} />
            <Route path="/home/company/employee" element={<Employee />} />
            <Route path="/home/company/employee/:id" element={<Edits />} />
            <Route path={`/home/profile/:id`} element={<Edits />} />
            <Route path="/home/contact-us" element={<ContactUs />} />
            <Route path="/home/company/practices" element={<Practice />} />
            <Route
              path="/home/company/practices/:id"
              element={<EditPractice />}
            />
            <Route
              path="/home/company/studioprofile/:id"
              element={<StudioProfile />}
            />
            {labels?.employee_id === null && (
              <Route path="/home/profile" element={<CompanyProfile />} />
            )}
            {labels?.employee_id === null && (
              <Route
                path="/home/company/subscription"
                element={<Subscription />}
              />
            )}
            <Route path="/home/company/about" element={<CompanyProfile />} />
            <Route path="/home/leave" element={<LeavePage />} />
            <Route
              path="/home/profile/:id/attendance"
              element={<Attendance />}
            />
            <Route
              path="/home/competency-dashboard"
              element={<StudioHeadDashboard />}
            />
            <Route
              path="/home/competency-dashboard/projectStatistics"
              element={<ProjectStatistics />}
            />
            <Route
              path="/home/competency-dashboard/projectStatistics/projects/:id"
              element={<ProjectProfile />}
            />
            <Route
              path="/home/company/projectStatistics/projects/:id"
              element={<ProjectProfile />}
            />
            <Route
              path="home/company/projects/projectStatistics/:id"
              element={<ProjectProfile />}
            />
            <Route path="home/company/projects" element={<Projects />} />
            <Route
              path="home/company/projects/add-project"
              element={<ProjectForm title={"Project"} action={"Add"} />}
            />
            <Route
              path="home/company/projects/edit-project/:id"
              element={<ProjectForm title={"Project"} action={"Edit"} />}
            />
          </Routes>
        </Box>
      </Stack>
      <ToastMessage />
    </>
  );
};

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      this
    );
  }
}
defineCustomElements(window);
customElements.define("react-element", ReactMfe);
