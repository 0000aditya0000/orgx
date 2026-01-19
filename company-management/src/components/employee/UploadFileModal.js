import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InfoIcon from "@mui/icons-material/Info";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
const useStyle = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    flexDirection: "column",
  },
  cancelButton: {
    backgroundColor: "grey !important",
    color: "white !important",

    "&:hover ": {
      backgroundColor: "grey",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  },
  noFileContainer: {
    border: "3px solid #80d4ff",
    borderStyle: "dashed",
    borderRadius: "0.5rem",
    minWidth: "450px",
    height: "150px",
  },
  noFileBox: {
    padding: "20px",
    backgroundColor: "#CAEDFF",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "145px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
    padding: 10,
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    height: "300px",
    overflow: "auto",
    padding: "10px",
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
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "20px",
  },
  duplicateErrorBox: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "30px",
  },
  infoButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  // gap: "3rem",
};
export default function UploadFileModal({
  open,
  onHandleClose,
  getInfo,
  successMessage,
}) {
  const classes = useStyle();
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [duplicateError, setDuplicateError] = useState(false);
  const [duplicateErrorTable, setDuplicateErrorTable] = useState(false);
  const [duplicacyData, setDuplicacyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem('token')

  const [fileBulkData, setFileBulkData] = useState();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileSize(event.target.files[0].size);
  };
  const tenantCode = localStorage.getItem("tenant_code");
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData);
    const myHeaders = new Headers();
    myHeaders.append("tenant_code", tenantCode);
    myHeaders.append("Authorization",`Bearer ${authToken}`)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const baseUrl = process.env.REACT_APP_BASE_URL_API;
    try {
      const response = await fetch(
        `${baseUrl}/files/upload`,
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        getInfo();
        setFile(null);
        setFileBulkData(data);
        onHandleClose();
      } else {
        const data = await response.json();
        setDuplicateError(true);
        setLoading(false);
        const jsonStartIndex = data.message.indexOf("{");
        const jsonString = data.message.substring(jsonStartIndex);
        try {
          const jsonObject = JSON.parse(jsonString);
          console.log(jsonObject);
          setDuplicacyData(jsonObject);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        console.log(data.message);
        console.error("Upload failed:", response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            style: {
              background: "transparent",
            },
          },
        }}
      >
        <Box sx={style} className="employee-dashboard-card">
          <Box className={classes.header}>
            <Typography variant="h5" fontWeight={"500"} color={"white"}>
              Upload Bulk Employee's
            </Typography>
            <IconButton onClick={onHandleClose}>
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
              <Typography fontWeight={"500"}>
                Employee's data is uploading
              </Typography>
            </Box>
          ) : (
            <Box className={classes.box} my={0}>
              <input
                accept=".csv"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Box className={classes.modalContainer}>
                  <Box className={classes.noFileContainer}>
                    <Box className={`${classes.noFileBox} upload-box`}>
                      {file ? (
                        <InsertDriveFileOutlinedIcon fontSize="large" />
                      ) : (
                        <UploadFileIcon fontSize="large" />
                      )}

                      <Typography variant="h6">
                        {file
                          ? file.name +
                            " " +
                            (fileSize / 1024).toFixed(2) +
                            " KB"
                          : "Upload CSV file"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </label>
              <span > <a href="https://harveynashvn-my.sharepoint.com/:x:/g/personal/aditya_gangwar_nashtechglobal_com/ERmleoNztLZMj_2OcDHNcP0BtWZlslsYENkJMpGHfyB4dQ?e=YtudUW" target="_blank"><Typography sx={{marginTop:"0.5em",textDecoration:"underline",cursor:"pointer"}} color={"blue"}>
                    Download Sample CSV File
                  </Typography></a></span>
              {duplicateError && (
                <Box className={classes.duplicateErrorBox}>
                  <Typography color={"red"} fontWeight={"500"}>
                    Something went wrong{" "}
                  </Typography>
                  <Button
                    onClick={() => setDuplicateErrorTable(true)}
                    size="small"
                  >
                    Click Here
                  </Button>
                </Box>
              )}
            </Box>
          )}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {duplicateErrorTable && (
              <Box padding={3}>
                <Box padding={1} className="upload-box-border">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "30% 70%",
                      padding: 1,
                    }}
                  >
                    <Typography variant="h6" fontWeight={"bold"}>
                      Name
                    </Typography>
                    <Typography variant="h6" fontWeight={"bold"}>
                      Message
                    </Typography>
                  </Box>
                  <Divider className="employee-dashboard-divider" />
                  <Box className={classes.tableContainer}>
                    {duplicacyData.datas.map((data, index) => (
                      <Box key={data.id}>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "30% 70%",
                          }}
                        >
                          <Typography>{data.name}</Typography>
                          <Typography color={"red"}>{data.message}</Typography>
                        </Box>
                        <Divider className="employee-dashboard-divider" />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            <Box className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={() => {
                  onHandleClose();
                  setFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={!file}
                onClick={() => {
                  handleUpload();
                }}
                sx={{
                  background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                    opacity: 0.9
                  },
                  "&.Mui-disabled": {
                    background: "#eaeaea",
                    color: "#c0c0c0",
                  },
                }}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
