import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import Autocomplete from "@mui/material/Autocomplete";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
// import ToastMessage from "../snackbar/ToastMessage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { DrawerWrapper } from "../drawerWrapper/DrawerWrapper";
import { useDebounce } from "../../hooks/Debounce";
import {
  getCompetencyById
} from "../../services/competencyService";
import { EmployeeFilterByName } from "../../services/employeeService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useUpdateCompetencyMutation,useGetCompetencyByNameMutation,useAddCompetencyMutation } from "../../features/competencyApi";
 
const useStyles = makeStyles(() => ({
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
  },
  error: {
    color: "red",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    marginBottom: "2rem !important",
  },
  modaltypo: {
    color: "white",
    fontWeight: "500 !important",
  },
  modaluppercontent: {
    display: "flex",
    gap: "3rem",
    justifyContent: "space-around",
    marginLeft: "1.5rem",
  },
  modalcontent: {
    marginRight: "2rem",
    padding: "1rem",
  },
  modalbutton: {
    float: "right",
    display: "flex",
    gap: "1rem",
    position: "absolute",
    alignItems: "flex-end",
    bottom: "0",
    right: "0",
    padding: "24px",
  },
 
  "@media (max-width: 768px)": {
    modalbutton: {
      marginTop: "12rem",
    },
  },
  "@media (max-width: 390px)": {
    modaluppercontent: {
      display: "block",
    },
    modaltypo: {
      fontSize: "1.5rem !important",
    },
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
 
function StudioModal({
  open,
  handleClose,
  onhandlesubmitButton,
  modalData,
  competencyId,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [emptyDesc, setEmptyDesc] = useState(false);
  const [invalidDesc, setInvalidDesc] = useState(false);
  const [loadList, setLoadList] = useState(false);
  const [loadStudio, setLoadStudio] = useState(false);
  const [checkStudio, setCheckStudio] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  
  const [studioName, setStudioName] = useState("");
  const [primaryStudio, setPrimaryStudio] = useState("");
  const [studioHeadName, setStudioHeadName] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState("");
  const [totalProjects, setTotalProjects] = useState("");
  const [studioEmail, setStudioEmail] = useState("");
  const [studioCode, setStudioCode] = useState("");
  const [about, setAbout] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const [updateHandler,{isLoading}] = useUpdateCompetencyMutation();
  const [nameCheckHandler, { isLoading: isLoadingNameCheck }] = useGetCompetencyByNameMutation();
  const [handleAddCompetency] = useAddCompetencyMutation();
  const handleCompetency = (value) => {
    console.log(value);
    
    setStudioHeadName(value);
    setStudioEmail(value.email);
  };
  const setDescription = (value) => {
    setEmptyDesc(false);
    setAbout(value);
  };
 
  const debouncedStudioName = useDebounce(studioName);
  React.useEffect(() => {
    if (studioName !== "") {
      getStudioNameCheck(debouncedStudioName);
    }
  }, [debouncedStudioName]);
 
  const getSearchResult = async (value) => {
    try {
      const data1 = await EmployeeFilterByName(value);
      setSearchResult(data1.data || []);
      setLoadList(false);
    } catch (error) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.message}` })
      );
      setLoadList(false);
    }
  };
  const formData = {
    competency_name: studioName,
    competency_admin_email: studioEmail,
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: studioHeadName,
    description: about,
    // competency_code: studioCode,
  };
  const debouncedSearch = debounce(getSearchResult, 3000);
 
  const handleInputChange = (value) => {
    if (value !== "") {
      setLoadList(true);
      debouncedSearch(value);
    }
  };
 
  const fetchStudioDetails = async () => {
    try {
      const data1 = await getCompetencyById(id);
      setData(data1);
    } catch (error) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.message}` })
      );
    }
  };
 
  useEffect(() => {
    if (id) {
      fetchStudioDetails();
    }
  }, [id]);

  useEffect(() => {
    if (modalData?.data && onhandlesubmitButton === "Update") {
      const data = modalData.data;
      setStudioName(data.competency_name || "");
      setPrimaryStudio(data.competency_name || "");
      setStudioEmail(data.competency_admin_email || "");
      setStudioCode(data.competency_code || "");
      setAbout(data.description || "");
      setTotalEmployees(data.total_employee || data.totalEmployee || "");
      setTotalProjects(data.total_project || data.totalProject || "");
      
      if (data.competency_head) {
        if (typeof data.competency_head === 'object' && data.competency_head !== null) {
          setStudioHeadName(data.competency_head);
        } else {
          const studioHeadDetails = {
            first_name: data.competency_head,
            email: data.competency_admin_email || "",
            studio_name: data.competency_name || "",
          };
          setStudioHeadName(studioHeadDetails);
        }
      } else {
        setStudioHeadName(null);
      }
    } else if (!modalData && onhandlesubmitButton === "SAVE") {
      setStudioName("");
      setPrimaryStudio("");
      setStudioEmail("");
      setStudioCode("");
      setAbout("");
      setTotalEmployees("");
      setTotalProjects("");
      setStudioHeadName(null);
    }
  }, [modalData, onhandlesubmitButton]);
 
  const onSavehandler = async () => {
   
    if (studioName === "" && about === "") {
      setEmptyName(true);
      setEmptyDesc(true);
      return;
    }
    if (studioName === "") {
      setEmptyName(true);
      return;
    }
    if (about === "") {
      setEmptyDesc(true);
      return;
    }
    if(emptyName || emptyDesc || invalidName || invalidDesc){
      return;
    }
    setLoading(true);
    const formData = {
      competency_name: studioName,
      competency_admin_email: studioEmail,
      status: "active",
      total_project: 10,
      total_employee: 15,
      competency_head: studioHeadName,
      description: about,
      competency_code: studioCode,
    };
 
    try {
      const data = await handleAddCompetency(formData).unwrap();
      const competencyId = data.data[0].id;
      setLoading(false);
      dispatch(
        showToast({
          severitySnackbar: "success",
          message: "Competency Created Successfully!!",
        })
      )
      handleClose();
    } catch (error) {
      setLoading(false);
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.message}` })
      );
    }
  };
 
  const getStudioNameCheck = async (value) => {
    const studio = {
      competency_name: value,
    };
    try {
      const data = await nameCheckHandler(studio).unwrap();
      if (!data.data) {
        setLoadStudio(false);
        setCheckStudio(true);
        setError(false);
      } else {
        setLoadStudio(false);
        setCheckStudio(false);
        setError(true);
        if (primaryStudio === studioName) {
          setError(false);
        }
      }
    } catch (err) {
      setLoadStudio(false);
      setError(true);
      setCheckStudio(false);
      dispatch(
        showToast({ severitySnackbar: "error", message: `${err.message}` })
      );
    }
  };
  const studioNameCheck = (value) => {
    setEmptyName(false);
    setInvalidName(false);
    setError(false);
    setCheckStudio(false);
    setLoadStudio(true);
    setStudioName(value);
  };

  const handleCompetencyNameBlur = (value) => {
    if(value === ''){
      setEmptyName(true);
      return;
    }
    if(value.length < 3){
      setInvalidName(true);
      return;
    }
    setEmptyName(false);
    setInvalidName(false);
  };

  const handleDescriptionBlur = (value) => {
    if(value === ''){
      setEmptyDesc(true);
      return;
    }
    if(value.length < 50){
      setInvalidDesc(true);
      return;
    }
    setInvalidDesc(false);
    setEmptyDesc(false);
  }
 
  const onUpdateHanlder = async () => {
    if (error) {
      return;
    }
    if (studioName === "" && about === "") {
      setEmptyName(true);
      setEmptyDesc(true);
    }
    if (studioName === "") {
      setEmptyName(true);
      return;
    }
    if (about === "") {
      setEmptyDesc(true);
      return;
    }
    setLoading(true);
    
    const sourceData = modalData?.data || data?.data;
    const updateId = competencyId || id;
    
    const updatedformData = {
      ...sourceData,
      competency_name: studioName || sourceData?.competency_name,
      competency_admin_email: studioEmail || sourceData?.competency_admin_email,
      status: sourceData?.status || "active",
      total_project: totalProjects || sourceData?.total_project || sourceData?.totalProject,
      total_employee: totalEmployees || sourceData?.total_employee || sourceData?.totalEmployee,
      competency_head: studioHeadName?.id || studioHeadName?.first_name || sourceData?.competency_head,
      description: about || sourceData?.description,
      competency_code: studioCode || sourceData?.competency_code,
    };
    
    try {
      await updateHandler({id: updateId, updatedData: updatedformData}).unwrap();
      dispatch(
        showToast({
          severitySnackbar: "success",
          message: "Competency Updated Successfully!!",
        })
      )
      handleClose();
    } catch (error) {
      setLoading(false);
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.data?.message || error.message}` })
      );
    }
   
  };
 
  return (
    <>
      {loading ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "initial",
            height: "10rem",
            marginTop: "1rem",
            background: "transparent",
          }}
          open
        >
          <ClassicSpinner size={70} color="#000" loading={loading} />
        </Backdrop>
      ) : (
        <DrawerWrapper
          open={open}
          onHandleClose={handleClose}
          title={"Competency"}
          action={onhandlesubmitButton === "Save" ? "Add" : "Edit"}
        >
          <Box
            sx={{ width: "40rem", height: "100%", paddingTop: "1rem" }}
            className="containerprofile"
          >
            <Box className={classes.modaluppercontent}>
              <Box className={classes.modalcontent}>
                <Box mt={3} sx={{ flexGrow: 1 }}>
                  <Grid
                    className="inputitems"
                    container
                    spacing={3.5}
                    columns={16}
                    gap={2}
                  >
                    <Grid item xs={12}>
                      <TextField
                        value={studioName}
                        required
                        label="Competency Name"
                        placeholder="Search competency"
                        InputLabelProps={{
                          style: { color: "#000000" },
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              {loadStudio && studioName !== "" ? (
                                <CircularProgress size={20} />
                              ) : checkStudio && studioName !== "" ? (
                                <CheckCircleOutlineIcon
                                  size={20}
                                  color="success"
                                />
                              ) : studioName !== "" && !checkStudio ? (
                                <ClearIcon
                                  onClick={() => {
                                    studioNameCheck("");
                                    setStudioHeadName("");
                                  }}
                                  sx={{
                                    cursor: "pointer",
                                    color: "#B2BAC2",
                                  }}
                                />
                              ) : (
                                <SearchIcon
                                  sx={{
                                    marginLeft: "0.5rem",
                                    color: "#B2BAC2",
                                  }}
                                />
                              )}
                            </>
                          ),
                          type: "search",
                        }}
                        helperText={
                          emptyName ? "Please enter a competency name" : invalidName ? "Please enter a valid competency name" : error ? "Competency name already exists": ""
                        }
                        FormHelperTextProps={{
                          style: {
                            color: "red",
                            marginLeft: "0",
                            marginTop: "5px",
                          },
                        }}
                        sx={{
                          height: "40px",
                          marginBottom: "1rem",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#3f51b5",
                            },
                          },
                        }}
                        className={`${classes.field} `}
                        style={{ width: "137%" }}
                        onChange={(e) => studioNameCheck(e.target.value)}
                        onBlur={(e) => handleCompetencyNameBlur(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        freeSolo
                        className={`${classes.field} `}
                        id="free-solo-2-demo"
                        disableClearable={true}
                        value={studioHeadName}
                        onChange={(event, value) => handleCompetency(value)}
                        options={searchResult}
                        getOptionLabel={(option) =>
                          `${option.first_name} -${
                            option.designation
                              ? " " + option.designation + "-"
                              : ""
                          } ${option.studio_name} - (${option.email})`
                        }
                        renderOption={(props, option) => (
                          <ListItem {...props} key={option.id}>
                            <ListItemAvatar>
                              <Avatar
                                alt={option.first_name}
                                src={option.image}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={option.first_name}
                              secondary={`${option.designation} - ${option.studio_name} - ${option.email}`}
                            />
                          </ListItem>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Competency Head"
                            placeholder="Search Competency Head"
                            InputLabelProps={{
                              style: { color: "#000000" },
                              shrink: true,
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loadList ? (
                                    <CircularProgress size={20} />
                                  ) : (
                                    <SearchIcon
                                      sx={{
                                        marginLeft: "0.5rem",
                                        color: "#B2BAC2",
                                      }}
                                    />
                                  )}
                                </>
                              ),
                              type: "search",
                            }}
                            style={{ width: "137%" }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                  borderColor: "#3f51b5",
                                },
                              },
                            }}
                            onChange={(e) => handleInputChange(e.target.value)}
                            value={studioHeadName}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        InputLabelProps={{
                          style: { color: "#000000" },
                          shrink: true,
                        }}
                        multiline
                        value={studioEmail}
                        disabled
                        className={`${classes.field} `}
                        onChange={(e) => setStudioEmail(e.target.value)}
                        sx={{
                          width: "137%",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#3f51b5",
                            },
                            "&.Mui-disabled": {
                              cursor: "not-allowed",
                            },
                          },
                          "& .MuiInputBase-input.Mui-disabled": {
                            cursor: "not-allowed",
                            WebkitTextFillColor: "rgba(0, 0, 0, 0.38)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          id="outlined-multiline-static"
                          label="Description"
                          InputLabelProps={{
                            style: { color: "#000000" },
                            shrink: true,
                          }}
                          required
                          multiline
                          inputProps={{ maxLength: 500, minLength: 10000 }}
                          helperText={
                            emptyDesc
                              ? "Please enter a competency description"
                              : invalidDesc ? "Description should be atleast 50 characters": ""
                          }
                          FormHelperTextProps={{
                            style: {
                              color: "red",
                              marginLeft: "0",
                              marginTop: "5px",
                            },
                          }}
                          rows={7}
                          size="small"
                          value={about}
                          className={`${classes.field} `}
                          onChange={(e) => setDescription(e.target.value)}
                          onBlur={(e) => handleDescriptionBlur(e.target.value)}
                          sx={{
                            width: "137%",
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#3f51b5",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box className={classes.modalbutton}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "grey",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              {onhandlesubmitButton === "SAVE" ? (
                <Button
                  onClick={() => onSavehandler()}
                  variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                  }}
                >
                  {onhandlesubmitButton}
                </Button>
              ) : (
                <Button
                  color="error"
                  onClick={() => onUpdateHanlder()}
                  variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                  }}
                >
                  {onhandlesubmitButton}
                </Button>
              )}
            </Box>
          </Box>
        </DrawerWrapper>
      )}
    </>
  );
}
export default StudioModal;
 