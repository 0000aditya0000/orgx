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
    marginBottom: "1rem",
    textAlign: "center",
  },
  chartContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  yAxis: {
    position: "absolute",
    left: "0",
    top: "0",
    height: "100%",
    width: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px 0",
    
  },
  yAxisLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "right",
  },
  chartArea: {
    marginLeft: "40px",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  xAxis: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderTop: "1px solid #e5e7eb",
  },
  xAxisLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "center",
  },
  lineChart: {
    flex: 1,
    position: "relative",
    margin: "10px 0",
  },
  line: {
    position: "absolute",
    height: "2px",
    borderRadius: "1px",
  },
  avgRatingLine: {
    backgroundColor: "#dc2626",
    top: "80%",
    left: "0",
    right: "0",
  },
  totalEmployeesLine: {
    backgroundColor: "#1e3a8a",
    top: "20%",
    left: "0",
    right: "0",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "8px",
    width: "100%",
    paddingBottom: "8px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  legendColor: {
    width: "16px",
    height: "3px",
    borderRadius: "2px",
  },
  legendText: {
    fontSize: "0.8rem",
    color: "#374151",
    fontWeight: "500",
  },
}));

const SkillTrends = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('SkillTrends fetching data for:', year, quarter);
        const response = await mockApiService.getSkillTrends(year, quarter);
        console.log('SkillTrends response:', response);
        if (response.success) {
          setTrendsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching skill trends data:", error);
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
          Skill Trends
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading...</Typography>
        </div>
      </div>
    );
  }

  // Calculate chart dimensions and scaling - make it responsive
  const chartWidth = 800; // Further increased width for better visibility
  const chartHeight = 250; // Reduced height to prevent legend overflow
  const padding = 60; // Increased padding for better Y-axis spacing
  const maxValue = Math.max(...trendsData.flatMap(month => Object.values(month).filter(val => typeof val === 'number')));
  
  const getYPosition = (value) => {
    return chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
  };

  const getXPosition = (index) => {
    return padding + (index * (chartWidth - 2 * padding) / (trendsData.length - 1));
  };

  // Define colors for each skill
  const skillColors = {
    React: "#61dafb",
    Angular: "#dd0031", 
    Vue: "#4fc08d",
    Node: "#68a063",
    Python: "#3776ab",
    Java: "#f89820"
  };

  const skills = ['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'];

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Skill Trends
      </Typography>
      
      <div className={classes.chartContainer} style={{ width: '100%', height: '100%' }}>
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, index) => (
            <g key={index}>
              <line
                x1={padding}
                y1={padding + (ratio * (chartHeight - 2 * padding))}
                x2={chartWidth - padding}
                y2={padding + (ratio * (chartHeight - 2 * padding))}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding - 20}
                y={padding + (ratio * (chartHeight - 2 * padding)) + 5}
                fontSize="12"
                fill="#6b7280"
                textAnchor="end"
                fontWeight="500"
              >
                {Math.round(maxValue * (1 - ratio))}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {trendsData.map((month, index) => (
            <text
              key={index}
              x={getXPosition(index)}
              y={chartHeight - 15}
              fontSize="12"
              fill="#6b7280"
              textAnchor="middle"
              fontWeight="500"
            >
              {month.month}
            </text>
          ))}

          {/* Draw lines for each skill */}
          {skills.map(skill => {
            const points = trendsData.map((month, index) => {
              const value = month[skill] || 0;
              return `${getXPosition(index)},${getYPosition(value)}`;
            }).join(' ');

            return (
              <g key={skill}>
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke={skillColors[skill]}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points (circles) */}
                {trendsData.map((month, index) => {
                  const value = month[skill] || 0;
                  return (
                    <circle
                      key={`${skill}-${index}`}
                      cx={getXPosition(index)}
                      cy={getYPosition(value)}
                      r="6"
                      fill={skillColors[skill]}
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className={classes.legend}>
          {skills.map(skill => (
            <div key={skill} className={classes.legendItem}>
              <div 
                className={classes.legendColor}
                style={{ backgroundColor: skillColors[skill] }}
              />
              <span className={classes.legendText}>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTrends;
