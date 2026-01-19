import {
  Box,
  Button,
  Card,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDebounce } from "../../hooks/Debounce";
import { DrawerWrapper } from "../drawerWrapper/DrawerWrapper";
import { EmployeeEmailCheck } from "../../services/employeeService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import {
  useAddEmployeeMutation,
  useGetDesignationsQuery,
} from "../../features/employeeAPISlice";
import { useGetAllProjectsQuery } from "../../features/projectApiSlice";

const useStyle = makeStyles((theme) => ({
  field: {
    width: "100%",
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
  body: {
    width: "40rem",
    height: "100%",
    overflowY: "auto",
    paddingTop: ".8rem !important",
    borderRadius: "0px !important",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  modalTitle: {
    color: "white",
    fontWeight: "500 !important",
  },
  closeButton: {
    color: "white !important",
  },
  formBody: {
    display: "flex !important",
    justifyContent: "center !important",
  },
  formGrid: {
    display: "flex !important",
    justifyContent: "center !important",
    gap: "0.8rem !important",
  },
  buttonGroup: {
    position: "absolute",
    bottom: "0",
    right: "0",
    display: "flex !important",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: "3px !important",
  },
  cancelButton: {
    backgroundColor: "grey !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "grey !important",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  saveButton: {
    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
    color: "white !important",

    "&:hover ": {
      backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  passwordError: {
    display: "block",
    color: "red",
    marginTop: "5px !important",
    fontSize: "0.75rem !important",
  },
}));

export const AddEmployeeDrawr = ({
  openProfileEditModal,
  onHandleClose,
  isUpdated,
  studio,
}) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  let gender = [
    {
      label: "Female",
    },
    {
      label: "Male",
    },
    {
      label: "Other",
    },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [duplEmail, setDuplEmail] = useState(false);
  const [duplEmailMsg, setDuplEmailMsg] = useState("");
  const [varifyingEmail, setVarifyingEmail] = useState(false);

  const [error, setError] = useState({
    name: false,
    designation: false,
    studio: false,
    project: false,
    gender: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    studio: "",
    project: "",
    gender: "",
    email: "",
    password: "",
  });
  const deboncedEmail = useDebounce(formData.email);
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const {
    data: designationsData,
    isLoading: gettingDesignations,
    isError: designationsError,
    error: designationError,
  } = useGetDesignationsQuery();

  const {
    data: projectsData,
    isLoading: gettingProjects,
    isError: projectsError,
    error: projectError,
  } = useGetAllProjectsQuery();

  // Remove dummy projects data and use the actual data from API
  let projects = [];
  projects = projectsData?.data || [];

  useEffect(() => {
    if (projectsError) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: projectError?.data?.message || "Failed to load projects",
        })
      );
    }
  }, [projectsError, projectError, dispatch]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateRequiredField(name, value);
  };

  const duplicateEmail = async (value) => {
    setVarifyingEmail(true);
    try {
      const data = await EmployeeEmailCheck(value);
      setDuplEmailMsg(data.message);
      if (data.message === "Employee can be created with this email") {
        setDuplEmail(false);
        setVarifyingEmail(false);
      } else if (data.message === "Employee with this email already exist") {
        setDuplEmail(true);
        setVarifyingEmail(false);
      }
    } catch (err) {
      setDuplEmailMsg(err.message);
      setDuplEmail(true);
      setVarifyingEmail(false);
    }
  };

  const validateRequiredField = (name, value) => {
    if (value === null || value === "" || (name === "name" && value.trim().length < 3)) {
      setError((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
    if (name === "email") {
      const emailRegex =
        /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
      if (!emailRegex.test(value)) {
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    }
    if (name === "password") {
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passRegex.test(value)) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
      }
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    validateRequiredField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      name: formData.name === "",
      designation: formData.designation === "",
      studio: formData.studio === "",
      gender: formData.gender === "",
      email: formData.email === "",
      password: formData.password === "",
    });
    const valid =
      Object.values(error).reduce((acc, curr) => acc && curr === false, true) &&
      !invalidPassword &&
      !invalidEmail &&
      !duplEmail;
    if (valid) {
      const newData = {
        first_name: formData.name,
        designation: formData.designation,
        role: "employee",
        studio_name: formData.studio,
        project_id: formData.project || null,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
      };
      try {
        await addEmployee(newData).unwrap();
        dispatch(
          showToast({
            severitySnackbar: "success",
            message: "Employee Added Successfully!!",
          })
        );
        isUpdated();
      } catch (err) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: `${err.data.message}`,
          })
        );
      } finally {
        onHandleClose();
      }
    } else {
      const allFalse = Object.values(error).reduce(
        (acc, curr) => acc || curr === false,
        true
      );
      if (allFalse) {
        setError({
          name: formData.name === "",
          designation: formData.designation === "",
          studio: formData.studio === "",
          gender: formData.gender === "",
          email: formData.email === "",
          password: formData.password === "",
        });
      } else {
        setError((prev) => ({
          ...prev,
        }));
      }
    }
  };

  useEffect(() => {
    if (!invalidEmail && formData.email !== "") {
      duplicateEmail(deboncedEmail);
    }
  }, [deboncedEmail]);

  let designation = [];
  if (designationsData) {
    designation = designationsData.data;
  }

  return (
    <>
      <DrawerWrapper
        open={openProfileEditModal}
        onHandleClose={onHandleClose}
        title={"Employee"}
        action={"Add"}
      >
        <Card className={`${classes.body} emp_edit_dialog`}>
          <Box className={classes.formBody} padding={5}>
            <Grid className={classes.formGrid} container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  required
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={error.name ? formData.name.trim() === "" ? "Please Enter Full Name." : "Name must be at least 3 characters." : " "}
                    FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  select
                  required
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    error.designation
                      ? `Please Enter Designation.`
                      : designationsError
                      ? `${designationError.data.message}`
                      : gettingDesignations
                      ? "Fetching All Designations"
                      : " "
                  }
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                >
                  {designation.map((option) => (
                    <MenuItem value={option.title}>{option.title}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  select
                  required
                  label="Competency"
                  name="studio"
                  value={formData.studio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={error.studio ? `Please Enter Studio.` : " "}
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                >
                  {studio.map((option) => (
                    <MenuItem value={option.competency_name}>
                      {option.competency_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  select
                  label="Project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.projectId} value={project.projectId}>
                      {project.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  label="Gender"
                  select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={error.gender ? `Please Enter Gender.` : " "}
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                  required
                >
                  {gender.map((option) => (
                    <MenuItem value={option.label}>{option.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  type="email"
                  required
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    error.email
                      ? `Please Enter Email.`
                      : invalidEmail
                      ? `Please Enter a Valid Email`
                      : duplEmail
                      ? duplEmailMsg
                      : " "
                  }
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {formData.email === "" ? (
                          ""
                        ) : error.email ? (
                          " "
                        ) : invalidEmail ? (
                          " "
                        ) : varifyingEmail ? (
                          <CircularProgress size={20} />
                        ) : !duplEmail ? (
                          <CheckCircleOutlineIcon color="success" />
                        ) : (
                          <CancelOutlinedIcon color="error" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
              <TextField
                  className={classes.field}
                  type={showPassword ? "text" : "password"}
                  required
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    error.password
                      ? `Please Enter Password.`
                      : formData.password.length < 8 && formData.password !== ""
                      ? `Password must be 8 characters long`
                      : invalidPassword
                      ? `Password must have at least one number, one uppercase, one lowercase, and a special character.`
                      : " "
                  }
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true, // this makes the label sticky
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onBlur={handleBlur}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "gray" }} />
                          ) : (
                            <Visibility sx={{ color: "gray" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />


              </Grid>
            </Grid>
          </Box>
          <Box my={-8} className={classes.buttonGroup} padding={3}>
            <Button
              className={classes.cancelButton}
              onClick={onHandleClose}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              className={classes.saveButton}
              onClick={handleSubmit}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Card>
      </DrawerWrapper>
    </>
  );
};
