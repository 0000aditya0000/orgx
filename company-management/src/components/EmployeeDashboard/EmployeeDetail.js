import { Typography } from "@mui/material";
import React from "react";
export default function EmployeeDetail({employeeName}) {
  return (
    <div>
      <Typography my={2} variant="h5">
        Hi, {`${employeeName}`} Welcome Back
      </Typography>
    </div>
  );
}
