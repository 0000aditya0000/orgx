import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Avatar } from "@material-ui/core";
import { mockApiService } from "../../services/mockApiService";
import PersonIcon from "@material-ui/icons/Person";

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
  employeeList: {
    flex: 1,
    overflowY: "auto",
  },
  employeeItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f3f4f6",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  avatar: {
    width: "36px",
    height: "36px",
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
  leaveDates: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  leaveIcon: {
    marginLeft: "8px",
    color: "#6b7280",
    fontSize: "16px",
  },
}));

const EmployeesOnLeave = ({ year = 2024, quarter = "Q1" }) => {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('EmployeesOnLeave fetching data for:', year, quarter);
        const response = await mockApiService.getEmployeesOnLeave(year, quarter);
        console.log('EmployeesOnLeave response:', response);
        if (response.success) {
          setEmployees(response.data);
        }
      } catch (error) {
        console.error("Error fetching employees on leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, quarter]);

  const fallbackEmployees = [
    {
      name: "Alice Johnson",
      leaveFrom: "22 Jul 2025",
      leaveTo: "24 Jul 2025",
    },
    {
      name: "Bob Smith",
      leaveFrom: "23 Jul 2025",
      leaveTo: "24 Jul 2025",
    },
    {
      name: "Charlie Lee",
      leaveFrom: "23 Jul 2025",
      leaveTo: "25 Jul 2025",
    },
    {
      name: "David Miller",
      leaveFrom: "24 Jul 2025",
      leaveTo: "25 Jul 2025",
    },
    {
      name: "Emma Wilson",
      leaveFrom: "25 Jul 2025",
      leaveTo: "27 Jul 2025",
    },
    {
      name: "Frank Brown",
      leaveFrom: "26 Jul 2025",
      leaveTo: "28 Jul 2025",
    },
  ];

  if (loading) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>
          Employees on Leave
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
        Employees on Leave
      </Typography>
      
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
              <Typography className={classes.leaveDates}>
                Leave from {employee.leaveFrom} to {employee.leaveTo}
              </Typography>
            </div>
            <PersonIcon className={classes.leaveIcon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesOnLeave;
