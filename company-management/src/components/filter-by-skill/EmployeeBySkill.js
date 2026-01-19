import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { makeStyles } from "@mui/styles";
import { FilterBAndW } from "@material-ui/icons";
import { getCompetencySkillByName } from "../../services/competencySkillsServices";

const useStyles = makeStyles((theme) => ({
  skillRoot: {
    borderRadius: "inherit !important",
    backgroundColor: "inherit !important",
    overflowY: "auto",
    height: "20rem",
    "&::-webkit-scrollbar ": {
      width: "10px",
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "20px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "gray",
      borderRadius: "20px",
    },

    "&::-webkit-scrollbar-thumb:hover ": {
      background: "#555",
    },
  },
  skillInitialCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
}));

export const EmployeeBySkill = (props) => {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [filterdEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();
  const filterEmployeesBySkill = (employees) => {
    let level = "";
    if (employees.level === 4) {
      level = "Intermediate";
    } else if (employees.level === 5) {
      level = "Expert";
    } else {
      level = "Beginner";
    }
    return employees.filter((employee) => level === props.level);
  };

  // const getFilteredEmployees = () => {
  //   const employeesAfterFilter = filterEmployeesBySkill(props.skill);
  //   setFilteredEmployees(employeesAfterFilter);
  // };
  const getEmployeeBySkill = async () => {
    try {
      const data = await getCompetencySkillByName(props.skill.skill);
      setFilteredEmployees(data.data["employee data"] || []);
      filterEmployeesBySkill(filterdEmployees);
      console.log(data.data["employee data"]);
    } catch {}
  };
  useEffect(() => {
    if (props.skill.skill !== undefined) {
      getEmployeeBySkill();
    }
  }, [props.skill]);
  // console.log(employees.length)
  return (
    <>
      {filterdEmployees.length !== 0 && (
        <>
          <Box display={"flex"} flexDirection={"row"} padding={1}>
            <Typography className="title" variant="h5" fontWeight={"bold"}>
              Employees By Skill{` (${filterdEmployees.length})`}
            </Typography>
          </Box>
          <Divider className="employee-devider" />
        </>
      )}
      <Box className={classes.skillRoot}>
        {props.skill.skill ? (
          <List>
            {filterdEmployees.length !== 0 ? (
              filterdEmployees.map((employee, index) => {
                return (
                  <ListItem
                    alignItems="flex-start"
                    key={employee.toString()}
                    secondaryAction={
                      <IconButton
                        onClick={() =>
                          navigate(`/home/company/employee/${employee.empId}`)
                        }
                        edge="end"
                      >
                        <OpenInNewIcon className="title" fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={employee.employee_name}
                        src="/static/images/avatar/2.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="title"
                      primary={employee.employee_name}
                      secondary={
                        <>
                          <Typography
                            className="title"
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`${employee.employee_designation} — `}
                          </Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            fontWeight={500}
                            color={
                              props.skill.level === "Expert"
                                ? "#A5DD9B"
                                : props.skill.level === "Intermediate"
                                ? "#FFA62F"
                                : props.skill.level === "Beginner"
                                ? "#03AED2"
                                : "gray"
                            }
                          >
                            {` ${props.skill.level} in ${props.skill.skill}`}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={"We are working on the skill."}
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  className="title"
                  primary={`No Employees currently with ${props.skill.skill} skill in ${props.skill.level} level right now.`}
                />
              </ListItem>
            )}
          </List>
        ) : (
          <Box className={classes.skillInitialCard}>
            <Typography
              className="title"
              variant="h5"
              padding={2}
              fontWeight={500}
            >
              Select Skill To Filter Out Employees
            </Typography>
            <Divider className="employee-devider" sx={{ width: "90%" }} />
            <Typography
              className="title"
              variant="h6"
              padding={2}
              fontWeight={500}
            >
              Click on bar of skill matrix
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
