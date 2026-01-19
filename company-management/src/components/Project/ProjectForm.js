import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Box,
  Paper,
  FormHelperText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDebounce } from "../../hooks/Debounce";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { EmployeeFilterByName } from "../../services/employeeService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useAddProjectMutation } from "../../features/projectApiSlice";

const useStyles = makeStyles((theme) => ({
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
  cancelButton: {
    backgroundColor: "gray !important",
    marginRight: "1rem !important",
    "&:hover": {
      backgroundColor: "darkgray !important",
    },
  },
  gradientButton: {
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) !important",
    color: "white !important",
    "&:hover": {
      background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) !important",
      opacity: 0.9,
    },
  },
  customFormControle: {
    display: "flex",
    flexDirection: "row !important",
    gap: 10,
  },
  formHeader: {
    marginTop: "1.5rem !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "3px solid",
    borderImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) 1",
    paddingBottom: "1rem",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  backButton: {
    minWidth: "40px !important",
    width: "40px !important",
    height: "40px !important",
    padding: "0 !important",
    borderRadius: "50% !important",
  },
  drawerTitle: {
    color: "black",
    fontWeight: "500 !important",
  },
  closeButton: {
    color: "black !important",
  },
  textAreaStyle: {
    width: "100%",
    height: "100px !important",
    overflow: "auto !important",
    resize: "vertical",
  },
  fileList: {
    marginTop: "2rem",
    display: "grid",
    gap: "1rem",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "300px",
    padding: "0.5rem",
    borderRadius: "4px",
    backgroundColor: "#faf0e6",
  },
  fileName: {
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  removeButton: {
    marginLeft: "1rem",
  },
}));

