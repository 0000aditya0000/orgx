import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CloseIcon from "@mui/icons-material/Close";

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyles = makeStyles((theme) => ({
  dialogue: {
    "& .MuiPaper-root": { borderRadius: "1rem" },
  },
  field: {
    width: "100%",
    "& .MuiInputBase-root": {
      color: "grey",
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
}));

export const AttendanceModal = ({ open, onClose }) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [note, setNote] = useState("");
  var requestBody = null;

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = () => {
    requestBody = {
      empId: 1254,
      startDate: value[0].toISOString(),
      endDate: value[1].toISOString(),
      note: note,
    };
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog
      className={classes.dialogue}
      open={open}
      onClose={handleCancel}
      maxWidth={800}
    >
      <DialogTitle className={classes.dialogueHeader} variant="h4">
        Work From Home
        <IconButton sx={{ color: "white" }} onClick={handleCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangeCalendar
            className="calender"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ "& div[style]": { display: "none" } }}
            data-testid="mui-daterangepicker"
          />
        </LocalizationProvider>
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
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.cancelButton}
          onClick={handleCancel}
          variant="contained"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="error">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
