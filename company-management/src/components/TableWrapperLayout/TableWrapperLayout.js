import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { decodeToken } from "react-jwt";
export const TableWrapperLayout = ({
  children,
  label,
  tableName,
  handleOpenAdd,
  onHandleEditEmployee,
  handleUploadFile
}) => {
  const role = localStorage.getItem("role");
  const authToken = localStorage.getItem('token');
  const tokenDecode = authToken;
  const decodedToken = decodeToken(tokenDecode);
  const labels = decodedToken?.labels
  console.log(labels)
  return (
    <div style={{ marginLeft: "1rem", width: "98%" }}>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 2,
            borderRadius: "1rem",
            position: "relative",
            marginRight: "2rem",
            marginTop: "2rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginTop: 2.5,
              fontSize: "1.75rem",
              lineHeight: 1.625,
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            }}
          >
            {label}
          </Typography>

          <div style={{ marginTop: "1.3rem", marginRight: "1.1rem" }}>
            {(labels.iscompetencycreate || labels.ispracticecreate || labels.isemployeecreate) && (
              <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
              <nash-button
                transform="capitalize"
                type="raised"
                color="primary"
                onClick={handleOpenAdd}
              >
                 {"Add"} {tableName}
              </nash-button>
              { tableName==="Employee"&&
              <nash-button
                transform="capitalize"
                type="raised"
                color="primary"
                onClick={handleUploadFile}
              >
                Upload Bulk Employee's
              </nash-button>
              }
              </div>
            )}
          </div>
        </Box>
        <div style={{ width: "100%", marginTop: "-.7rem" }}>{children}</div>
      </Stack>
    </div>
  );
};
