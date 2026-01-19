import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  leaveAccordionSummery: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: "1rem",
    padding: "1rem",
    gap: "1rem",
    borderRadius: "0.5rem",
  },
  leaveTitle: { color: "#999999" },
  leaveAccordionDetails: { marginLeft: "1rem" },
  noHistory: {
    textAlign: "center",
  },
}));

export default function LeaveHistoryRecord() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const leaveHistory = [
    {
      empId: 1253,
      leaveId: "igvdghowdhcishjz",
      startDate: "2024-06-18T18:30:00.000Z",
      endDate: "2024-06-26T18:30:00.000Z",
      leaveType: "Earned Leave",
      note: "aksbhxa javsxjhkab kjabsvxkahsbxajks ikasvbxkjxhashxkj kuagsxjhaxkhasbb khagsvxgjvax",
      status: "Approved",
      approver: "John Doe",
      leaveDays: 8.5,
    },
    {
      empId: 1253,
      leaveId: "kjahsdkjhaskjdh",
      startDate: "2024-07-01T18:30:00.000Z",
      endDate: "2024-07-03T18:30:00.000Z",
      leaveType: "Sick Leave",
      note: "Sick for two days",
      status: "Approved",
      approver: "John Doe",
      leaveDays: 2,
    },
    {
      empId: 1253,
      leaveId: "asdhjaskjdhaskj",
      startDate: "2024-08-15T18:30:00.000Z",
      endDate: "2024-08-22T18:30:00.000Z",
      leaveType: "Annual Leave",
      note: "Taking a week off",
      status: "Approved",
      approver: "John Doe",
      leaveDays: 7,
    },
    {
      empId: 1253,
      leaveId: "jhasdkjhaskjdh",
      startDate: "2024-09-01T18:30:00.000Z",
      endDate: "2024-09-02T18:30:00.000Z",
      leaveType: "Family Care Leave",
      note: "Need to take care of a sick family member",
      status: "Rejected",
      approver: "John Doe",
      leaveDays: 1,
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {leaveHistory.length === 0 ? (
        <Box className={classes.noHistory}>
          <Typography variant="h4" fontWeight={500}>
            No Leave History
          </Typography>
        </Box>
      ) : (
        leaveHistory.map((history, index) => (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="paperclass"
            key={history.leaveId}
            sx={{ borderBottom: "1px solid #999" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#999" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Paper
                className={`${classes.leaveAccordionSummery} paperclass`}
                elevation={0}
              >
                <Box width={200}>
                  <Typography className={classes.leaveTitle} variant="p">
                    Start Date
                  </Typography>
                  <Typography className="p">
                    {new Date(history.startDate).toLocaleDateString(
                      "en-IN",
                      options
                    )}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.leaveTitle} variant="p">
                    End Date
                  </Typography>
                  <Typography className="p">
                    {new Date(history.endDate).toLocaleDateString(
                      "en-IN",
                      options
                    )}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.leaveTitle} variant="p">
                    Leave Type
                  </Typography>
                  <Typography className="p">{history.leaveType}</Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.leaveTitle} variant="p">
                    Days
                  </Typography>
                  <Typography className="p">
                    {history.leaveDays + "d"}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.leaveTitle} variant="p">
                    {history.status}
                  </Typography>
                  <Typography className="p">By {history.approver}</Typography>
                </Box>
              </Paper>
            </AccordionSummary>
            <AccordionDetails>
              <Paper
                className={`${classes.leaveAccordionDetails} paperclass`}
                elevation={0}
              >
                <Typography className="h6" variant="h6">
                  Reason:
                </Typography>
                <Typography className="p" variant="span">
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
}
