import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  titleText: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#310e68",
  },
  navigation: {
    display: "flex",
    gap: "4px",
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
    background: "conic-gradient(#f97316 0deg 234deg, #e5e7eb 234deg 360deg)",
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
  skillName: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "2px",
  },
  percentage: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#f97316",
    marginBottom: "1px",
  },
  ratio: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  arrowButton: {
    padding: "4px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  },
}));

const TotalVsOnProject = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await mockApiService.getTotalVsOnProject(year, quarter);
        if (response.success) {
          setProjectData(response.data);
        }
      } catch (error) {
        console.error("Error fetching total vs on-project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, quarter]);

  const currentProject = projectData[currentProjectIndex];

  const handlePrevious = () => {
    setCurrentProjectIndex((prev) => 
      prev === 0 ? projectData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentProjectIndex((prev) => 
      prev === projectData.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography className={classes.titleText}>
            Total vs On-Project
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading...</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.titleText}>
          Total vs On-Project
        </Typography>
        <div className={classes.navigation}>
          <IconButton 
            className={classes.arrowButton} 
            size="small"
            onClick={handlePrevious}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton 
            className={classes.arrowButton} 
            size="small"
            onClick={handleNext}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      
      <div className={classes.chartContainer}>
        <div 
          className={classes.donutChart}
          style={{
            background: `conic-gradient(${currentProject.color} 0deg ${currentProject.percentage * 3.6}deg, #e5e7eb ${currentProject.percentage * 3.6}deg 360deg)`
          }}
        >
          <div className={classes.innerCircle}>
            <Typography className={classes.skillName}>{currentProject.skill}</Typography>
            <Typography 
              className={classes.percentage}
              style={{ color: currentProject.color }}
            >
              {currentProject.percentage}%
            </Typography>
            <Typography className={classes.ratio}>
              {currentProject.onProject}/{currentProject.total}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalVsOnProject;
