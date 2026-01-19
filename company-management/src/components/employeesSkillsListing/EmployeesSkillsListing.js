import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, IconButton, Avatar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#310e68",
  },
  navigation: {
    display: "flex",
    gap: "4px",
  },
  arrowButton: {
    padding: "4px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  },
  employeeList: {
    flex: 1,
    overflowY: "auto",
  },
  employeeItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  avatar: {
    width: "32px",
    height: "32px",
    backgroundColor: "#310e68",
    color: "#fff",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginRight: "12px",
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "2px",
  },
  employeeRole: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  trendIcon: {
    marginRight: "8px",
  },
  starsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  star: {
    fontSize: "14px",
  },
}));

const EmployeesSkillsListing = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('EmployeesSkillsListing fetching data for:', year, quarter);
        const response = await mockApiService.getEmployeesSkillsListing(year, quarter);
        console.log('EmployeesSkillsListing response:', response);
        if (response.success) {
          // Convert the API data to the expected format
          const formattedData = Object.keys(response.data).map(skill => ({
            skill: skill,
            employees: response.data[skill]
          }));
          setSkillsData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching employees skills listing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, quarter]);

  // Different skills with their employee data
  const fallbackSkillsData = [
    {
      skill: "React",
      employees: [
        { name: "Alice", role: "Sr. Software Developer", trend: "up", rating: 4.5 },
        { name: "Bob", role: "Sr. Software Developer", trend: "down", rating: 3 },
        { name: "Charlie", role: "Software Developer", trend: "up", rating: 5 },
        { name: "David", role: "Software Developer", trend: "down", rating: 2 },
        { name: "Edward", role: "Software Developer", trend: "up", rating: 5 },
      ]
    },
    {
      skill: "Angular",
      employees: [
        { name: "Emma", role: "Sr. Software Developer", trend: "up", rating: 4.8 },
        { name: "Frank", role: "Software Developer", trend: "up", rating: 4.2 },
        { name: "Grace", role: "Software Developer", trend: "down", rating: 3.5 },
        { name: "Henry", role: "Software Developer", trend: "up", rating: 4.9 },
      ]
    },
    {
      skill: "Vue",
      employees: [
        { name: "Ivy", role: "Sr. Software Developer", trend: "up", rating: 4.7 },
        { name: "Jack", role: "Software Developer", trend: "down", rating: 3.8 },
        { name: "Kate", role: "Software Developer", trend: "up", rating: 4.6 },
      ]
    },
    {
      skill: "Svelte",
      employees: [
        { name: "Liam", role: "Software Developer", trend: "up", rating: 4.3 },
        { name: "Maya", role: "Software Developer", trend: "up", rating: 4.1 },
      ]
    }
  ];


  const handlePrevious = () => {
    setCurrentSkillIndex((prev) => 
      prev === 0 ? skillsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSkillIndex((prev) => 
      prev === skillsData.length - 1 ? 0 : prev + 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={classes.star}
          style={{ color: "#fbbf24" }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon
          key="half"
          className={classes.star}
          style={{ color: "#fbbf24" }}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorderIcon
          key={`empty-${i}`}
          className={classes.star}
          style={{ color: "#d1d5db" }}
        />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography className={classes.title}>
            Employees Skills Listing
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading...</Typography>
        </div>
      </div>
    );
  }

  const currentSkill = skillsData[currentSkillIndex] || skillsData[0];
  const employees = currentSkill.employees;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>
          {currentSkill.skill} Skills
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
      
      <div className={classes.employeeList}>
        {employees.map((employee, index) => (
          <div key={index} className={classes.employeeItem}>
            <Avatar className={classes.avatar}>
              {employee.name.charAt(0)}
            </Avatar>
            <div className={classes.employeeInfo}>
              <Typography className={classes.employeeName}>
                {employee.name}
              </Typography>
              <Typography className={classes.employeeRole}>
                {employee.role}
              </Typography>
            </div>
            <div className={classes.trendIcon}>
              {employee.trend === "up" ? (
                <TrendingUpIcon style={{ color: "#10b981", fontSize: "16px" }} />
              ) : (
                <TrendingDownIcon style={{ color: "#ef4444", fontSize: "16px" }} />
              )}
            </div>
            <div className={classes.starsContainer}>
              {renderStars(employee.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesSkillsListing;
