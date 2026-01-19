import React from "react";
import { Box, Paper, Typography, LinearProgress, Stack } from "@mui/material";

// Example data structure (replace with your actual data)
const exampleData = [
  { competency: "Project A", Project: 12, Bench: 3 },
  { competency: "Project B", Project: 8, Bench: 2 },
  { competency: "Project C", Project: 15, Bench: 5 },
  { competency: "Project D", Project: 10, Bench: 9 },
];

const getTotal = (item) => item.Project + item.Bench;

export default function ProjectListCard({ data = exampleData }) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: "1.5rem",
        overflow: "visible",
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 8px 32px 0 rgba(49,14,104,0.10)",
        p: { xs: 2, sm: 4 },
        maxWidth: "100%",
        minWidth: 320,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Gradient accent bar on the left */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 24,
          bottom: 24,
          width: "8px",
          borderRadius: "1.5rem",
          background: "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
          zIndex: 1,
        }}
      />
      <Box sx={{ pl: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#310e68",
            letterSpacing: "0.5px",
            textShadow: "0 2px 8px rgba(49,14,104,0.08)",
            mb: 2,
          }}
        >
          Employee Distribution by Project
        </Typography>
        <Box
          sx={{
            maxHeight: 3 * 92, // 3 cards, each ~92px tall (adjust if needed)
            overflowY: "auto",
            pr: 1, // space for scrollbar
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "8px",
              background: "#ece6f3",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
              borderRadius: "8px",
            },
          }}
        >
          <Stack spacing={2}>
            {data.map((item) => {
              const total = getTotal(item);
              const projectPercent = total ? (item.Project / total) * 100 : 0;
              const benchPercent = total ? (item.Bench / total) * 100 : 0;
              return (
                <Box
                  key={item.competency}
                  sx={{
                    p: 2,
                    borderRadius: "1rem",
                    background: "rgba(240,240,255,0.7)",
                    boxShadow: "0 2px 8px 0 rgba(49,14,104,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#4a0d55" }}>
                      {item.competency}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Total: <b>{total}</b>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={projectPercent}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          background: "#ece6f3",
                          "& .MuiLinearProgress-bar": {
                            background: "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: "#310e68", fontWeight: 600, minWidth: 40, textAlign: "right" }}>
                      {item.Project} <span style={{ fontWeight: 400, color: "#888" }}>On Project</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={benchPercent}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          background: "#fbeaea",
                          "& .MuiLinearProgress-bar": {
                            background: "#f95959",
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: "#f95959", fontWeight: 600, minWidth: 40, textAlign: "right" }}>
                      {item.Bench} <span style={{ fontWeight: 400, color: "#888" }}>On Bench</span>
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
