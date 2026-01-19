import { Box, Typography } from "@mui/material";
import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
const valueFormatter = (val) => {
  return val !== null ? val + "%" : "";
};

export default function Progress() {
  return (
    <div>
      <Box sx={{ height: "310px" }}>
        <Box>
          <Typography variant="h5" fontWeight={"500"}>
            Progress
          </Typography>
        </Box>
        <Box>
          <Gauge
            value={75}
            startAngle={-110}
            endAngle={110}
            height={250}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                fill:"gray",
                transform: "translate(0px, 0px)",
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: "gray",
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </Box>
      </Box>
    </div>
  );
}
