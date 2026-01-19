import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Tooltip } from "@material-ui/core";
import { mockApiService } from "../../services/mockApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1rem",
    borderRadius: "1.2rem",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(80, 41, 119, 0.07)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#310e68",
    marginBottom: "1rem",
    textAlign: "center",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    height: "180px",
    justifyContent: "space-around",
  },
  chartArea: {
    display: "flex",
    alignItems: "end",
    height: "130px",
    gap: "8px",
    padding: "0 5px",
    width: "100%",
    justifyContent: "space-between",
  },
  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    minWidth: "8px",
  },
  bar: {
    display: "flex",
    flexDirection: "column",
    width: "10px",
    height: "100%",
    justifyContent: "end",
    position: "relative",
  },
  barSegment: {
    width: "100%",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
      transform: "scale(1.02)",
    },
  },
  darkBlue: {
    backgroundColor: "#1e3a8a", // Dark blue
  },
  lightBlue: {
    backgroundColor: "#3b82f6", // Light blue
  },
  projectLabel: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginTop: "8px",
    textAlign: "center",
  },
  yAxis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "130px",
    paddingRight: "6px",
    marginRight: "6px",
  },
  yAxisLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "right",
  },
  chartWrapper: {
    display: "flex",
    alignItems: "end",
    height: "130px",
  },
  xAxis: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px 0 20px",
    borderTop: "1px solid #e5e7eb",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendColor: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
  },
  legendText: {
    fontSize: "0.875rem",
    color: "#374151",
  },
}));

const ProjectWiseAllocationChart = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await mockApiService.getProjectWiseAllocation(year, quarter);
        if (response.success) {
          setProjectData(response.data);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, quarter]);

  console.log('ProjectWiseAllocationChart rendering with', projectData.length, 'projects');

  const maxValue = 70; // Maximum value from the data

  const getBarHeight = (value) => {
    return `${(value / maxValue) * 100}%`;
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>
          Project-wise Employee Allocation
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading...</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root} key="project-allocation-chart">
      <Typography className={classes.title}>
        Project-wise Employee Allocation
      </Typography>
      
      <div className={classes.chartContainer}>
        <div className={classes.chartWrapper}>
          <div className={classes.yAxis}>
            <div className={classes.yAxisLabel}>70</div>
            <div className={classes.yAxisLabel}>53</div>
            <div className={classes.yAxisLabel}>35</div>
            <div className={classes.yAxisLabel}>18</div>
            <div className={classes.yAxisLabel}>0</div>
          </div>
          
          <div className={classes.chartArea}>
            {projectData.map((project, index) => (
              <div key={project.name} className={classes.barContainer}>
                <div className={classes.bar}>
                  <Tooltip 
                    title={`On Bench: ${project.lightBlue} employees`}
                    arrow
                    placement="top"
                  >
                    <div
                      className={`${classes.barSegment} ${classes.lightBlue}`}
                      style={{
                        height: getBarHeight(project.lightBlue),
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  </Tooltip>
                  <Tooltip 
                    title={`On Project: ${project.darkBlue} employees`}
                    arrow
                    placement="top"
                  >
                    <div
                      className={`${classes.barSegment} ${classes.darkBlue}`}
                      style={{
                        height: getBarHeight(project.darkBlue),
                        borderRadius: "0 0 4px 4px",
                      }}
                    />
                  </Tooltip>
                </div>
                <Typography className={classes.projectLabel}>
                  {project.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.legend}>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.darkBlue}`} />
          <span className={classes.legendText}>On Project</span>
        </div>
        <div className={classes.legendItem}>
          <div className={`${classes.legendColor} ${classes.lightBlue}`} />
          <span className={classes.legendText}>On Bench</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectWiseAllocationChart;
