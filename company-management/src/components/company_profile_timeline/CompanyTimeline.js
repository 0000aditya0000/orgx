import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Event from "./CompanyTimeline.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function CompanyTimeline() {
  return (
    <Timeline position="alternate">
      {Event.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent className="timline-opposite" color="text.secondary">
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              color="primary"
              variant="outlined"
              sx={{
                padding: 0,
              }}
            >
              <CheckCircleIcon color="success" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}


export default CompanyTimeline;