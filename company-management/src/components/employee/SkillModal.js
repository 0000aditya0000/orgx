import {
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  Card,
  Chip,
  Autocomplete,
  Divider,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../features/toastSlice";
import {
  useAddSkillMutation,
  useGetAllSkillsQuery,
} from "../../features/skillApiSlice";
import CircularProgress from "@mui/material";
import {
  useAddEmployeeSkillMutation,
  useDeleteEmployeeSkillMutation,
} from "../../features/employeeSkillAPI";
import {
  addSkillToEmployee,
  removeSkillFromEmployee,
} from "../../features/employeeSkillSlice";

const useStyle = makeStyles((theme) => ({
  field: {
    width: "10rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "& .MuiFormLabel-root": {
      color: "grey",

      "&.Mui-focused ": {
        color: "red",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B2BAC2",
      },
      "&:hover fieldset": {
        borderColor: "#6F7E8C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
    "&.MuiOutlinedInput-input": {
      color: "white",
    },
  },
  label: {
    marginLeft: "5rem",
    color: "rgb(166 166 166)",
    fontSize: "18px",
  },
  card: {
    borderRadius: "0",
    height: "100%",
    overflowY: "auto",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  skillsField: {
    display: "flex !important",
    flexDirection: "row",
    justifyContent: "center !important",
    gap: "3rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  skillContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  chipsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
    marginBottom: "3px",
  },
  closeButton: {
    backgroundColor: "grey !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "grey",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  submitButton: {
    backgroundColor: "red !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "red",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
}));

export default function SkillModal({
  openProfileEditModal,
  onHandleClose,
  employeeData,
  studioId,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [skills, setSkills] = useState({ skill_name: "", level: 0 });
  const selectedSkills = useSelector((state) => state.employeeSkill.skillSet);
  const [inputValue, setInputValue] = useState("");
  const [includedSkill, setIncludedSkill] = useState(false);
  const employeeId = employeeData.id;
  const { data: allSkills, isLoading, isError, error } = useGetAllSkillsQuery();
  const skillNames =
    allSkills?.data && allSkills?.data.map((s) => s.skill_name);
  const allSkillsList =
    skillNames?.length !== 0
      ? skillNames
      : [
          "Java",
          "Javascript",
          "ReactJs",
          "NextJs",
          "NestJs",
          "AWS",
          "Hibernate",
          "SQL",
          "Springboot",
          "Jest",
          "Nightwatch",
        ]; //skill_name
  const selectedSkillNames = selectedSkills.map((data) => data.skill_name);
  const availableSkills = allSkillsList?.filter(
    (skill) => !selectedSkillNames.includes(skill)
  );

  const [addSkill, { data, isLoading: isAdding }] =
    useAddEmployeeSkillMutation();

  const [createSkill, { data: createdSkill, isLoading: creating }] =
    useAddSkillMutation();
  const handleSkillChange = (event) => {
    let { name, value } = event.target;
    setSkills({
      ...skills,
      [name]: value,
    });
  };

  const [deleteSkill, { isLoading: isDeleting }] =
    useDeleteEmployeeSkillMutation();

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleChange = async (event, newValue) => {
    setSkills({ ...skills, skill_name: newValue });
    if (newValue && !allSkillsList.includes(newValue)) {
      try {
        await createSkill({ skill_name: inputValue }).unwrap();
      } catch (error) {
        dispatch(
          showToast({ severitySnackbar: "error", message: error.data.message })
        );
      }
    }
  };

  const handleDelete = async (indexToDelete) => {
    try {
      await deleteSkill(selectedSkills[indexToDelete].id).unwrap();
      setSkills({
        ...skills,
        skill_name: selectedSkills[indexToDelete].skill_name,
      });
      dispatch(removeSkillFromEmployee(selectedSkills[indexToDelete].id));
    } catch (error) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `${error.data.message}`,
        })
      );
    }
    setInputValue("");
  };

  const filterOptions = (options, { inputValue }) => {
    const alreadyAvailable = selectedSkills.map((data) =>
      data.skill_name.toLowerCase()
    );

    const filtered = options.filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !alreadyAvailable.includes(option.toLowerCase())
    );

    if (
      inputValue !== "" &&
      !filtered.some(
        (option) => option.toLowerCase() === inputValue.toLowerCase()
      ) &&
      !alreadyAvailable.includes(inputValue.toLowerCase())
    ) {
      filtered.push(inputValue);
    }

    return filtered;
  };

  const handleBlur = (event) => {
    const alreadyAvailable = selectedSkills.map((data) => data.skill_name);
    if (inputValue !== "" && alreadyAvailable.includes(inputValue)) {
      setIncludedSkill(true);
    } else {
      setIncludedSkill(false);
    }
  };

  const addSkillHandler = async (event) => {
    if (!includedSkill && inputValue !== "") {
      try {
        const addedSkill = await addSkill({
          skill_name: skills.skill_name,
          level: parseInt(skills.level),
          employee_id: employeeId,
          studio_id: studioId,
        }).unwrap();
        dispatch(addSkillToEmployee({ ...skills, id: addedSkill?.data[0].id }));
      } catch (err) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: `${err.data.message}`,
          })
        );
      } finally {
        setInputValue("");
        setSkills({ skill: "", level: 0 });
      }
    }
  };

  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      <Dialog
        open={openProfileEditModal}
        scroll="paper"
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "transparent",
            },
          },
        }}
        PaperProps={{
          style: {
            maxWidth: "480px",
          },
        }}
      >
        <Card className={`${classes.card} emp_edit_dialog`}>
          <Box className={classes.cardContainer}>
            <Typography variant="h5" sx={{ color: "white" }} padding={2}>
              Add Skill
            </Typography>
            <Button sx={{ color: "white" }} onClick={onHandleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Box className={classes.skillsField} padding={"1.5rem"}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Autocomplete
                freeSolo
                defaultValue={""}
                inputValue={inputValue}
                className={classes.field}
                onInputChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
                options={availableSkills}
                filterOptions={filterOptions}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Skill"
                    helperText={includedSkill ? "Skill already added" : " "}
                    FormHelperTextProps={{
                      style: {
                        color: "red",
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornmant:
                          isLoading || creating ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null,
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography className="skill-modal" fontSize={15}>
                Skill Expertise
              </Typography>
              <Rating
                className="hover-feedback"
                name="level"
                value={skills.level}
                size="medium"
                onChange={handleSkillChange}
                sx={{ justifyContent: "center", stroke: "gray" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "60px",
              }}
            >
              <Button
                variant="text"
                size="large"
                onClick={addSkillHandler}
                color="error"
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : isDeleting ? "Deleting..." : "Add"}
              </Button>
            </Box>
          </Box>
          <Box className={classes.skillContainer} padding={"0rem 1.5rem"}>
            <Typography className="title" variant="body1" fontWeight={500}>
              Skills{" "}
            </Typography>
            <Divider className="employee-devider" sx={{ width: "100%" }} />
            <Box
              sx={{
                height: "10rem",
                overflowY: "auto",
              }}
            >
              <Box className={classes.chipsWrap}>
                {selectedSkills.map((item, index) => (
                  <Chip
                    label={item.skill_name}
                    variant="outlined"
                    onDelete={() => handleDelete(index)}
                    key={item.id}
                    style={{
                      backgroundColor:
                        item.level > 4
                          ? "green"
                          : item.level >= 3
                          ? "orange"
                          : "blue",
                      color: "white",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box my={-2} padding={5} className={classes.buttonContainer}>
            <Button
              className={classes.closeButton}
              size="large"
              onClick={onHandleClose}
            >
              Close
            </Button>
            <Button
              className={classes.submitButton}
              size="large"
              onClick={() => {
                onHandleClose();
              }}
            >
              Save
            </Button>
          </Box>
        </Card>
      </Dialog>
    </div>
  );
}
