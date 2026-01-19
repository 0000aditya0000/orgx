import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  FormControl,
  FormLabel,
  TextField,
  Input,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  companyEdit: {
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
  form: {
    padding: "1rem",
  },
  formControl: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: '0px 32px',
    gap: 10,
    margin: "1rem 0",
  },
  primaryInfo: {

    width: "48%",
    margin: ".8rem 0 !important"

  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
  dialogTitle: {
    background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) no-repeat 0 0 / cover',
    color: "#dde6ed"
  }
}));

function CompanyEditModal(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    code: "",
    projects: "",
    employees: "",
    about: "",
    cultureAndEnvironment: "",
    structure: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog className={`${classes.companyEdit} company-modal`} onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialogTitle} >Edit Company Profile</DialogTitle>
      <form
        className={`${classes.form} company-edit-form`}
        onSubmit={handleSubmit}
      >
        <Stack>
          <Box className={classes.formControl}>
            <FormControl className={classes.primaryInfo}>
              <TextField
                id="outlined-text"
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.primaryInfo}>
              {/* <FormLabel>Email</FormLabel> */}
              <TextField
                id="outlined-email"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.primaryInfo}>
              {/* <FormLabel>Company Type</FormLabel> */}
              <TextField
                id="outlined-text"
                label="Company Type"
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.primaryInfo}>
              {/* <FormLabel>Company Code</FormLabel> */}
              <TextField
                id="outlined-text"
                label="Company Code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.primaryInfo}>
              {/* <FormLabel>Total Projects</FormLabel> */}
              <TextField
                id="outlined-text"
                label="Total Projects"
                type="text"
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.primaryInfo}>
              {/* <FormLabel>Total Employees</FormLabel> */}
              <TextField
                id="outlined-text"
                label="Total Employees"
                type="text"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "#000000" },
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
          <FormControl>
            <TextField
              id="outlined-multiline-static"
              name="about"
              label="About"
              multiline
              rows={4}
              value={formData.about}
              onChange={handleChange}
              sx={{
                margin: "1rem 2rem 1rem 2rem",
              }}
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-multiline-static"
              name="cultureAndEnvironment"
              label="Culture and Work Environment"
              multiline
              rows={4}
              value={formData.cultureAndEnvironment || "Default Value"}
              onChange={handleChange}
              sx={{
                margin: "1rem 2rem 1rem 2rem",
              }}
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-multiline-static"
              name="structure"
              label="Organizational Structure"
              multiline
              rows={4}
              value={formData.structure || "Default Value"}
              onChange={handleChange}
              sx={{
                margin: "1rem 2rem 1rem 2rem",
              }}
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
            />
          </FormControl>
        </Stack>
        <Box className={classes.buttonGroup}>
          <Button
            type="button"
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "gray",
              marginRight: "1rem",
              "&:hover": {
                backgroundColor: "#787474",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            style={{ marginRight: "2rem",background: 'linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) no-repeat 0 0 / cover' }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}

export default CompanyEditModal;
