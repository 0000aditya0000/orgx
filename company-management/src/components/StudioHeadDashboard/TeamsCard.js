import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
}));

function TeamsCard(props) {
  const navigate  = useNavigate();
  const classes = useStyle();
  return (
    <Box>
      <Box className={`${classes.root} paperclass2`}>
        <Box className={classes.cardContent}>
          <Avatar
            alt="Remy Sharp"
            src={props.avatar}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography className="title" variant="h6">{props.name}</Typography>
            <Typography className="title" sx={{ fontSize: "0.9rem" }}>
              {props.designation}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={()=>navigate("/home/company/employee/3")}>
          <LaunchOutlinedIcon className="title" fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TeamsCard;
