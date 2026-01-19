import React from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  Stack
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

// Example data structure (replace with your actual data)
const exampleSkills = [
  {
    skill: "React",
    employees: [
      { name: "Alice", rating: 4 },
      { name: "Bob", rating: 3 },
      { name: "Charlie", rating: 5 },
      { name: "David", rating: 2 }
    ]
  },
  {
    skill: "Node.js",
    employees: [
      { name: "Eve", rating: 5 },
      { name: "Frank", rating: 2 }
    ]
  },
  {
    skill: "Python",
    employees: [
      { name: "Grace", rating: 3 },
      { name: "Heidi", rating: 4 },
      { name: "Ivan", rating: 2 }
    ]
  },
  {
    skill: "UI/UX",
    employees: [
      { name: "Judy", rating: 5 }
    ]
  }
];

export default function SkillsetAccordion({
  skills = exampleSkills,
  title = "Skillset Distribution"
}) {
  // Sort skills by number of employees descending
  const sortedSkills = [...skills].sort(
    (a, b) => b.employees.length - a.employees.length
  );

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
        backdropFilter: "blur(8px)"
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
          background:
            "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
          zIndex: 1
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
            mb: 2
          }}
        >
          {title}
        </Typography>
        <Box>
          {sortedSkills.map((item) => (
            <Accordion
              key={item.skill}
              sx={{
                mb: 1.5,
                borderRadius: "1rem",
                background: "rgba(240,240,255,0.7)",
                boxShadow: "0 2px 8px 0 rgba(49,14,104,0.04)",
                "&:before": { display: "none" }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#4a0d55" }} />}
                sx={{
                  borderRadius: "1rem",
                  minHeight: 56,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    gap: 2
                  }
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#4a0d55" }}
                >
                  {item.skill}
                </Typography>
                <Chip
                  label={`${item.employees.length} Employee${item.employees.length > 1 ? "s" : ""}`}
                  sx={{
                    background:
                      "linear-gradient(316deg, #310e68 0%, #4a0d55 50%, #5f0f40 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    ml: 2
                  }}
                  size="small"
                />
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {item.employees.map((emp) => (
                    <Box
                      key={emp.name}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 1,
                        borderRadius: "0.7rem",
                        background: "#fff",
                        boxShadow: "0 1px 4px 0 rgba(49,14,104,0.04)",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#4a0d55",
                          color: "#fff",
                          fontSize: 14,
                          width: 32,
                          height: 32,
                        }}
                      >
                        {emp.name[0]}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, color: "#310e68", minWidth: 100 }}>
                        {emp.name}
                      </Typography>
                      <Rating
                        value={emp.rating}
                        readOnly
                        precision={1}
                        max={5}
                        size="small"
                        sx={{
                          color: "#FFD700",
                        }}
                      />
                      <Typography sx={{ color: "#888", fontWeight: 500, ml: 1 }}>
                        {emp.rating}/5
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
