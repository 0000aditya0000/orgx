import { Typography, Card, Grid, Box, Divider } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import EmployeeSkills from "./EmployeeSkills";
const useStyle = makeStyles((theme) => ({
  card: {
    backgroundColor: "gray",
    minWidth: 70,
    padding: 18,
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
}));
export default function About(props) {
  const classes = useStyle();
  const [data, setData] = useState(props.employee_data);

  const skillData = props.skills;

  return (
    <div>
      <Box my={3}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Card
              className={`${classes.card} emp_edit_card`}
              sx={{ boxShadow: 3 }}
            >
              <Typography variant="h5" my={1}>
                Primary Details
              </Typography>
              <Divider className="employee-devider"></Divider>
              <Grid container spacing={3} my={-0.5}>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>First Name</Typography>
                  <Typography>{data.first_name || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Last Name</Typography>
                  <Typography>{data.last_name || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Gender</Typography>
                  <Typography>{data.gender || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Nationality</Typography>
                  <Typography>Indian</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Marital Status</Typography>
                  <Typography>{data.marital_status || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Blood Group</Typography>
                  <Typography>{data.blood_group || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Specially Abled</Typography>
                  <Typography>{data.phy_disable || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Aadhar Card Number</Typography>
                  <Typography>{data.aadhaar_card || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>PAN Card Number</Typography>
                  <Typography>{data.pan_card || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
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
              <Typography variant="h5" my={1}>
                Contact Details
              </Typography>
              <Divider className="employee-devider"></Divider>
              <Grid container spacing={3} my={-0.5}>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Work Email</Typography>
                  <Typography style={{ wordWrap: "break-word" }}>
                    {data.email || "--"}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Personal Email</Typography>
                  <Typography>{data.personal_email || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Phone Number</Typography>
                  <Typography>{data.phone || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Git Hub Id</Typography>
                  <Typography>{data.github || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Whatsapp Number</Typography>
                  <Typography>{data.whatsapp || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Bitbucket Id</Typography>
                  <Typography>{data.bitbuket || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Wordpress ID</Typography>
                  <Typography>{data.wordpress || "--"}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography fontWeight={"450"}>Work Phone</Typography>
                  <Typography>{data.work_phone || "--"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <EmployeeSkills employeeData={data} editButton={false} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
