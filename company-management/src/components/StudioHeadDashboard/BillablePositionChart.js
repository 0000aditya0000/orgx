import React from "react";
import { Box, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
const years = [
  new Date(2014, 0, 1),
  new Date(2015, 0, 1),
  new Date(2016, 0, 1),
  new Date(2017, 0, 1),
  new Date(2018, 0, 1),
];

const lineChartsParams = {
  series: [
    {
      id: "series-1",
      data: [3, 4, 2, 6, 5],
      label: "Billable Position",
      area: true,
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      id: "series-2",
      data: [4, 3, 2, 5, 8],
      label: "Non-billable Position",
      area: true,
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
  ],
  xAxis: [
    {
      data: years,
      scaleType: "time",
      id: "axis1",
      tickLabelStyle: {
        fill: "#999999",
        fontWeight: "bolder",
      },
    },
  ],
  yAxis: [
    {
      label: "",
      valueFormatter: (v) => v + "%",
      labelStyle: {
        fontSize: 14,
      },
      tickLabelStyle: {
        textAnchor: "end",
        fontSize: 12,
        fill: "#999999",
        fontWeight: "bolder",
      },
    },
  ],
  height: 380,
};

const valueFormatter = (val) => {
  return val !== null ? val + "%" : "";
};

export default function BillablePositionChart() {
  return (
    <div>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0, md: 4 }}
        sx={{ width: "100%" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <LineChart
            {...lineChartsParams}
            onAreaClick={(event, d) => setItemData(d)}
            onMarkClick={(event, d) => setItemData(d)}
            onLineClick={(event, d) => setItemData(d)}
            onAxisClick={(event, d) => setAxisData(d)}
            slotProps={{
              axisLine: { display: "none" },
              axisTick: { display: "none" },
              legend: {
                labelStyle: {
                  fill: "#999999",
                  fontWeight: "500",
                },
              },
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}
