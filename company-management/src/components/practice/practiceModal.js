import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "../../hooks/Debounce";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { DrawerWrapper } from "../drawerWrapper/DrawerWrapper";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";

const useStyles = makeStyles((theme) => ({
  field: {
    width: "100%",
    "& .MuiFormLabel-root": {
      color: "grey",

      "&.Mui-focused ": {
        color: "red",
      },
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B2BAC2",
      },
      "&:hover fieldset": {
        borderColor: "#6F7E8C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },

    "&.MuiOutlinedInput-input": {
      color: "white",
    },
  },
  buttonName: {
    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
    color: "white !important",

    "&:hover ": {
      backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  cancelButton: {
    backgroundColor: "grey !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "grey !important",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  modalInputFields: {
    marginTop: "-1rem",
    padding: "3rem !important",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem !important",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "red",
    alignItems:"center"
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem !important",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    position: "absolute",
    bottom: "0",
    right: "0",
    padding: "24px",
  },
  error: {
    color: "red",
  },
}));

const debounce = (func, delay) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function practiceModal({
  openModal,
  handleClose,
  buttonName,
  practiceData,
  modalType,
  onUpdateSuccess,
}) {
  const dispatch = useDispatch();
  const [loadList, setLoadList] = useState(false);
  const [error, setError] = useState("");
  const [loadPractice, setLoadPractice] = useState(false);
  const [checkPractice, setCheckPractice] = useState(false);
  const [emptyPractice, setEmptyPractice] = useState(false);
  const [practiceNameCheck, setPracticeNameCheck] = useState(false);
  const [practiceDesc, setPracticeDesc] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const classes = useStyles();
  const tenantCode = localStorage.getItem("tenant_code");
  const authToken  = localStorage.getItem('token')
  // Get practice ID from practiceData instead of URL params
  const practiceId = practiceData?.data?.id || practiceData?.data?.practice_id;
  console.log("Practice Data:", practiceData);
  console.log("Practice ID:", practiceId);
  const [primaryPractice, setPrimaryPractice] = useState(
    practiceData?.data?.title
  );
  const [studioHeadName, setStudioHeadName] = useState(
    modalType === "edit" ? practiceData?.data?.studio_head !== undefined ? practiceData?.data?.studio_head : null  : null
  );
  const [formValue, setFormValue] = useState({
    practiceName: modalType === "edit" ? practiceData?.data.title : "",
    totalEmployees:
      modalType === "edit" ? practiceData?.data.total_employee : "",
    practiceDescription:
      modalType === "edit" ? practiceData?.data?.description : "",
    studio_head: modalType === "edit" ? practiceData?.data?.studio_head : "",
  });
  const debouncedPracticeName = useDebounce(formValue.practiceName);
  React.useEffect(() => {
    if(formValue.practiceName!==""){
      getPracticeNameCheck(debouncedPracticeName);
    } else {
        setLoadPractice(false);
        setCheckPractice(false);
    }
  }, [debouncedPracticeName]);

  const getPracticeNameCheck = async (value) => {
    const practice = {
      title: value,
    };
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL_API;
      const response = await fetch(
        `${baseUrl}/practice/practiceName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            tenant_code: tenantCode,
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify(practice),
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        setLoadPractice(false);
        setCheckPractice(true);
      } else if(response.status != 500) {
        setLoadPractice(false);
        setCheckPractice(false);

        if (primaryPractice !== formValue.practiceName) {
          setError(true);
        }
      } else {
          setLoadPractice(false);
          setCheckPractice(false);
          setError('Something went wrong please try again!');
      }
    } catch (err) {
      
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    {
      name === "practiceHeadName" && setLoadList(true);
    }
    if (name === "practiceName") {
      setCheckPractice(false);
      setLoadPractice(true);
      setError(false);
      setEmptyPractice(false);
    }
    {
      name === "practiceDescription" && setPracticeDesc(false);
    }
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    if(error){
      return
    }
    if (formValue.practiceName === "" && formValue.practiceDescription === "") {
      setEmptyPractice(true);
      setPracticeDesc(true);
      return;
    }
    if (formValue.practiceName === "") {
      setEmptyPractice(true);
      return;
    }
    if (formValue.practiceDescription === "") {
      setPracticeDesc(true);
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("tenant_code", tenantCode);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",`Bearer ${authToken}`);

    const raw = JSON.stringify({
      title: formValue.practiceName,
      description: formValue.practiceDescription,
      total_employee: formValue?.totalEmployees || 0,
      studio_head: studioHeadName || "",
      location:"Noida"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const baseUrl = process.env.REACT_APP_BASE_URL_API;
    try {
      const response = await fetch(
        `${baseUrl}/practice`,
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        practiceData(response);
      }
    } catch (err) {
    } finally {
      handleClose();
    }
  };
  const handleUpdate = async (e) => {
    if(error){
      return
    }
    
    if (!practiceId) {
      console.error("Practice ID is missing");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("tenant_code", tenantCode);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",`Bearer ${authToken}`)

    const raw = JSON.stringify({
      title: formValue.practiceName || practiceData?.data?.title || "",
      description: formValue.practiceDescription || practiceData?.data?.description || "",
      total_employee: parseInt(formValue.totalEmployees) || practiceData?.data?.total_employee || 0,
      studio_head: studioHeadName || practiceData?.data?.studio_head || "",
      status: practiceData?.data?.status || "active",
      image: practiceData?.data?.image || "",
      location: practiceData?.data?.location || "Noida"
    });
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    
    const baseUrl = process.env.REACT_APP_BASE_URL_API;
    try {
      const response = await fetch(`${baseUrl}/practice/${practiceId}`, requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log("Practice updated successfully:", result);
        dispatch(
          showToast({
            severitySnackbar: "success",
            message: "Practice updated successfully.",
          })
        );
        if (practiceData && typeof practiceData === 'function') {
          practiceData(response);
        }
        // Call onUpdateSuccess callback if provided (e.g., to refetch the list)
        if (onUpdateSuccess && typeof onUpdateSuccess === 'function') {
          onUpdateSuccess();
        }
        handleClose();
      } else {
        const errorData = await response.json();
        console.error("Error updating practice:", errorData);
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: errorData?.message || "Failed to update practice.",
          })
        );
        handleClose();
      }
    } catch (error) {
      console.error("Error updating practice:", error);
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: "An error occurred while updating practice.",
        })
      );
      handleClose();
    }
  };
  const baseUrl = process.env.REACT_APP_BASE_URL_API;
  const getSearchResult = async (value) => {
    try {
      const response = await fetch(
        `${baseUrl}/employee/filterByName?name=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            tenant_code: tenantCode,
             Authorization: `Bearer ${authToken}`
          },
        }
      );
      if (response.ok) {
        const data1 = await response.json();
        setSearchResult(data1.data || []);
        setLoadList(false);
      } else {
        setLoadList(false);
      }
    } catch (error) {
      setLoadList(false);
    }
  };
  const debouncedSearch = debounce(getSearchResult, 3000);
  const handleInputChange = (event) => {
    if(event.target.value !== undefined){ 
    setLoadList(true);
    debouncedSearch(event.target.value);
    }
  };
  
  const handleCompetency = (value) => {
    if (value && typeof value === 'object') {
      setStudioHeadName(value.first_name || value);
    } else {
      setStudioHeadName(value || "");
    }
  };


  return (
    <>
      <DrawerWrapper
        open={openModal}
        onHandleClose={handleClose}
        title={"Practice"}
        action={modalType === "edit" ? "Edit" : "Add"}
      >
        <Box
          sx={{ width: "40rem", height: "100%", paddingTop: "1rem" }}
          className="containerprofile"
        >
          <Box className={classes.modalInputFields}>
            <TextField
            sx={{
              height: "40px",
              marginBottom: "1rem",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
            }}             
            InputLabelProps={{
              style: { color: "#000000" },
              shrink: true,
            }}
            required

              label="Practice Name"
              name="practiceName"
              className={classes.field}
              InputProps={{
                endAdornment: (
                  <>
                    {loadPractice && <CircularProgress size={20} />}
                    {checkPractice && formValue.practiceName !== "" && (
                      <CheckCircleOutlineIcon size={20} color="success" />
                    )}
                  </>
                ),
                type: "search",
              }}
              helperText={
                emptyPractice
                  ? "Please enter a practice name"
                  : error === true?
                   "Practice with this name already exists."
                  : error
              }
              FormHelperTextProps={{
                style: {
                  color: "red",
                  marginLeft: "0",
                  marginTop: "5px",
                },
              }}
              id="outlined-size-small"
              value={formValue.practiceName}
              onChange={handleInput}
            />

            <Autocomplete
              freeSolo
              className={`${classes.field} `}
              id="free-solo-2-demo"
              disableClearable={true}
              value={studioHeadName}
              onChange={(event, value) => handleCompetency(value)}
              options={searchResult}
              getOptionLabel={(option) =>
                // `${option.first_name} -${
                //   option.designation ? " " + option.designation + "-" : ""
                // } ${option.studio} - (${option.email})`
                `${option.first_name}`
              }
              renderOption={(props, option) => (
                <ListItem {...props} key={option.id}>
                  <ListItemAvatar>
                    <Avatar alt={option.first_name} src={option.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={option.first_name}
                    secondary={`${option.designation} - ${option.studio} - ${option.email}`}
                  />
                </ListItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Practice Head"
                  sx={{
                    height: "40px",
                    marginBottom: "1rem",
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}             
                  InputLabelProps={{
                    style: { color: "#000000" },
                    shrink: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>{loadList && <CircularProgress size={20} />}</>
                    ),
                    type: "search",
                  }}
                  style={{ width: "100%" }}
                  onChange={(e) => handleInputChange(e)}
                  value={studioHeadName}
                />
              )}
            />
            {buttonName === "Update" && (
              <TextField
              sx={{
                height: "40px",
                marginBottom: "1rem",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}             
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}
                label="Total Competency"
                id="outlined-size-small"
                name="totalEmployees"
                className={classes.field}
                value={formValue.totalEmployees}
                onChange={handleInput}
              />
            )}
            <TextField
              sx={{
                height: "40px",
                marginBottom: "1rem",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}             
              InputLabelProps={{
                style: { color: "#000000" },
                shrink: true,
              }}             
               required
              id="outlined-multiline-static"
              label="Practice Description"
              multiline
              rows={7}
              className={classes.field}
              inputProps={{ maxLength: 500, minLength: 10000 }}
              helperText={
                practiceDesc ? "Please enter a practice description" : ""
              }
              FormHelperTextProps={{
                style: {
                  color: "red",
                  marginLeft: "0",
                  marginTop: "5px",
                },
              }}
              name="practiceDescription"
              value={formValue.practiceDescription}
              onChange={handleInput}
            />

            <Box className={classes.modalButtons}>
              <Button
                variant="contained"
                onClick={handleClose}
                className={classes.cancelButton}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  buttonName === "Save" ? handleSubmit() : handleUpdate();
                }}
              
                className={classes.buttonName}
                variant="contained"
              >
                {buttonName}
              </Button>
            </Box>
          </Box>
        </Box>
      </DrawerWrapper>
    </>
  );
}
