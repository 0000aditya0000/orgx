import React, { useEffect, useState } from "react";
import StickyTable from "../table/StickyTable";
import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditDialog from "./EditDialog";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import { TableWrapperLayout } from "../TableWrapperLayout/TableWrapperLayout";
import ToggleTable from "../toggle/Toggle";
import { useNavigate } from "react-router-dom";
import StudioModal from "../studioSummary/StudioModal";
import { getCompetencies } from "../../services/competencyService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useGetAllCompetencyQuery,useGetCompetencyByIdQuery } from "../../features/competencyApi";

const Studio = () => {
  const columns = [
    { id: "studio_name", label: "Competency", minWidth: 300 },
    { id: "studio_code", label: "Code", minWidth: 300 },
    { id: "studioAdmin_email", label: "Email", minWidth: 300 },
    { id: "status", label: "Status", minWidth: 300 },
    { id: "actions", label: "Actions", minWidth: 180 },
  ];
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const authToken = localStorage.getItem("token");
  const [selectedId, setSelectedId] = useState(null);
  const {data, isLoading} = useGetAllCompetencyQuery();
  const {data: competencyByIdData} = useGetCompetencyByIdQuery(selectedId, {
    skip: !selectedId
  });
  const [studioData, setStudioData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (competencyByIdData) {
      setStudioData(competencyByIdData);
      setIsEditMode(true);
      setOpenModal(true);
      handleMenuClose();
    }
  }, [competencyByIdData]);

  const handleOpenModal = () => {
    setDataEdit(null); // Clear dataEdit when adding new
    setStudioData(null); // Clear studioData when adding new
    setIsEditMode(false);
    setSelectedId(null);
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setStudioData(null);
    setIsEditMode(false);
    setSelectedId(null);
  };
  const handleMenuClick = (event, studio) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedStudio(studio);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudio(null);
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedStudio) {
      profilePageHandler(selectedStudio.studio_id);
    }
    handleMenuClose();
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

  const confirmDeleteActionHandler = async (studioData, value) => {
    const newData = {
      studio_code: studioData.studio_code,
      studio_name: studioData.studio_name,
      studioAdmin_email: studioData.studioAdmin_email,
      status: value === "enable" ? "enable" : "disable",
    };
    await fetch(
      `https://microfeapi.azurewebsites.net/studios/${studioData.studio_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newData),
      }
    ).then((e) => {
      if (e.ok) {
        dispatch(
          showToast({
            severitySnackbar: "success",
            message:
              value === "disable"
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
        getInfo();
      }
    });
  };
  const switchEnableHandler = (value, item) => {
    if (value === "enable") {
      confirmDeleteActionHandler(item, value);
    } else {
      confirmDeleteActionHandler(item, value);
    }
  };

  const navigate = useNavigate();
  const profilePageHandler = (id) => {
    navigate(`/home/company/studioprofile/${id}`);
  };
  let studioStateData = data?.data;
  let studioStateList = [];
  if (studioStateData != null) {
    studioStateList = studioStateData.map((item) => {
      const studio_name = item.competency_name;
      const studio_code = item.competency_code;
      const studio_id = item.id;
      const studioAdmin_email = item.competency_admin_email;
      const status = (
        <Tooltip title={item.status === "active" ? "Active" : "Inactive"}>
          <ToggleTable
            status={item.status === "active"}
            handleSwitch={() =>
              switchEnableHandler(
                item.status === "active" ? "disable" : "enable",
                item
              )
            }
          />
        </Tooltip>
      );
      return {
        ...item,
        studio_name,
        studio_code,
        studioAdmin_email,
        status,
        studio_id,
        actions: (
          <Box>
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, { studio_id, studio_name, studio_code, studioAdmin_email })}
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
              <MenuItem onClick={() => handleEdit(item)}>
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
        label="Competency Management"
        tableName="Competency"
        handleOpenAdd={handleOpenModal}
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
            rows={studioStateList}
            tableName="Competency"
            addButton={true}
          />
        )}
      </TableWrapperLayout>
      {openModal && (
        <StudioModal
          open={openModal}
          handleClose={handleCloseModal}
          onhandlesubmitButton={isEditMode ? "Update" : "SAVE"}
          modalData={studioData}
          competencyId={selectedId}
        />
      )}
    </>
  );
};

export default Studio;
