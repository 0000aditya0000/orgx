import { Button, Typography, Divider, Box, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import { makeStyles } from "@material-ui/core";
import EmployeeSkills from "./EmployeeSkills";
import { useResolvedPath } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  card: {
    backgroundColor: "gray",
    minWidth: 70,
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  about: {
    padding: 18,
  },
  cardsHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function Profile({ employee_data }) {
  const classes = useStyle();
  const pathName = useResolvedPath();
  const parts = pathName.pathname.split("/");
  const basePath = parts.slice(0, -1).join("/");
  const [data, setData] = useState({});
  const [openProfileEditModal, setOpenProfileEditModal] = useState(false);
  const [openContactEditModal, setOpenContactEditModal] = useState(false);

  const handleOpen = () => setOpenProfileEditModal(true);
  const handleClose = () => setOpenProfileEditModal(false);
  const handleContactOpen = () => setOpenContactEditModal(true);
  const handleContactClose = () => setOpenContactEditModal(false);

  useEffect(() => {
    setData(employee_data);
  }, [data]);

  return (
    <div>
      <Box my={3}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Card
              className={`${classes.card} emp_edit_card`}
              sx={{ boxShadow: 3 }}
            >
              <Box className={classes.cardsHead} my={1}>
                <Typography variant="h5">Primary Details</Typography>

                {basePath != "/home/company/employee" && (
                  <Button
                    onClick={handleOpen}
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Button>
                )}
                {openProfileEditModal && (
                  <EditModal
                    openProfileEditModal={openProfileEditModal}
                    onHandleClose={handleClose}
                    type="personalDetails"
                    onHandleSubmit="UPDATE"
                  />
                )}
              </Box>
              <Divider
                className="employee-devider"
                sx={{ marginTop: 1 }}
              ></Divider>
              <Grid container spacing={3} my={-0.5}>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>First Name</Typography>
                  <Typography>{data.first_name}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Last Name</Typography>
                  <Typography>{data.last_name || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Gender</Typography>
                  <Typography>{data.gender || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Nationality</Typography>
                  <Typography>Indian</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Marital Status</Typography>
                  <Typography>{data.marital_status || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Blood Group</Typography>
                  <Typography>{data.blood_group || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Specially Abled</Typography>
                  <Typography>{data.phy_disable || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Aadhar Card Number</Typography>
                  <Typography>{data.aadhaar_card || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>PAN Card Number</Typography>
                  <Typography>{data.pan_card || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>
                    UAN Number (If any)
                  </Typography>
                  <Typography>{data.uan || "NA"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item lg={6}>
            <Card
              className={`${classes.card} emp_edit_card`}
              sx={{ boxShadow: 3 }}
            >
              <Box className={classes.cardsHead} my={1}>
                <Typography variant="h5">Contact Details</Typography>
                {basePath != "/home/company/employee" && (
                  <Button
                    onClick={handleContactOpen}
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Button>
                )}

                {openContactEditModal && (
                  <EditModal
                    openProfileEditModal={openContactEditModal}
                    onHandleClose={handleContactClose}
                    type="Contact Details"
                    onHandleSubmit="UPDATE"
                  />
                )}
              </Box>
              <Divider
                className="employee-devider"
                sx={{ marginTop: 1 }}
              ></Divider>
              <Grid container spacing={3} my={-0.5}>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Work Email</Typography>
                  <Typography>{data.email || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Personal Email</Typography>
                  <Typography>{data.personal_email || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Phone Number</Typography>
                  <Typography>{data.phone || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Git Hub Id</Typography>
                  <Typography>{data.github || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Whatsapp Number</Typography>
                  <Typography>{data.whatsapp || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Bitbucket Id</Typography>
                  <Typography>{data.bitbuket || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Wordpress ID</Typography>
                  <Typography>{data.wordpress || "--"}</Typography>
                </Grid>
                <Grid item lg={6}>
                  <Typography fontWeight={"450"}>Work Phone</Typography>
                  <Typography>{data.work_phone || "--"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item lg={6}>
            <EmployeeSkills
              editButton={basePath != "/home/company/employee" ? true : false}
              employeeData={employee_data}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
