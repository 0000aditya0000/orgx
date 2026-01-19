import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";
import { useState } from "react";

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
    padding: "1.5rem",
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
    marginTop: "1rem !important",
    marginBottom: "1rem !important",
  },
  studiopractices: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
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
    top: "13.9rem",
    left: "24.1rem",
  },
  avatar: {
    width: "1.5rem !important",
    height: "1.5rem !important",
  },
  typo: {
    marginTop: "0rem !important",
  },
  tooltip: {
    backgroundColor: "white",
    color: "black",
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
    uploadavatarphoto: {
      top: "16.9rem",
      left: "29.55rem",
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

    uploadavatarphoto: {
      top: "17.1rem",
      left: "19.7rem",
    },
    uploadbtn: {
      width: 174,
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

    uploadavatarphoto: {
      top: "19.3rem !important",
      left: "9.3rem !important",
    },
    uploadbtn: {
      width: 174,
    },
  },
}));

function StudioSummary(props) {
  const classes = useStyles();

  return (
    <>
      <Box className={`${classes.summarytabright}`}>
        <Typography variant="h4" className={classes.typo}>
          About
        </Typography>
        <Box className={`${classes.aboutstudio}`}>{props.data}</Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          className={classes.typo}
        >
          Skill Matrix
        </Typography>
        <Box className={`${classes.studiopractices}`}>
          <Chip
            label="React"
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
            label="Angular"
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
            label="Javascript"
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
            label="Node"
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
            label="Nextjs"
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
    </>
  );
}

export default StudioSummary;
