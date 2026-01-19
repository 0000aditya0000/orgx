import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { mockApiService } from "../../services/mockApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "0.8rem",
    borderRadius: "1.2rem",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(80, 41, 119, 0.07)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#310e68",
    marginBottom: "1rem",
    marginTop: "-0.8rem",
    textAlign: "center",
  },
  chartContainer: {
    position: "relative",
    width: "140px",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  donutChart: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "conic-gradient(#16a34a 0deg 324deg, #e5e7eb 324deg 360deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  innerCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "8px",
  },
  percentage: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: "1px",
  },
  ratio: {
    fontSize: "0.7rem",
    color: "#6b7280",
  },
}));

const EmployeesWorking = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [workingData, setWorkingData] = useState({ working: 0, onLeave: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('EmployeesWorking fetching data for:', year, quarter);
        const response = await mockApiService.getEmployeesWorking(year, quarter);
        console.log('EmployeesWorking response:', response);
        if (response.success) {
          setWorkingData(response.data);
        }
      } catch (error) {
        console.error("Error fetching employees working data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, quarter]);

  if (loading) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>
          Employees Working
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading...</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Employees Working
      </Typography>
      
      <div className={classes.chartContainer}>
        <div className={classes.donutChart}>
          <div className={classes.innerCircle}>
            <Typography className={classes.percentage}>90%</Typography>
            <Typography className={classes.ratio}>179/200</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesWorking;
