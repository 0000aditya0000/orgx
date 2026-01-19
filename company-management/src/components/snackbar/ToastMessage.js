import React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../features/toastSlice";

const ToastMessage = () => {
  const dispatch = useDispatch();
  const { openSnackbar, severitySnackbar, message } = useSelector(
    (state) => state.toast
  );
  const handleClose = () => {
    dispatch(hideToast());
  };
  const action = (
    <React.Fragment>
      <Button color="#F5F6F8" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ top: "75px !important" }} 
    >
      <Alert
        onClose={handleClose}
        severity={severitySnackbar}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
