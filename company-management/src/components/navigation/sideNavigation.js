import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import { Link, useResolvedPath } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Badge as BadgeIcon,
  Groups as GroupsIcon,
  CardMembership as CardMembershipIcon,
  Assignment as AssignmentIcon,
  Engineering as EngineeringIcon,
  InfoOutlined as InfoOutlinedIcon,
  EventAvailable as AttendanceIcon,
  BeachAccess as LeaveIcon,
  ManageAccounts as AdminIcon,
  Face as UserIcon,
  KeyboardArrowRight as OpenIcon,
  KeyboardArrowLeft as CloseIcon,
} from "@mui/icons-material";
import { decodeToken } from "react-jwt";

const SubMenu = ({ title, icon, items, isOpen, handleToggle, isMobile }) => (
  <>
    <ListItem button onClick={handleToggle} sx={getItemStyles(false)}>
      <ListItemIcon>
        {React.cloneElement(icon, { style: { color: "grey" } })}
        {!isMobile ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemIcon>
      {isMobile && <ListItemText primary={title} style={{ color: "gray" }} />}
      {!isMobile ? null : isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List component="div" sx={{ padding: isMobile && "0px 10px 0px 10px" }}>
        {items.map(({ to, text, icon, activePaths }) => {
          const pathname = useResolvedPath().pathname;
          const isActive = activePaths.includes(pathname);
          return (
            <ListItem
              key={text}
              component={Link}
              to={to}
              sx={getItemStyles(isActive)}
            >
              <ListItemIcon>
                {React.cloneElement(icon, {
                  style: { color: getIconColor(isActive) },
                })}
              </ListItemIcon>
              {isMobile && (
                <ListItemText
                  primary={text}
                  style={{ color: isActive ? "black" : "grey" }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  </>
);

const getItemStyles = (isActive) => ({
  backgroundColor: isActive ? "#e8ebfc" : "transparent",
  borderRadius: "10px",
  height: "40px",
  marginBottom: "10px",
  "&:hover": {
    bgcolor: "#e8ebfc",
    borderRadius: "10px",
  },
  border: "none",
});

const getIconColor = (isActive) => (isActive ? "#ab47bc" : "grey");

function SideNav() {
  const authToken = localStorage.getItem("token");
  const tokenDecode = authToken;
  const decodedToken = decodeToken(tokenDecode);
  const labels = decodedToken?.labels;
  const pathname = useResolvedPath();
  const isMobile = useMediaQuery("(max-width:1024px)");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const [isMobileOpen, setIsMobileOpen] = useState(true);

  const [openAdmin, setOpenAdmin] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const handleToggleAdmin = () => setOpenAdmin(!openAdmin);
  const handleToggleUser = () => setOpenUser(!openUser);
  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const menuItems = [
    {
      to: role === "admin" ? "/home/company" : `/home/employee-dashboard/${id}`,
      text: "Dashboard",
      icon: <DashboardIcon />,
      activePaths: [`/home/company`, `/home/employee-dashboard/${id}`],
    },
    {
      to: "/home/company/studio",
      text: "Competency",
      icon: <BadgeIcon />,
      activePaths: ["/home/company/studio", "/home/company/studioprofile"],
    },
    {
      to: "/home/company/employee",
      text: "Employee",
      icon: <GroupsIcon />,
      activePaths: ["/home/company/employee"],
    },
  ];

  const adminSubItems = [
    {
      to: "/home/company/projects",
      text: "Projects",
      icon: <AssignmentIcon fontSize="small" />,
      activePaths: ["/home/company/projects"],
    },
    {
      to: "/home/company/practices",
      text: "Practices",
      icon: <EngineeringIcon fontSize="small" />,
      activePaths: ["/home/company/practices"],
    },
    {
      to: "/home/company/subscription",
      text: "Subscription",
      icon: <CardMembershipIcon fontSize="small" />,
      activePaths: ["/home/company/subscription"],
    },
  ];

  const userSubItems = [
    {
      to: `/home/profile/${id}/attendance`,
      text: "Attendance",
      icon: <AttendanceIcon fontSize="small" />,
      activePaths: [`/home/profile/${id}/attendance`],
    },
    {
      to: "/home/leave",
      text: "Leave",
      icon: <LeaveIcon fontSize="small" />,
      activePaths: ["/home/leave"],
    },
  ];

  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    } else {
      setIsMobileOpen(true);
    }
  }, [isMobile]);

  return (
    <div
      className="dash"
      style={{
        marginTop: "-1rem",
        height: "100vh",
        width: !isMobileOpen ? "5rem" : "16rem",
        padding: "15px",
        paddingTop: "2rem",
        marginRight: "1.5rem",
        position: "fixed",
        zIndex: "10",
      }}
    >
      <List>
        {isMobile && (
          <ListItem
            key={"toggle"}
            component="button"
            onClick={() => toggleMobileOpen()}
            sx={getItemStyles(isMobileOpen)}
          >
            <ListItemIcon>
              {isMobileOpen
                ? React.cloneElement(<CloseIcon fontSize="small" />, {
                    style: { color: getIconColor(isMobileOpen) },
                  })
                : React.cloneElement(<OpenIcon fontSize="small" />, {
                    style: { color: getIconColor(isMobileOpen) },
                  })}
            </ListItemIcon>
            {isMobileOpen && (
              <ListItemText
                primary={"Close"}
                style={{ color: isMobileOpen ? "black" : "grey" }}
              />
            )}
          </ListItem>
        )}
        {menuItems.map(({ to, text, icon, activePaths }) => {
          const isActive = activePaths.includes(pathname.pathname);
          return (
            <ListItem
              key={text}
              component={Link}
              to={to}
              sx={getItemStyles(isActive)}
            >
              <ListItemIcon>
                {React.cloneElement(icon, {
                  style: { color: getIconColor(isActive) },
                })}
              </ListItemIcon>
              {isMobileOpen && (
                <ListItemText
                  primary={text}
                  style={{ color: isActive ? "black" : "grey" }}
                />
              )}
            </ListItem>
          );
        })}

        <SubMenu
          title="Admin"
          icon={<AdminIcon />}
          items={adminSubItems}
          isOpen={openAdmin}
          handleToggle={handleToggleAdmin}
          isMobile={isMobileOpen}
        />

        <SubMenu
          title="User"
          icon={<UserIcon />}
          items={userSubItems}
          isOpen={openUser}
          handleToggle={handleToggleUser}
          isMobile={isMobileOpen}
        />

        <Divider
          className="about-divider"
          style={{ position: "absolute", top: "80vh", width: "100%" }}
        />

        <ListItem
          component={Link}
          to="/home/company/about"
          sx={getItemStyles(pathname.pathname === "/home/company/about")}
          style={{ position: "absolute", top: "81vh" }}
        >
          <ListItemIcon>
            <InfoOutlinedIcon
              style={{
                color:
                  pathname.pathname === "/home/company/about"
                    ? "#ab47bc"
                    : "grey",
              }}
            />
          </ListItemIcon>
          {isMobileOpen && (
            <ListItemText
              primary="About"
              style={{
                color:
                  pathname.pathname === "/home/company/about"
                    ? "black"
                    : "grey",
              }}
            />
          )}
        </ListItem>
      </List>
    </div>
  );
}

export default SideNav;
