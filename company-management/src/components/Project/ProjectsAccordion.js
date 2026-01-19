import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
  Avatar,
  AvatarGroup,
  AccordionActions,
  Menu,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  projectAccordionSummery: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: "1rem",
    padding: "1rem",
    gap: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: "inherit !important",
  },
  projectTitle: { color: "#999999" },
  projectAccordionDetails: { marginLeft: "1rem" },
  noHistory: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "10px",
    height: "35vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, .125)"
  },
  gradientBorder: {
    borderBottom: "1px solid",
    borderImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) 1",
  },
  gradientBackground: {
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
    color: "white",
  },
}));

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const ProjectsAccordion = ({ projects }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const designatedMember = (team, designation) => {
    const searchedMember = team.find((member) => member.role === designation);
    return `${searchedMember?.first_name || ""} ${
      searchedMember?.last_name || ""
    }`;
  };

  const otherMembers = (team) => {
    return team.filter(
      (member) =>
        member.role !== "Project Manager" && member.role !== "Team Lead"
    );
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleMenuClick = (event, project) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleEdit = () => {
    if (selectedProject) {
      navigate(`edit-project/${selectedProject.projectId}`);
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedProject) {
      navigate(`projectStatistics/${selectedProject.projectId}`);
    }
    handleMenuClose();
  };

  return (
    <div>
      {projects.length === 0 ? (
        <Box className={classes.noHistory}>
          <Typography variant="h6" fontWeight={500}>
            No Projects to show
          </Typography>
        </Box>
      ) : (
        projects.map((project, index) => (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="paperclass"
            key={project.title}
            sx={{ borderBottom: "1px solid" }}
            classes={{ root: classes.gradientBorder }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#999" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                borderBottom: "1px solid",
                borderImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%) 1",
                "&:hover": {
                  backgroundColor: "#e8ebfc",
                },
              }}
            >
              <Paper
                className={`${classes.projectAccordionSummery} paperclass`}
                elevation={0}
              >
                <Box width={200}>
                  <Typography className={classes.projectTitle} variant="p">
                    {`${project.title}`}
                  </Typography>
                  <Typography className="title">
                    {new Date(project.start_date).toLocaleDateString(
                      "en-IN",
                      options
                    )}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.projectTitle} variant="title">
                    Project Manager
                  </Typography>
                  <Typography className="title">
                    {designatedMember(project.project_team, "Project Manager")}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography className={classes.projectTitle} variant="title">
                    Team Lead
                  </Typography>
                  <Typography className="p">
                    {designatedMember(project.project_team, "Team Lead")}
                  </Typography>
                </Box>
                <Box width={150}>
                  <Typography className={classes.projectTitle} variant="title">
                    Developers
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AvatarGroup
                      total={otherMembers(project.project_team).length}
                      sx={{
                        "& .css-17o22dy-MuiAvatar-root ": {
                          width: "30px !important",
                          height: "30px !important",
                          fontSize: "1rem",
                        },
                      }}
                    >
                      {otherMembers(project.project_team)
                        .slice(0, 3)
                        .map((dev, index) => (
                          <Avatar
                            key={dev.employee_id}
                            style={{
                              width: "30px",
                              height: "30px",
                              fontSize: "1rem",
                            }}
                            src={`/static/images/avatar/1.jpg`}
                            {...stringAvatar(
                              `${dev.first_name} ${dev.last_name || "NA"}`
                            )}
                            className={classes.gradientBackground}
                          />
                        ))}
                    </AvatarGroup>
                  </Box>
                </Box>
                <Box width={150}>
                  <Typography className={classes.projectTitle} variant="title">
                    Status
                  </Typography>
                  <Typography className="title">{project.status}</Typography>
                </Box>
                <Box width={150}>
                  <Typography className={classes.projectTitle} variant="title">
                    Timeline
                  </Typography>
                  <Typography className="title">
                    {project.timeline?.charAt(0).toUpperCase() +
                      project.timeline?.slice(1)}
                  </Typography>
                </Box>
              </Paper>
              <AccordionActions>
                <IconButton
                  onClick={(e) => handleMenuClick(e, project)}
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleView}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                    View
                  </MenuItem>
                </Menu>
              </AccordionActions>
            </AccordionSummary>

            <AccordionDetails>
              <Paper
                className={`${classes.projectAccordionDetails} paperclass`}
                elevation={0}
              >
                <Typography className="h6" variant="h6">
                  Description:
                </Typography>
                <Typography className="title" variant="span">
                  {project.description}
                </Typography>
                <br />
                <br />
                <Typography className="h6" variant="body1" fontWeight={500}>
                  Duration:
                </Typography>
                <Typography className="title" variant="span">
                  {project.duration}
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};
