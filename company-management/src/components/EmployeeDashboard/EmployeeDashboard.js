import React, { useState, useEffect } from "react";
import EmployeeDetail from "./EmployeeDetail";
import CardSection from "./CardSection";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Announcement from "./Announcement";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { getEmployeeById } from "../../services/employeeService";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  postSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
}));
export default function EmployeeDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({});

  const getInfo = async (id) => {
    try {
      let data = await getEmployeeById(id);
      let employee = data.data;
      setEmployeeData(employee);
    } catch (error) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `Something went wrong: ${error.message}`,
        })
      );
    }
  };

  useEffect(() => {
    getInfo(id);
  }, []);

  return (
    <div>
      <Box className={classes.rootContainer}>
        <Box>
          <EmployeeDetail employeeName={employeeData.first_name} />
        </Box>
        <Box className={classes.dataContainer} width={"100%"}>
          <Box width={"60%"}>
            <CardSection />
          </Box>
          <Box width={"40%"} className={classes.postSection}>
            <Post />
            <Announcement />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
