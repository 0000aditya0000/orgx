import { Grid } from '@mui/material'
import React from 'react'
import { AttendanceControl } from './AttendanceControl'

export const Attendance = () => {
  return (
    <Grid container>
        <Grid item xs={12} md={3}>
            <AttendanceControl />
        </Grid>
        <Grid item xs={12} md={3}>
            
        </Grid>
        <Grid item xs={12} md={3}>
            
        </Grid>
    </Grid>
  )
}
