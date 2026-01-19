import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Divider,
  Box,
  TextField,
  Dialog,
  Card,
  Grid,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDebounce } from "../../hooks/Debounce";
import { EmployeeEmailCheck } from "../../services/employeeService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useUpdateEmployeeReportingMutation,
} from "../../features/employeeAPISlice";

const useStyle = makeStyles((theme) => ({
  field: {
    width: "100%",
    "& .MuiFormLabel-root": {
      color: "grey",
      "&.Mui-focused ": {
        color: "#310e68",
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
        borderColor: "#310e68",
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
    borderRadius: "inherit",
    height: "100%",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) no-repeat 0 0/cover",
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
    marginTop: "-1rem !important",
  },
  formGrid: {
    display: "flex !important",
    justifyContent: "center !important",
  },
  buttonGroup: {
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
}));

export default function EditModal({
  openProfileEditModal,
  onHandleClose,
  type,
  competencyData,
  onUpdateSuccess,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data,
    isLoading,
    isError,
    error: getEmployeeByIdError,
    refetch: refetchEmployee,
  } = useGetEmployeeByIdQuery(id);
  const [updateEmployee, { isLoading: updating }] = useUpdateEmployeeMutation();
  const [updateEmployeeReporting, { isLoading: updatingReporting }] = useUpdateEmployeeReportingMutation();
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicateEmailMsg, setDuplicateEmailMsg] = useState("");
  const [varifyingEmail, setVarifyingEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [competencyError, setCompetencyError] = useState(false);
  const [error, setError] = useState({
    name: false,
    designation: false,
    studio: false,
    gender: false,
    email: false,
    password: false,
  });
  const studio = ["Scala", "Frontend", "Java", "Scala2", "Springboot"];
  const rm = ["aditya", "Devansh", "Divyanshu", "Adam", "James"];
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    designation: "",
    role: "",
    studio: "",
    gender: "",
    phy_disabled: "",
    email: "",
    password: "",
    location: "",
    phone: "",
    marital_status: "",
    blood_group: "",
    pan_card: "",
    aadhaar_card: "",
    uan: "",
    personal_email: "",
    whatsapp: "",
    wordpress: "",
    github: "",
    bitbuket: "",
    work_phone: "",
    address: "",
    date: "2024-01-01",
    competency: "",
    rm: "",
  });

  let gender = ["Female", "Male", "Other"];

  let martialStatus = ["Single", "Married", "Widow", "Separated"];

  let bloodGroup = ["A+", "B+", "0+", "+AB", "-AB", "-B"];

  let handicap = ["Yes", "No"];

  let nationality = ["India", "UK", "US"];

  const deboncedEmail = useDebounce(formData.email);
  const [primaryEmail, setPrimaryEmail] = useState("");

  const duplicateEmailCheck = async (value) => {
    setVarifyingEmail(true);
    try {
      const data = await EmployeeEmailCheck(value);
      setDuplicateEmailMsg(data.message);
      console.log(data);
      if (data.message === "Employee can be created with this email") {
        setDuplicateEmail(false);
        setVarifyingEmail(false);
      } else if (data.message === "Employee with this email already exist") {
        setDuplicateEmail(true);
        setVarifyingEmail(false);
      }
    } catch (err) {
      setDuplicateEmailMsg(err.message);
      setDuplicateEmail(true);
      setVarifyingEmail(false);
    }
  };

  const validateRequiredField = (name, value) => {
    if (value === null || value === "") {
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
        if (value === primaryEmail) {
          setDuplicateEmail(false);
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const requiredFields = [
      "name",
      "designation",
      "studio",
      "gender",
      "email",
      "password",
    ];
    setFormData({
      ...formData,
      [name]: value,
    });

    if (requiredFields.includes(name)) {
      validateRequiredField(name, value);
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    validateRequiredField(name, value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    // Handle adminDetails type separately
    if (type === "adminDetails") {
      // Validate competency and reporting manager
      if (!formData.competency || !formData.rm) {
        setCompetencyError(!formData.competency);
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: "Please select both Competency and Reporting Manager.",
          })
        );
        return;
      }

      const reportingData = {
        competency: typeof formData.competency === 'object' 
          ? formData.competency.competency_name 
          : formData.competency,
        reporting_manager: formData.rm,
      };

      try {
        await updateEmployeeReporting({id, data: reportingData}).unwrap();
        dispatch(
          showToast({
            severitySnackbar: "success",
            message: "Employee reporting details updated successfully.",
          })
        );
        // Refetch employee data to update the UI
        refetchEmployee();
        // Call parent's refetch callback if provided
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
        onHandleClose();
      } catch (error) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: `${error.data?.message || "Failed to update employee reporting details."}`,
          })
        );
      }
      return;
    }

    // Handle other types (personalDetails, Contact Details)
    const updatedData = {
      first_name: formData.name,
      last_name: formData.last_name,
      designation: formData.designation,
      role: formData.role,
      studio_name: formData.studio,
      gender: formData.gender,
      phy_disable: formData.phy_disabled,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location,
      marital_status: formData.marital_status,
      blood_group: formData.blood_group,
      pan_card: formData.pan_card,
      aadhaar_card: formData.aadhaar_card,
      uan: formData.uan,
      personal_email: formData.personal_email,
      whatsapp: formData.whatsapp,
      wordpress: formData.wordpress,
      github: formData.github,
      bitbuket: formData.bitbuket,
      work_phone: formData.work_phone,
      address: formData.address,
    };
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
      !invalidEmail;

    if (valid) {
      try {
        await updateEmployee({id, data: updatedData}).unwrap();
        dispatch(
          showToast({
            severitySnackbar: "success",
            message: "Employee updated successfully.",
          })
        );
      } catch (error) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: `${error.data?.message}`,
          })
        );
      } finally {
        onHandleClose();
      }
    }
  };

  useEffect(() => {
    if (deboncedEmail !== primaryEmail && !invalidEmail) {
      duplicateEmailCheck(deboncedEmail);
    }
  }, [deboncedEmail]);

  useEffect(() => {
    if (data) {
      let employee = data?.data;
      
      // Find matching competency object from competencyData
      let initialCompetency = "";
      if (employee.competency && competencyData && competencyData.length > 0) {
        const matchedCompetency = competencyData.find(
          (comp) => comp.competency_name === employee.competency || comp.id === employee.competency
        );
        if (matchedCompetency) {
          initialCompetency = matchedCompetency;
        } else if (employee.competency) {
          // If not found, use the string value directly
          initialCompetency = employee.competency;
        }
      } else if (employee.studio_name && competencyData && competencyData.length > 0) {
        // Fallback to studio_name if competency is not available
        const matchedCompetency = competencyData.find(
          (comp) => comp.competency_name === employee.studio_name
        );
        if (matchedCompetency) {
          initialCompetency = matchedCompetency;
        }
      }
      
      setFormData({
        name: employee.first_name || "",
        last_name: employee.last_name || "",
        designation: employee.designation || "",
        role: employee.role || "",
        studio: employee.studio_name || "",
        gender: employee.gender || "",
        phy_disabled: employee.phy_disable || "",
        email: employee.email || "",
        password: employee.password || "",
        location: employee.location || "",
        phone: employee.phone || "",
        marital_status: employee.merital_status || "",
        blood_group: employee.blood_group || "",
        pan_card: employee.pan_card || "",
        aadhaar_card: employee.aadhaar_card || "",
        uan: employee.uan || "",
        personal_email: employee.personal_email || "",
        whatsapp: employee.whatsapp || "",
        wordpress: employee.wordpress || "",
        github: employee.github || "",
        bitbuket: employee.bitbuket || "",
        work_phone: employee.work_phone || "",
        address: employee.address || "",
        competency: initialCompetency,
        rm: employee.reporting_manager || "",
      });
      setPrimaryEmail(employee.email);
    }

    if (isError) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `${getEmployeeByIdError.data?.message}`,
        })
      );
    }
  }, [id, isError, data, competencyData]);

  return (
    <Dialog
      open={openProfileEditModal}
      maxWidth={"lg"}
      PaperProps={{ sx: { borderRadius: "1rem", width: 600 } }}
      scroll="paper"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "transparent",
          },
        },
      }}
      data-testid="edit-modal"
    >
      <Card className={`${classes.body} emp_edit_dialog`}>
        <Box className={classes.modalHeader}>
          <Typography className={classes.modalTitle} variant="h5" padding={2}>
            {type == "personalDetails"
              ? "Personal Detail"
              : type == "Contact Details"
              ? "Contact Details"
              : "Employee Details"}
          </Typography>
          <Button className={classes.closeButton} onClick={onHandleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{ color: "white" }} />
        {type == "personalDetails" && (
          <Box className={classes.formBody} padding={5}>
            <Grid className={classes.formGrid} container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  required
                  label="First Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={error.name ? `Please Enter Full Name.` : " "}
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Last Name"
                  color="primary"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Location"
                  color="primary"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Nationality"
                  select
                  helperText={""}
                >
                  {nationality.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                >
                  {gender.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Martial Status"
                  select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  helperText={" "}
                >
                  {martialStatus.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Blood Group"
                  select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  helperText={" "}
                >
                  {bloodGroup.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Physically Handicap"
                  select
                  name="phy_disabled"
                  value={formData.phy_disabled}
                  onChange={handleChange}
                  helperText={" "}
                >
                  {handicap.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Aadhar Card"
                  color="primary"
                  name="aadhaar_card"
                  value={formData.aadhaar_card}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="PanCard Number"
                  color="primary"
                  name="pan_card"
                  value={formData.pan_card}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {type == "Contact Details" && (
          <Box className={classes.formBody} my={3} padding={5}>
            <Grid className={classes.formGrid} container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Work Email"
                  color="primary"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    error.email
                      ? `Please Enter Email.`
                      : invalidEmail
                      ? `Please Enter a Valid Email`
                      : duplicateEmail
                      ? duplicateEmailMsg
                      : " "
                  }
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {error.email ? (
                          " "
                        ) : invalidEmail ? (
                          " "
                        ) : varifyingEmail ? (
                          <CircularProgress size={20} />
                        ) : !duplicateEmail ? (
                          <CheckCircleOutlineIcon color="success" />
                        ) : (
                          <CancelOutlinedIcon color="error" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Personal Email"
                  color="primary"
                  name="personal_email"
                  value={formData.personal_email}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>
              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Phone Number"
                  color="primary"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>
              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Github Id"
                  color="primary"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Whatsapp Number"
                  color="primary"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Bitbucket Id"
                  color="primary"
                  name="bitbuket"
                  value={formData.bitbuket}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>
              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Wordpress Id"
                  color="primary"
                  name="wordpress"
                  value={formData.wordpress}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>

              <Grid item my={-2} lg={6} md={6} sm={12} xs={12}>
                <TextField
                  className={classes.field}
                  label="Work Phone"
                  color="primary"
                  name="work_phone"
                  value={formData.work_phone}
                  onChange={handleChange}
                  helperText={" "}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {type == "adminDetails" && (
          <Box className={classes.formBody} padding={5}>
            <Grid className={classes.formGrid} container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  required
                  select
                  label="Competency"
                  name="competency"
                  value={formData.competency || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={competencyError ? `Please Enter Competency` : " "}
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      marginLeft: "0",
                      marginTop: "5px",
                    },
                  }}
                >
                  {competencyData && competencyData.length > 0 ? (
                    competencyData.map((option) => (
                      <MenuItem value={option} key={option.id || option.competency_name}>
                      {option.competency_name}
                    </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No competencies available</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.field}
                  required
                  select
                  label="Reporting Manager"
                  color="primary"
                  name="rm"
                  value={formData.rm}
                  onChange={handleChange}
                  helperText={" "}
                >
                  {rm.map((option) => (
                    <MenuItem value={option} key={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        )}
        <Box my={-8} className={classes.buttonGroup} padding={5}>
          <Button
            className={classes.cancelButton}
            size="large"
            onClick={onHandleClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.saveButton}
            size="large"
            onClick={handleUpdate}
            disabled={updating || updatingReporting}
          >
            Update
          </Button>
        </Box>
      </Card>
    </Dialog>
  );
}
