import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FaUser } from "react-icons/fa";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { MdEmail, MdWork } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FcDepartment } from "react-icons/fc";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  summarytab: {
    padding: "2rem",
  },
  summarytableft: {
    display: "flex",
    gap: "3rem",
  },
  summarytabright: {
    width: "100%",
  },
  studiodetails: {
    marginTop: "0.1rem !important",
    fontWeight: "bold !important",
    marginLeft: "0.5rem !important",
  },
  studiodetailsspan: {
    fontWeight: "normal",
    marginLeft: "0.5rem",
  },
  aboutstudio: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "justify",
    width: "100%",
  },
  studiopractices: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  modaluppercontent: {
    display: "flex",
    gap: "3rem",
    marginTop: "1rem",
    justifyContent: "space-around",
    marginLeft: "2rem",
  },
  modallowercontent: {
    marginTop: "1rem",
  },
  modalcontent: {
    marginTop: "-1.5rem",
    marginRight: "2rem",
  },
  uploadbtn: {
    height: 174,
    width: 175.5,
    borderRadius: "50% !important",
    border: "2px solid white",
    backgroundColor: "grey !important",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
  uploadavatarphoto: {
    position: "absolute !important",
    top: "23.5% !important",
    left: "20.9% !important",
  },
  avatar: {
    width: "1.5rem !important",
    height: "1.5rem !important",
  },
  typo: {
    marginBottom: "2rem",
    fontWeight: "400 !important",
    fontSize: "2rem",
  },
  tooltip: {
    backgroundColor: "white",
    color: "black",
  },
  modalbutton: {
    float: "right",
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  modal: {
    position: "absolute",
    top: "54%",
    left: "53%",
    transform: "translate(-50%, -50%)",
    width: 800,
    boxShadow: 24,
    borderRadius: "1rem",
    p: 4,
    padding: "1.5rem ",
  },
  card: {
    backgroundColor: "gray",
    minWidth: 70,
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  "@media (max-width: 900px)": {
    summarytab: {
      flexWrap: "wrap",
    },
    summarytableft: {
      marginTop: "0",
      marginLeft: "6rem",
      flexWrap: "wrap",
    },
    aboutstudio: {
      width: "25rem",
    },
    studiopractices: {
      width: "25rem",
      paddingLeft: "2rem",
    },
    typo: {
      fontSize: "2rem !important",
    },
    gridcontainer: {
      marginLeft: "-4rem !important",
    },
  },
  "@media (max-width: 768px)": {
    summarytab: {
      flexWrap: "wrap",
    },
    summarytableft: {
      marginTop: "0",
      marginLeft: "8rem",
      flexWrap: "wrap",
    },
    summarytabright: {
      width: "100%",
    },
    studiopractices: {
      width: "30rem",
      marginLeft: "2rem",
    },
    aboutstudio: {
      width: "26rem",
    },
    profilepic: {
      marginLeft: "1rem",
    },
    gridcontainer: {
      marginLeft: "-4rem !important",
    },
    gridchild: {
      width: "150px !important",
    },
    modal: {
      width: 600,
    },
    uploadavatarphoto: {
      top: "28.7% !important",
      left: "40.6% !important",
    },
  },
  "@media (max-width: 390px)": {
    summarytab: {
      flexWrap: "wrap",
    },
    summarytableft: {
      marginTop: "1rem",
      marginLeft: "-2.9rem",
      flexWrap: "wrap",
    },
    summarytabright: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        fontSize: "5rem !important",
      },
    },
    studiopractices: {
      width: "10rem",
      marginLeft: "-3rem",
    },
    aboutstudio: {
      width: "10rem",
      marginLeft: "-2.5rem",
    },
    typo: {
      fontSize: "1.5rem !important",
      marginBottom: "2rem !important",
      marginLeft: "-4rem !important",
    },
    profilepic: {
      marginLeft: "1.5rem",
    },
    gridcontainer: {
      marginLeft: "2rem !important",
    },
    modalcontainer: {},
    modal: {
      width: 350,
      overflow: "scroll",
      marginTop: "6rem",
      marginLeft: "-0.7rem",
    },
    modaluppercontent: {
      display: "block",
    },
    modalcontent: {
      marginLeft: "-2rem",
    },
    modaltypo: {
      fontSize: "1.5rem !important",
    },
    uploadavatarphoto: {
      top: "42.2% !important",
      left: "37.6% !important",
    },
  },
}));

function PracticeSummary(props) {
  console.log(props);
  
  console.log(props)
  const classes = useStyles();
  return (
    <Box className={`${classes.summarytab} `}>
      <Typography
        variant="h4"
        className={classes.typo}
        sx={{ marginBottom: "1rem" }}
        my={-2}
      >
        About
      </Typography>
      <Box className={`${classes.aboutstudio}`}>
        {props.summaryData.data?.description}
      </Box>
      <Typography
        variant="h4"
        sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        className={classes.typo}
      >
        Competencies
      </Typography>
      <Box className={`${classes.studiopractices}`}>
        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://uploads-ssl.webflow.com/5fdcd9ffc26d8060c8b6be80/61fafadcbcf829cbcb1cda3d_react.png"
            />
          }
        />

        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://www.pngrepo.com/png/303230/180/angular-icon-logo.png"
            />
          }
        />

        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://static.frontendmasters.com/assets/courses/2019-06-20-getting-started-javascript-v2/thumb%402x.jpg"
            />
          }
        />

        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://th.bing.com/th/id/OIP.SxLdQWNQAYN_T-XwLemm6wHaD_?rs=1&pid=ImgDetMain"
            />
          }
        />

        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://th.bing.com/th/id/OIP.d-cssZMmcDWJU_yKxt9abQHaFQ?rs=1&pid=ImgDetMain"
            />
          }
        />

        <Chip
          label="Cloud Computing"
          color="error"
          className={classes.chip}
          avatar={
            <Avatar
              className={classes.avatar}
              src="https://uploads-ssl.webflow.com/5fdcd9ffc26d8060c8b6be80/61fafadcbcf829cbcb1cda3d_react.png"
            />
          }
        />
      </Box>
    </Box>
  );
}

export default PracticeSummary;
