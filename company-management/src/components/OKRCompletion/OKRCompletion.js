import React from "react";
import { Box, Paper, Typography, Avatar, Stack, Chip } from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

// Example data (replace with your actual data)
const employeesOnLeave = [
  { name: "Alice Johnson", designation: "Frontend Developer" },
  { name: "Bob Smith", designation: "Backend Developer" },
  { name: "Charlie Lee", designation: "UI/UX Designer" },
  { name: "Alice Johnson", designation: "Frontend Developer" },
  { name: "Bob Smith", designation: "Backend Developer" },
  { name: "Charlie Lee", designation: "UI/UX Designer" },
];

export default function OKRCompletion({ data = employeesOnLeave }) {
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
          Employees on Leave
        </Typography>
        {data.length === 0 ? (
          <Typography sx={{ color: "#888", fontWeight: 500, mt: 2 }}>
            No employees are on leave today.
          </Typography>
        ) : (
          <Box
            sx={{
              maxHeight: 280, // 3 users * 68px per user
              overflowY: "auto",
              pr: 1,
              overflowX: "hidden",
              scrollbarWidth: "none", // For Firefox
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
                display: "none",
              },
            }}
          >
            <Stack spacing={2}>
              {data.map((emp) => (
                <Box
                  key={emp.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: "1rem",
                    background: "rgba(240,240,255,0.7)",
                    boxShadow: "0 2px 8px 0 rgba(49,14,104,0.04)",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#4a0d55",
                      color: "#fff",
                      fontWeight: 700,
                      width: 44,
                      height: 44,
                      fontSize: 20,
                    }}
                  >
                    {emp.name[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: "#310e68" }}>
                      {emp.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
                    }}
                  >
                    <BeachAccessIcon sx={{ color: "#fff" }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