const ProjectForm = ({ title, action }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loadList, setLoadList] = useState(false);
  const debouncedInput = useDebounce(inputValue);
  const [addProject, { isLoading }] = useAddProjectMutation();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const Timelines = [
    { label: "Planning", value: "planning" },
    { label: "Design", value: "design" },
    { label: "Development", value: "development" },
    { label: "Testing", value: "testing" },
    { label: "Maintenance", value: "maintenance" },
  ];

  const Durations = [
    { label: "6 months", value: "6 months" },
    { label: "1 year", value: "1 year" },
    { label: "2 years", value: "2 years" },
  ];

  const Roles = [
    { label: "Vice Precident" },
    { label: "Project Manager" },
    { label: "Team Lead" },
    { label: "Software Consultant" },
    { label: "Software Architect" },
    { label: "Software Engineer" },
    { label: "Automation Consultant" },
    { label: "Senior Software Consultant" },
    { label: "Senior Automation Consultant" },
    { label: "Senior Software Engineer" },
    { label: "UI/UX Designer" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      timeline: "",
      description: "",
      project_team: [
        { employee: null, role: "", billable: false, billable_percentage: "0" },
      ],
      projectDates: [dayjs(), null],
      duration: "",
      status: "",
      attachments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "project_team",
  });

  const watchStartDate = watch("projectDates", [
    dayjs(),
    dayjs().add(1, "day"),
  ])[0];

  const getSearchResult = async (value) => {
    try {
      const data1 = await EmployeeFilterByName(value);
      setEmployees(data1.data || []);
      setLoadList(false);
    } catch (error) {
      setLoadList(false);
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.message}` })
      );
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setValue("attachments", [...selectedFiles, ...files]);
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== fileIndex
    );
    setSelectedFiles(updatedFiles);
    setValue("attachments", updatedFiles);
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    setValue("duration", duration);
    if (watchStartDate) {
      let newEndDate = dayjs(watchStartDate);
      if (duration === "6 months") {
        newEndDate = newEndDate.add(6, "month");
      } else if (duration === "1 year") {
        newEndDate = newEndDate.add(1, "year");
      } else if (duration === "2 years") {
        newEndDate = newEndDate.add(2, "year");
      }
      setValue("projectDates", [watchStartDate, newEndDate]);
    }
  };

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    const projectTeam = data.project_team.map((member) => ({
      employee_id: member.employee.id,
      role: member.role,
      billable: member.billable,
      billable_percent: member.billable_percentage,
    }));
    formData.append("title", data.title);
    formData.append("timeline", data.timeline);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    formData.append("start_date", data.projectDates[0].toISOString());
    formData.append("end_date", data.projectDates[1].toISOString());
    formData.append("project_team", JSON.stringify(projectTeam));
    formData.append("file", data.attachments);
    formData.append("status", data.status);

    if (action === "Add") {
      try {
        await addProject(formData).unwrap();
        dispatch(
          showToast({
            severitySnackbar: "success",
            message: "Project added Successfully.",
          })
        );
        setTimeout(() => {
          navigate(-1);
        }, 3500);
      } catch (error) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: `${error.data.message}`,
          })
        );
      }
    }

    // if (action === "Edit") {
    //   try {
    //     console.log(request);
    //     const response = await fetch(`192.168.1.11:3000project/${projectDetails.projectId}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         tenant_code: tenantCode,
    //       },
    //       body: JSON.stringify(request),
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(response);
    //       console.log(data);
    //       handleSnakbar(response, "Project updated Successfully.");
    //       getAllProjects();
    //       onClose();
    //     } else {
    //       setOpenSnackbar(true);
    //       setMessage("Unable to update project.");
    //       setSeveritySnackbar("error");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     setOpenSnackbar(true);
    //     setMessage(`Something went wrong while updating project: ${error}`);
    //     setSeveritySnackbar("error");
    //   }
    // }
  };

  // const getProjectById = async () => {
  //   try {
  //     const response = await fetch(`GET_PROJECT_ID`, {
  //       method: "GET",
  //       headers: {
  //         tenant_code: tenantCode,
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setProject(data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (inputValue !== "") {
      getSearchResult(debouncedInput);
    }
  }, [debouncedInput]);

  // useEffect(() => {
  //   if (projectDetails) {
  //     getProjectById();
  //   }
  // }, []);

  return (
    <>
      <Box className={classes.formHeader}>
        <Box className={classes.headerContent}>
          <IconButton
            className={`${classes.gradientButton} ${classes.backButton}`}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={700}
            fontSize={"1.75rem"}
            className={classes.drawerTitle}
          >
            {action} {title}
          </Typography>
        </Box>
      </Box>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          padding: "2rem",
        }}
        className="emp-edit"
        noValidate
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Project Title is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={classes.field}
                  label="Project Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  disabled={action === "Edit"}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.field} error={!!errors.timeline}>
              <InputLabel id="select-timeline" required>
                Timeline
              </InputLabel>
              <Controller
                name="timeline"
                control={control}
                rules={{ required: "Timeline is required" }}
                render={({ field }) => (
                  <Select
                    labelId="select-timeline"
                    {...field}
                    label="Timeline"
                    required
                  >
                    {Timelines.map((timeline) => (
                      <MenuItem value={timeline.value} key={timeline.value}>
                        {timeline.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.timeline && (
                <FormHelperText>{errors.timeline.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
                minLength: {
                  value: 500,
                  message: "Description must be atleast 500 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={classes.field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Team Members</Typography>
              <Tooltip title="Add Team Member" placement="top">
                <IconButton
                  onClick={() =>
                    append({
                      employee: null,
                      role: "",
                      billable: false,
                      billable_percentage: "0",
                    })
                  }
                >
                  <AddCircleOutlineIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          {fields.map((item, index) => (
            <React.Fragment key={item.id}>
              <Grid item xs={12} sm={6} lg={3}>
                <Controller
                  name={`project_team.${index}.employee`}
                  control={control}
                  rules={{ required: "Employee is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      className={classes.field}
                      id={`employee-${index}`}
                      disableClearable={true}
                      options={employees}
                      // onInputChange={(event, newInputValue) => handleInputChange(newInputValue)}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      getOptionLabel={(option) =>
                        `${option.first_name} -${
                          option.designation
                            ? " " + option.designation + "-"
                            : ""
                        } ${option.studio_name} - (${option.email})`
                      }
                      renderOption={(props, option) => (
                        <ListItem {...props} key={option.id}>
                          <ListItemAvatar>
                            <Avatar
                              alt={option.first_name}
                              src={
                                option.image || "https://via.placeholder.com/40"
                              }
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={option.first_name}
                            secondary={`${option.designation} - ${option.studio_name} - ${option.email}`}
                          />
                        </ListItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee *"
                          placeholder="Select Employee"
                          onChange={(e) => {
                            handleInputChange(e.target.value),
                              setInputValue(e.target.value);
                          }}
                          error={!!errors.project_team?.[index]?.employee}
                          helperText={
                            errors.project_team?.[index]?.employee?.message
                          }
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>{loadList && <CircularProgress size={20} />}</>
                            ),
                            type: "search",
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <FormControl
                  className={classes.field}
                  error={!!errors.project_team?.[index]?.role}
                >
                  <InputLabel id={`role-select${index}`} required>
                    Role
                  </InputLabel>
                  <Controller
                    name={`project_team.${index}.role`}
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId={`role-select${index}`}
                        fullWidth
                        label="Role"
                        required
                      >
                        {Roles.map((role) => (
                          <MenuItem value={role.label} key={role.label}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.project_team?.[index]?.role && (
                    <FormHelperText>
                      {errors.project_team?.[index]?.role?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <FormControl
                  className={classes.field}
                  error={!!errors.project_team?.[index]?.billable}
                >
                  <InputLabel required>Billable</InputLabel>
                  <Controller
                    name={`project_team.${index}.billable`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        label="Billable"
                        defaultValue="no"
                      >
                        <MenuItem value={true}>Billable</MenuItem>
                        <MenuItem value={false}>Non Billable</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.project_team?.[index]?.billable && (
                    <FormHelperText>
                      {errors.project_team?.[index]?.billable?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Controller
                    name={`project_team.${index}.billable_percentage`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className={classes.field}
                        label="Billable Percentage (%)"
                        fullWidth
                        type="number"
                        disabled={
                          watch(`project_team.${index}.billable`) === false
                        }
                        defaultValue={
                          watch(`project_team.${index}.billable`) === false
                            ? "0"
                            : ""
                        }
                        required
                      />
                    )}
                  />
                  <Tooltip title="Remove Team Member" placement="top">
                    <IconButton
                      variant="text"
                      color="error"
                      onClick={() => remove(index)}
                    >
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Controller
              name="projectDates"
              control={control}
              rules={{ required: "Project dates are required" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    className={classes.field}
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!errors.projectDates,
                        helperText: errors.projectDates?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.field} error={!!errors.status}>
              <InputLabel id="project-status" required>
                Status
              </InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select
                    labelId="project-status"
                    {...field}
                    label="Status"
                    required
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>

                  </Select>
                )}
              />
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.field} error={!!errors.duration}>
              <InputLabel id="project-duration" required>
                Duration
              </InputLabel>
              <Controller
                name="duration"
                control={control}
                rules={{ required: "Duration is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="project-duration"
                    label="Duration"
                    onChange={(e) => handleDurationChange(e)}
                  >
                    {Durations.map((_) => (
                      <MenuItem value={_.value} key={_.value}>
                        {_.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.duration && (
                <FormHelperText>{errors.duration.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              className={classes.gradientButton}
            >
              Upload Files
              <input hidden multiple type="file" onChange={handleFileChange} />
            </Button>
            <Box className={classes.fileList}>
              {selectedFiles.map((file, index) => (
                <Box key={index} className={classes.fileItem}>
                  <Typography variant="body2" className={classes.removeButton}>
                    {file.name}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className={classes.cancelButton}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={classes.gradientButton}
                disabled={isLoading}
              >
                {action === "Add" ? "Save" : "Update"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProjectForm;
