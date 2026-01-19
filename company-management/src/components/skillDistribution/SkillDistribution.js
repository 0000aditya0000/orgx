import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
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
    marginBottom: "3rem",
    textAlign: "center",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    marginBottom: "1rem",
  },
  donutChart: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "conic-gradient(#1e3a8a 0deg 144deg, #ef4444 144deg 252deg, #3b82f6 252deg 324deg, #10b981 324deg 360deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    
  },
  innerCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  legend: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "2rem",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendColor: {
    width: "12px",
    height: "12px",
    borderRadius: "2px",
  },
  legendText: {
    fontSize: "0.875rem",
    color: "#374151",
    fontWeight: "500",
  },
  legendCount: {
    fontSize: "0.875rem",
    color: "#6b7280",
   
  },
}));

const SkillDistribution = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [skillData, setSkillData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('SkillDistribution fetching data for:', year, quarter);
        const response = await mockApiService.getSkillDistribution(year, quarter);
        console.log('SkillDistribution response:', response);
        if (response.success) {
          setSkillData(response.data);
        }
      } catch (error) {
        console.error("Error fetching skill distribution data:", error);
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
          Skill Distribution
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
        Skill Distribution
      </Typography>
      
      <div className={classes.chartContainer}>
        <div className={classes.donutChart}>
          <div className={classes.innerCircle}>
            <Typography style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Skills
            </Typography>
          </div>
        </div>
        
        <div className={classes.legend}>
          {skillData.map((skill, index) => (
            <div key={skill.skill} className={classes.legendItem}>
              <div 
                className={classes.legendColor}
                style={{ backgroundColor: skill.color }}
              />
              <span className={classes.legendText}>{skill.skill}</span>
              <span className={classes.legendCount}>({skill.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDistribution;
