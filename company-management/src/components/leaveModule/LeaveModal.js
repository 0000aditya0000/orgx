import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { EmployeeFilterByName } from "../../services/employeeService";

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyles = makeStyles((theme) => ({
  dialogue: {
    "& .MuiPaper-root": { borderRadius: "0.5rem" },
  },
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
  dialogueHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "red",
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#999999 !important",
    marginRight: "10px !important",
    "&:hover": {
      backgroundColor: "gray !important",
    },
  },

  customGroup: {
    padding: "5px",
    width: "max-content",
    "& button": {
      color: "gray",
    },
    "& .Mui-disabled": {
      backgroundColor: "red !important",
      color: "white !important",
    },
  },
  customFormControle: {
    display: "flex",
    flexDirection: "row !important",
    gap: 10,
  },
  leaveFormContainer: { display: "flex", flexDirection: "row", gap: 10 },
  leaveFormSide: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: "2rem",
    width: "20rem",
  },
  leaveDays: { color: "#4E8DB9", fontWeight: 500 },
  leaveDialogeAction: { padding: "24px !important" },
}));

export const LeaveModal = ({ open, onClose }) => {
  const classes = useStyles();
  const tenantCode = localStorage.getItem("tenant_code");
  const [employees, setEmployees] = useState([]);
  const [value, setValue] = useState([]);
  const [note, setNote] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [customLeave, setCustomLeave] = useState(false);
  const [leaveCount, setLeaveCount] = useState(0);
  const [loadList, setLoadList] = useState(false);
  const [leaveDaysType, setLeaveDaysType] = useState({
    start: "full",
    end: "full",
  });
  var requestBody = null;

  var leaveType = [
    {
      label: "Earned Leave",
    },
    {
      label: "Sick Leave",
    },
    {
      label: "Comp Offs",
    },
    {
      label: "Optional Leaves",
    },
  ];

  let timeoutId;

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
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const debouncedSearch = debounce(getSearchResult, 3000);

  const handleInputChange = (value) => {
    setLoadList(true);
    debouncedSearch(value);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleEmployees = (event, value) => {
    setSelectedEmployees(value);
  };

  const handleLeaveDaysTypeChange = (event) => {
    const { name, value } = event.target;
    setLeaveDaysType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateLeaveDays = (start, end, leaveDaysType) => {
    if (!start || !end) return 0;

    const totalDays = dayjs(end).diff(start, "day") + 1;
    let leaveDays = totalDays;

    if (leaveDaysType.start === "half") leaveDays -= 0.5;
    if (leaveDaysType.end === "half") leaveDays -= 0.5;

    return leaveDays;
  };

  const handleSubmit = () => {
    const leaveDays = calculateLeaveDays(value[0], value[1], leaveDaysType);

    requestBody = {
      empId: 1254,
      startDate: value[0].toISOString(),
      endDate: value[1].toISOString(),
      note: note,
      emmployees: selectedEmployees,
      leaveDays,
    };

    onClose();
  };

  const handleCustom = () => {
    setCustomLeave(!customLeave);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setCustomLeave(false);
    const leaveDays = calculateLeaveDays(
      newValue[0],
      newValue[1],
      leaveDaysType
    );
    setLeaveCount(leaveDays);
  };

  useEffect(() => {
    if (value[0] && value[1]) {
      const leaveDays = calculateLeaveDays(value[0], value[1], leaveDaysType);
      setLeaveCount(leaveDays);
    }
  }, [leaveDaysType, value]);

  return (
    <>
      <Dialog
        className={classes.dialogue}
        open={open}
        onClose={handleCancel}
        maxWidth={800}
      >
        <DialogTitle className={classes.dialogueHeader} variant="h4">
          Request Leave
          <IconButton sx={{ color: "white" }} onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.leaveFormContainer}>
            <Box className={classes.leaveFormSide}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangeCalendar
                  className="calender"
                  value={value}
                  onChange={handleDateChange}
                  calendars={1}
                  sx={{
                    "& div[style='position: absolute; pointer-events: none; color: rgba(130, 130, 130, 0.62); z-index: 100000; width: 100%; text-align: center; bottom: 50%; right: 0px; letter-spacing: 5px; font-size: 24px;']":
                      { display: "none" },
                  }}
                />
              </LocalizationProvider>
              {!value[0] && !value[1] ? (
                <small style={{ color: "red" }}>
                  <sup>*</sup>Choose dates.
                </small>
              ) : !value[1] ? (
                <small style={{ color: "red" }}>
                  <sup>*</sup>Choose an end date.
                </small>
              ) : null}
              {value[0] && value[1] && (
                <ButtonGroup className={classes.customGroup}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCustom}
                    disabled={!customLeave}
                  >
                    Full Day
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCustom}
                    disabled={customLeave}
                  >
                    Custom
                  </Button>
                </ButtonGroup>
              )}
              {customLeave && (
                <FormControl
                  component="fieldset"
                  className={classes.customFormControle}
                >
                  {dayjs(value[0]).isSame(value[1], "day") ? (
                    <TextField
                      className={classes.field}
                      label={`${new Date(
                        value[0].toISOString()
                      ).toLocaleDateString()}`}
                      select
                      name="start"
                      value={leaveDaysType.start}
                      onChange={handleLeaveDaysTypeChange}
                      fullWidth
                    >
                      <MenuItem value="full">Full Day</MenuItem>
                      <MenuItem value="half">Half Day</MenuItem>
                    </TextField>
                  ) : (
                    <>
                      <TextField
                        className={classes.field}
                        label={`${new Date(
                          value[0].toISOString()
                        ).toLocaleDateString()}`}
                        select
                        name="start"
                        value={leaveDaysType.start}
                        onChange={handleLeaveDaysTypeChange}
                        fullWidth
                      >
                        <MenuItem value="full">Full Day</MenuItem>
                        <MenuItem value="half">Half Day</MenuItem>
                      </TextField>
                      <TextField
                        className={classes.field}
                        label={`${new Date(
                          value[1].toISOString()
                        ).toLocaleDateString()}`}
                        select
                        name="end"
                        value={leaveDaysType.end}
                        onChange={handleLeaveDaysTypeChange}
                        fullWidth
                      >
                        <MenuItem value="full">Full Day</MenuItem>
                        <MenuItem value="half">Half Day</MenuItem>
                      </TextField>
                    </>
                  )}
                </FormControl>
              )}
            </Box>
            <Box className={classes.leaveFormSide} mt={6}>
              <TextField
                className={classes.field}
                label="Leave Type"
                select
                name="leaveType"
              >
                {leaveType.map((option) => (
                  <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
              </TextField>
              <small className={classes.leaveDays}>
                <InfoOutlinedIcon fontSize="small" color="primary" />
                {` You are requesting for ${
                  leaveCount <= 1 ? leaveCount + " day" : leaveCount + " days"
                } leave.`}
              </small>

              <TextField
                className={classes.field}
                label="Note"
                multiline
                rows={4}
                value={note}
                onChange={handleNoteChange}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ mt: 2 }}
                required
              />
              <Autocomplete
                multiple
                id="tags-filled"
                className={classes.field}
                options={employees}
                getOptionLabel={(option) =>
                  `${option.first_name} - ${option.designation} (${option.id})`
                }
                filterSelectedOptions
                value={selectedEmployees}
                onChange={handleEmployees}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      variant="outlined"
                      label={`${option.first_name}`}
                      avatar={
                        <Avatar
                          alt={option.first_name}
                          src={option.image || "https://via.placeholder.com/40"}
                        />
                      }
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <ListItem {...props} key={option.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={option.first_namename}
                        src={option.image || "https://via.placeholder.com/40"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={option.first_name}
                      secondary={`${option.designation}, Studio: ${option.studio_name}`}
                    />
                  </ListItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>{loadList && <CircularProgress size={20} />}</>
                      ),
                      type: "search",
                    }}
                    label="Notify"
                    placeholder="Add Collegue"
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={classes.leaveDialogeAction}>
          <Button
            className={classes.cancelButton}
            onClick={handleCancel}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="error"
            disabled={!note || !leaveType}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
