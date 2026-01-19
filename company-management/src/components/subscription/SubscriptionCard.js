import React from "react";
import { Box, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import { styled } from "@mui/material/styles";

// Add a styled Box for glassmorphism effect
const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: "1.5rem",
  padding: "2rem",
  background: "rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.18)",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  transition: "box-shadow 0.3s, transform 0.3s",
  "&:hover": {
    boxShadow: "0 12px 32px 0 rgba(31, 38, 135, 0.45)",
    transform: "scale(1.03)",
  },
  width: { xs: '100%', sm: 'calc(50% - 1.25rem)', md: 'calc(33.33% - 1.66rem)' },
  flexShrink: 0,
  maxWidth: 400,
  minWidth: 300,
  minHeight: 450,
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    gap: "1rem",
    minHeight: 'auto',
  },
}));

const PlanBadge = styled(Box)(({ theme, color }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  background: color,
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1rem",
  borderRadius: "2rem",
  padding: "0.4rem 1.2rem",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: "0.3rem 0.8rem",
  },
}));

const FeatureItem = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1rem",
  color: "#222",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.95rem",
  },
}));

function SubscriptionCard(props) {
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };
  const features = [
    "10 Users",
    "10 GB Storage",
    "Unlimited Projects",
    "Unlimited Reports",
  ];
  let iconColor;
  if (props.data.planName === "Gold") {
    iconColor = "#FFD700";
  } else if (props.data.planName === "Platinum") {
    iconColor = "#b3e0ff";
  } else if (props.data.planName === "Silver") {
    iconColor = "#C0C0C0";
  } else {
    iconColor = "#7f7fff";
  }

  // Responsive color for badge
  let badgeColor = iconColor;

  // Set Gold as the active plan for now
  const isActive = props.data.planName === "Gold";

  return (
    <GlassCard>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: "0.5rem", sm: "2rem" },
          }}
        >
          <PlanBadge color={badgeColor}>
            <MilitaryTechIcon fontSize="medium" sx={{ color: "#fff" }} />
            {props.data.planName}
            {isActive && (
              <CheckCircleOutlineIcon sx={{ ml: 1, color: "#4caf50" }} />
            )}
          </PlanBadge>
          <Typography sx={{ color: "#444", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <AccessTimeIcon fontSize="small" sx={{ color: "#888" }} /> {`${props.data.planDuration} months`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: "0.5rem", sm: "2rem" },
            marginTop: "1.2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#222",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyRupeeIcon fontSize="medium" />
            {props.data.price}
          </Typography>
          <Typography sx={{ color: "#666", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <GroupsIcon fontSize="small" sx={{ color: "#888" }} />
            {`${props.data.numberOfEmployees} employees`}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          component="div"
          sx={{
            mt: 2,
            mb: 0,
            ml: 0,
            color: "#333",
            fontSize: { xs: "0.98rem", sm: "1.05rem" },
            minHeight: "2.5rem",
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
          dangerouslySetInnerHTML={renderHTML(props.data.planDescription)}
        />
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        mt: 2,
      }}>
        <Box component="ul" sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.7rem",
        }}>
          {features.map((item) => (
            <li key={item}>
              <FeatureItem component="span">
                <CheckCircleIcon fontSize="small" sx={{ color: "#4caf50" }} /> {item}
              </FeatureItem>
            </li>
          ))}
        </Box>
        {!isActive && (
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "2rem",
              px: 3,
              py: 1.2,
              fontSize: "1rem",
              boxShadow: "0 2px 8px 0 rgba(49,14,104,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              mt: 1,
              "&:hover": {
                background: "#fff",
                color: "#310e68",
                border: "2px solid #310e68",
              },
            }}
          >
            Upgrade <ArrowForwardIcon fontSize="small" />
          </Button>
        )}
      </Box>
    </GlassCard>
  );
}

export default SubscriptionCard;
