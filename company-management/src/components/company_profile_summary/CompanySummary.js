import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Avatar,
  FormControl,
  Input,
  Modal,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@mui/icons-material/Person";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { MdEmail, MdWork } from "react-icons/md";
import GroupsIcon from "@mui/icons-material/Groups";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Button } from "@material-ui/core";
import CompanyEditModal from "../company_profile_edit_modal/CompanyEditModal";
import { useResolvedPath } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PlaceIcon from "@mui/icons-material/Place";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Summary from "./CompanySummary.json";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  summarytableft: {
    display: "flex",
    gap: "3rem",
  },
  companydetailsbox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  companydetails: {
    marginTop: "0.1rem !important",
    fontWeight: "500 !important",
    marginLeft: "0.5rem !important",
  },
  companydetailsspan: {
    fontWeight: "normal",
    marginLeft: "2.5rem",
    fontSize: "1rem",
  },
  modalButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  profilepic: {
    height: 180,
    width: 180
  },
  summaryCards: {
    height: "100%",
    borderRadius: "1rem !important",
  },
  gradientButton: {
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) !important",
    color: "white !important",
    "&:hover": {
      background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) !important",
      opacity: 0.9,
    },
  },
  uploadButton: {
    background: "transparent",
    height: 178,
    width: 178,
    borderRadius: "50%",
    border: "2px solid white",
  },
  uploadPic: {
    position: "absolute !important",
    top: "1.55rem",
    left: "3.05rem",
    opacity: "0",
    "&:hover": {
      opacity: "0.7",
    },
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
  leadersModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "60%",
    boxShadow: 24,
    p: 4,
    "& ::-webkit-scrollbar": {
        width: "10px",
      },
  
      "& ::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
  
      "& ::-webkit-scrollbar-thumb": {
        background: "#888",
      },
  
      "& ::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
  },
  leadersTitle: {
    display: "flex",
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) !important",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leadersList: {
    padding: "2%",
    height: "85%",
    overflowY: "scroll",
  },
  leadersName: {
    borderRadius: "1rem",
    marginBottom: "10px"
  },
  gridchild: {},
  "@media (max-width: 900px)": {
    summarytableft: {
      marginTop: "0",
      marginLeft: "6rem",
      flexWrap: "wrap",
    },
    typo: {
      fontSize: "2rem !important",
    },
    gridcontainer: {
      marginLeft: "-4rem !important",
    },
  },
  "@media (max-width: 768px)": {
    summarytableft: {
      marginTop: "0",
      marginLeft: "8rem",
      flexWrap: "wrap",
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
    uploadPic: {
        left: "12.05rem"
    },
  },
  "@media (max-width: 390px)": {
    summarytableft: {
      marginTop: "1rem",
      marginLeft: "-2.9rem",
      flexWrap: "wrap",
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
    uploadPic: {
        top:"2.5rem",
        left: "1rem"
    },
  },
}));

