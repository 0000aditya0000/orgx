import { Box, Button, Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
  },
  drawerTitle: {
    color: "white",
    fontWeight: "500 !important",
  },
  closeButton: {
    color: "white !important",
  },
}));

export const DrawerWrapper = ({
  open,
  onHandleClose,
  title,
  action,
  children,
}) => {
  const classes = useStyles();
/* istanbul ignore next */
  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      return;
    }
    onHandleClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      transitionDuration={1000}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <Box className={classes.drawerHeader}>
        <Typography className={classes.drawerTitle} variant="h5" padding={2}>
          {action} {title}
        </Typography>
        <Button className={classes.closeButton} onClick={onHandleClose}>
          <CloseIcon />
        </Button>
      </Box>
      {children}
    </Drawer>
  );
};
