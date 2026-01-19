import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  box: {
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
  notificationHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    padding: "7px",
    borderTopRightRadius: "4px !important",
    borderTopLeftRadius: "4px !important",
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "10px",
    height: "400px",
    overflow: "auto",
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
  notificationCard: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    justifyContent: "space-between",
    gap: "25px",
  },
  notificationAvatar: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  notificationCardData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
const style = {
  position: "absolute",
  top: "51%",
  left: "83%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none !important",
  borderRadius: "5px !important",
};

export default function NotificationModal({ openModal, closeModal }) {
  const classes = useStyles();
  const notificationData=[
    {
      title:" Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time:"12:30 pm",
    },
    {
      title:" Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time:"12:30 pm",
    },
    {
      title:" Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time:"12:30 pm",
    },
    {
      title:" Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time:"12:30 pm",
    },
    {
      title:" Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      time:"12:30 pm",
    },
  ]
  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <Box sx={style} className="employee-dashboard-card">
          <Box sx={{ boxShadow: "1px 1px 10px gray" }}>
            <Box className={classes.notificationHeader}>
              <Typography sx={{ color: "white" }} variant="h6">
                Notification
              </Typography>
              <IconButton sx={{ color: "white" }} onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className={classes.notificationContainer}>
             {
              notificationData.map((data)=>(
                <Box key={data.id}>
                <Box className={classes.notificationCard} >
                <Box
                  className={`employee-dashboard-logo-border ${classes.notificationAvatar}`}
                >
                  <GroupsIcon />
                </Box>
                <Box className={classes.notificationCardData}>
                  <Typography variant="p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                  <Typography fontSize={10}>12:30 pm</Typography>
                </Box>
              </Box>
              <Divider className="employee-dashboard-divider" />
                </Box>
              ))
             }
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
