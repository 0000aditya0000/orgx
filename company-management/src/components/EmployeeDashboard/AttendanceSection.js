import React from 'react'
import { Box,Card } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { AttendanceControl } from '../attendance/AttendanceControl';
const useStyles = makeStyles((theme) => ({
  card:{
    height:"220px",
    borderRadius:"1rem !important",
    display:"flex",
    justifyContent:"center"
    
  }
}))
export default function AttendanceSection() {
  const classes = useStyles();
  return (
    <div>
        <Card  className={`${classes.card} employee-dashboard-card`} elevation={0}>
        <Box my={2}>
        <AttendanceControl />
        </Box>
        </Card>
    </div>
  )
}
