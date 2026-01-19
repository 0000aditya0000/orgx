import React, { useEffect, useState } from "react";
import StickyTable from "../table/StickyTable";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import EditPractice from "./EditPractice";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import { TableWrapperLayout } from "../TableWrapperLayout/TableWrapperLayout";
import ToggleTable from "./../toggle/Toggle";
import { useNavigate } from "react-router-dom";
import PraticeModal from "./practiceModal";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useGetPracticeQuery } from "../../features/practiceApiSlice";
import { BASE_URL } from "../../services/apiClient";
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

const Practice = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const authToken = localStorage.getItem("token");
  const { data, isLoading, refetch } = useGetPracticeQuery();
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opening, setOpening] = useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
    
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const editData = (item) => {
    setDataEdit({
      data: item
    });
  };
  const handleCloseOfEdit = () => {
    setOpening(false);
  };
  const handleMenuClick = (event, practice, fullItem) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedPractice(fullItem || practice);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudio(null);
  };
  const handleView = () => {
    if (selectedPractice) {
      profilePageHandler(selectedPractice.practice_id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedPractice) {
    setOpening(true);
      editData(selectedPractice);
    }
    handleMenuClose();
  };
  const handleCompleteAdd = (e) => {
    if (e.ok) {
      dispatch(
        showToast({
          severitySnackbar: "success",
          message: "Practice Added Successfully",
        })
      );
      refetch();
    } else {
      dispatch(
        showToast({ severitySnackbar: "error", message: "Practice not Added" })
      );
    }
  };
  const handleCompleteEdit = (res) => {
    if (res.ok) {
      dispatch(
        showToast({
          severitySnackbar: "success",
          message: "Studio edited Successfully",
        })
      );
    } else {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: "Studio not edited Successfully",
        })
      );
    }
  };
  const confirmDeleteActionHandler = async (practiceData, value) => {
    const newData = {
      practice_code: practiceData.practice_code,
      practice_title: practiceData.practice_title,
      practice_total_competency: practiceData.practice_total_competency,
      practice_head: practiceData.practice_head,
      status: value === "enable" ? "enable" : "disable",
    };
    await fetch(
      `${BASE_URL}/studios/${practiceData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          tenant_code: "nashtech",
        },
        body: JSON.stringify(newData),
      }
    ).then((e) => {
      if (e.ok) {
        dispatch(
          showToast({
            severitySnackbar: "success",
            message:
              value === "disabled"
                ? "Studio Disabled Successfully"
                : "Studio Enabled Successfully",
          })
        );
      } else {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message:
              value === "enable" ? "Studio not disabled" : "Studio not enabled",
          })
        );
      }
    });
    refetch();
  };
  const switchEnableHandler = (value, item) => {
    if (value === "enable") {
      confirmDeleteActionHandler(item, value);
    } else {
      confirmDeleteActionHandler(item, value);
    }
  };
  const closeDeleteActionHandler = () => {
    setOpen(false);
  }
  const navigate = useNavigate();
  const profilePageHandler = (practice_id) => {
    navigate(`/home/company/practices/${practice_id}`);
  };
  const columns = [
    { id: "practice_title", label: "Practices", minWidth: 300 },
    {
      id: "practice_total_competency",
      label: "Total Competency",
      minWidth: 300,
    },
    { id: "practice_head", label: "Practice Head", minWidth: 300 },
    { id: "status", label: "Status", minWidth: 300 },
    { id: "actions", label: "Actions", minWidth: 180 },
  ];
  let practiceStateData = data?.data;
  let practiceStateList = [];
  if (practiceStateData != null) {
    practiceStateList = practiceStateData.map((item) => {
      const practice_title = item.title;
      const practice_head = item.studio_head;
      const practice_total_competency = item.total_employee;
      const practice_id = item.id;
      const groupPractice = (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <AvatarGroup
            total={practice_total_competency}
            sx={{
              "& .css-17o22dy-MuiAvatar-root ": {
                width: "30px !important",
                height: "30px !important",
                fontSize: "1rem",
              },
            }}
          >
            <Avatar
              style={{ width: "30px", height: "30px", fontSize: "1rem" }}
              src={item.image}
              {...stringAvatar("Front End")}
            />
            <Avatar
              style={{ width: "30px", height: "30px", fontSize: "1rem" }}
              src={item.image}
              {...stringAvatar("Artificial Intelligence")}
            />
            <Avatar
              style={{ width: "30px", height: "30px", fontSize: "1rem" }}
              src={item.image}
              {...stringAvatar("Test Automation ")}
            />
          </AvatarGroup>
        </Box>
      );
      const status = (
        <Tooltip title={item.status === "active" ? "Active" : "Inactive"}>
          <ToggleTable
            status={item.status === "active"}
            handleSwitch={() =>
              switchEnableHandler(
                item.status === "enable" ? "disable" : "enable",
                item
              )
            }
          />
        </Tooltip>
      );

      return {
        ...item,
        practice_title,
        practice_id,
        practice_head,
        practice_total_competency: groupPractice,
        status,
        actions: (
          <Box>
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, { practice_title, practice_id, practice_head, practice_total_competency, status }, item)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleView}>
                <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                View
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                Edit
              </MenuItem>
            </Menu>
          </Box>
        ),
      };
    });
  }

  return (
    <>
      <TableWrapperLayout
        label="Practice Management"
        tableName="Practice"
        onHandleEditEmployee={handleEditOpen}
        handleOpenAdd={handleOpenAdd}
      >
        {isLoading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "initial",
              height: "10rem",
              marginTop: "1rem",
              background: "transparent",
            }}
            open
          >
            <ClassicSpinner size={70} color="#000" loading={isLoading} />
          </Backdrop>
        ) : (
          <StickyTable
            columns={columns}
            rows={practiceStateList}
            filter="location"
            tableName="Practice"
          />
        )}
      </TableWrapperLayout>

      {openAdd && (
        <PraticeModal
          openModal={openAdd}
          handleClose={handleAddClose}
          buttonName={"Save"}
          practiceData={handleCompleteAdd}
          modalType={"add"}
        />
      )}
      {openEdit && (
        <EditPractice
          code={dataEdit.studio_code}
          name={dataEdit.studio_name}
          email={dataEdit.studioAdmin_email}
          status={dataEdit.status}
          id={dataEdit.studio_id}
          openEdit={openEdit}
          handleEditClose={handleEditClose}
          onEditQuestionComplete={(e) => handleCompleteEdit(e)}
        />
      )}
      {opening && (
        <PraticeModal
          openModal={opening}
          handleClose={handleCloseOfEdit}
          buttonName={"Update"}
          modalType={"edit"}
          practiceData={dataEdit}
          onUpdateSuccess={refetch}
        />
      )}
    </>
  );
};

export default Practice;