const CompanySummary = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { pathname } = useResolvedPath();
  const [openLeaders, setOpenLeaders] = useState(false);
  const handleOpenLeaders = () => setOpenLeaders(true);
  const handleCloseLeaders = () => setOpenLeaders(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      className="company_summary"
      sx={{
        margin: 0,
        maxWidth: "100% !important",
      }}
    >
      {pathname !== "/home/company/about" && (
        <>
          <Button
            variant="contained"
            className={`${classes.gradientButton} ${classes.modalButton}`}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <CompanyEditModal open={open} onClose={handleClose} />
        </>
      )}
      <Box className={`${classes.summarytableft} leftsummarytab`}>
        <Box className={classes.profilepic}>
          <Avatar
            alt="Remy Sharp"
            src="https://cdn.icon-icons.com/icons2/2550/PNG/512/user_circle_icon_152504.png"
            sx={{
              width: 180,
              height: 180,
              border: "3px solid #6d297b",
              borderRadius: '50%'
            }}
          />
          {
            pathname !== "/home/company/about" && (
                <FormControl className={classes.uploadPic}>
            <Input
              type="file"
              name="profilepic"
              id="profilePic"
              accept="image/*"
              disableUnderline={true}
              sx={{ display: "none" }}
            />
            <label htmlFor="profilePic">
              <Button
                component="span"
                variant="outlined"
                className={classes.uploadButton}
              >
                <AddAPhotoOutlinedIcon fontSize="large" color="secondary" />
              </Button>
            </label>
          </FormControl>
            )
          }
        </Box>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2.5, md: 3 }}
          my={-2}
          className={classes.gridcontainer}
        >
          <Grid
            className={classes.gridchild}
            item
            xl={3}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <CorporateFareIcon /> Company Name
              </Typography>
              <span className={`${classes.companydetailsspan}`}>
                {" "}
                Nashtech Global
              </span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={4}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <PersonIcon /> Company Type
              </Typography>
              <span className={`${classes.companydetailsspan}`}>
                Software Consultancy
              </span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={2}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box
              className={classes.companydetailsbox}
              style={{ marginLeft: "-2rem" }}
            >
              <Typography className={`${classes.companydetails}`}>
                <GroupsIcon /> Total Employees
              </Typography>
              <span className={`${classes.companydetailsspan}`}> 211</span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={3}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <PlaceIcon /> Location
              </Typography>
              <span className={`${classes.companydetailsspan}`}>
                {" "}
                London, UK
              </span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={3}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <PiIdentificationBadgeFill size={20} /> Company Code
              </Typography>
              <span className={`${classes.companydetailsspan}`}>054</span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={4}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <MdEmail size={20} /> Administraion Email
              </Typography>
              <span className={`${classes.companydetailsspan}`}>
                admin@nashtechglobal.com
              </span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={2}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box
              className={classes.companydetailsbox}
              style={{ marginLeft: "-2rem" }}
            >
              <Typography className={`${classes.companydetails}`}>
                <MdWork size={20} /> Total Projects
              </Typography>
              <span className={`${classes.companydetailsspan}`}> 10</span>
            </Box>
          </Grid>
          <Grid
            className={classes.gridchild}
            item
            xl={3}
            lg={6}
            md={12}
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              paddingBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Box className={classes.companydetailsbox}>
              <Typography className={`${classes.companydetails}`}>
                <CardMembershipIcon /> Subscription
              </Typography>
              <span className={`${classes.companydetailsspan}`}> Platinum</span>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {Summary[0].name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {Summary[0].about}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            className={`${classes.summaryCards} company_profile_card`}
            elevation={0}
          >
            <CardHeader title="Mission and Values" />
            <CardContent style={{marginTop: "-1.5rem"}}>
              <List sx={{
                listStyleType: 'disc',
                marginLeft: "1rem"
              }}>
                {Summary[0]["mission&values"].length > 0 ? (
                  Summary[0]["mission&values"].map((item, index) => (
                    <ListItem key={index} sx={{display: "list-item"}}>
                      <ListItemText primary={`${item}`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No mission or values provided." />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            className={`${classes.summaryCards} company_profile_card`}
            elevation={0}
          >
            <CardHeader title="Leadership Team" />
            <CardContent style={{marginTop: "-1.5rem"}}>
              <List sx={{
                listStyleType: 'disc',
                marginLeft: "1rem"
              }}>
                {Summary[0]["leaders"].length <= 5
                  ? Summary[0]["leaders"].map((member, index) => (
                      <ListItem key={index} sx={{display: "list-item"}}>
                        <ListItemText
                          primary={`${member.name}, ${member.designation}`}
                        />
                      </ListItem>
                    ))
                  : Summary[0]["leaders"].slice(0, 4).map((member, index) => (
                      <ListItem key={index} sx={{display: "list-item"}}>
                        <ListItemText
                          primary={`${member.name}, ${member.designation}`}
                        />
                      </ListItem>
                    ))}
              </List>
              {Summary[0]["leaders"].length > 5 ? (
                <>
                  <Button
                    onClick={handleOpenLeaders}
                    style={{
                        display: "flex",
                        // justifyContent: "flex-end",
                        float: "right",
                      color: "#6d297b",
                    }}
                  >
                    View More
                  </Button>
                  <Modal
                    open={openLeaders}
                    onClose={handleCloseLeaders}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    
                    <Box className={`${classes.leadersModal} leaders-modal`}>
                    <Box className={classes.leadersTitle}><Typography variant="h5" style={{color: "white"}}>Leadership Team</Typography><Button onClick={handleCloseLeaders} style={{color: "white"}}><CloseIcon /></Button></Box>
            
                      <List className={classes.leadersList}>
                        {Summary[0]["leaders"].map((member, index) => (
                          <ListItem className={`${classes.leadersName}  leaders-name`} key={index}>
                            <ListItemText
                              primary={`${member.name}, ${member.designation}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Modal>
                </>
              ) : (
                <></>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            className={`${classes.summaryCards} company_profile_card`}
            elevation={0}
          >
            <CardHeader title="Culture and Work Environment" />
            <CardContent style={{marginTop: "-1.5rem"}}>
              <Typography variant="body1">
                At Nashtech, we foster a culture of inclusivity, collaboration,
                and continuous learning. Our diverse team of talented
                professionals comes together to tackle complex challenges,
                inspire innovation, and deliver exceptional results. We believe
                in creating a supportive work environment where every individual
                is valued, respected, and empowered to reach their full
                potential.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            className={`${classes.summaryCards} company_profile_card`}
            elevation={0}
          >
            <CardHeader title="Organizational Structure" />
            <CardContent style={{marginTop: "-1.5rem"}}>
              <Typography variant="body1">
                NashTech operates across multiple business units, each
                specializing in distinct areas of expertise such as software
                development, cloud computing, cybersecurity, and digital
                marketing. Our organizational structure is designed to promote
                agility, flexibility, and seamless collaboration, enabling us to
                respond quickly to client needs and market trends.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanySummary;
