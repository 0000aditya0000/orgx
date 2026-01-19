import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { LeaveModal } from "./LeaveModal";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  leaveControleRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    borderRadius: ".5rem",
    gap: 10,
  },
  leaveRequestButton: {
    height: "50px",
    width: "150px",
    borderRadius: ".5rem",
  },
}));

export const LeaveControl = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Paper
      className={`${classes.leaveControleRoot} paperclass`}
      elevation={0}
    >
      <Button
      className={classes.leaveRequestButton}
        variant="contained"
        color="error"
        onClick={handleModalOpen}
      >
        Request Leave
      </Button>
      <LeaveModal open={modalOpen} onClose={handleModalClose} />
      <Button color="info">
        <IconButton>
          <InfoOutlinedIcon color="info" />
        </IconButton>
        Leave Policy Explaination
      </Button>
    </Paper>
  );
};
