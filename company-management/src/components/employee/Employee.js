import React, { useState, useEffect } from "react";
import StickyTable from "../table/StickyTable";
import cardDatas from "./cardData.json";
import { Box, Button, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import ToggleTable from "../toggle/Toggle";
import { TableWrapperLayout } from "../TableWrapperLayout/TableWrapperLayout";
import { useNavigate } from "react-router-dom";
import employeeDetails from "./employeeDetails.json";
import { AddEmployeeDrawr } from "./AddEmployeeDrawr";
import UploadFileModal from "./UploadFileModal";
import { getCompetencies } from "../../services/competencyService";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import {
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../features/employeeAPISlice";

const Employee = () => {
  const columns = [
    { id: "employee_id", label: "Id", minWidth: 180 },
    { id: "employee_name", label: "Name", minWidth: 300 },
    { id: "studio_name", label: "Competency", minWidth: 300 },
    { id: "employee_email", label: "Email", minWidth: 300 },
    { id: "status", label: "Status", minWidth: 300 },
    { id: "actions", label: "Actions", minWidth: 180 },
  ];
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  const [openProfileEditModal, setOpenProfileEditModal] = useState(false);
  const handleProfileOpen = () => setOpenProfileEditModal(true);
  const handleProfileClose = () => setOpenProfileEditModal(false);
  const navigate = useNavigate();
  const [studio, setStudio] = useState([]);
  const handleUploadModal = () => setUploadModal(true);
  const handleCloseUploadModal = () => setUploadModal(false);
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetAllEmployeesQuery();
  const [statusToggle, { isLoading: changingStatus }] =
    useUpdateEmployeeMutation();
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const editData = (item) => {
    setDataEdit(item);
  };

  const navigateEdit = (item) => {
    const defaultTab = { index: 0 };
    navigate(`/home/company/employee/${item}`, { state: defaultTab });
  };

  const switchEnableHandler = (value, item) => {
    if (value === "active") {
      confirmDeleteActionHandler(item, value);
    } else {
      confirmDeleteActionHandler(item, value);
    }
  };
  const confirmDeleteActionHandler = async (employeeData, value) => {
    const newData = {
      ...employeeData,
      status: value === "active" ? "active" : "inactive",
    };
    await statusToggle(employeeData.id, newData)
      .unwrap()
      .then((e) => {
        if (e.data) {
          dispatch(
            showToast({
              severitySnackbar: "success",
              message:
                value === "inactive"
                  ? "Employee Disabled Successfully"
                  : "Studio Enabled Successfully",
            })
          );
          fetchCompetency();
        }
      })
      .catch((err) => {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message:
              value === "active"
                ? "Employee not disabled"
                : "Employee not enabled",
          })
        );
      });
    getInfo();
  };
  const openConfirmationDialogHandler = () => {
    setOpen(true);
  };
  const closeDeleteActionHandler = () => {
    setOpen(false);
  };

  async function fetchCompetency() {
    try {
      const competencies = await getCompetencies();
      setStudio(competencies.data);
    } catch (err) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${err.message}` })
      );
    }
  }


  const getInfo = async function getInfo1() {
    try {
      fetchCompetency();
    } catch (err) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${err.message}` })
      );
    }
  };
  const callGetInfo = () => {
    setLoading(true);
    getInfo();
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `${error.data?.message}`,
        })
      );
    }
  }, [isError]);

  useEffect(async () => {
    getInfo();
  }, []);
  let employeeStateData = data?.data;

  let employeeStateList = [];
  if (employeeStateData != null) {
    employeeStateList = employeeStateData.map((item) => {
      const employee_id = item.id;
      const employee_name = item.first_name;
      const studio_name = item.studio_name || "Not Assigned";
      const employee_email = item.email;

      const status = (
        <Tooltip title={item.status === "active" ? "Active" : "Inactive"}>
          <ToggleTable
            status={item.status === "active"}
            handleSwitch={() =>
              switchEnableHandler(
                item.status === "active" ? "inactive" : "active",
                item
              )
            }
          ></ToggleTable>
        </Tooltip>
      );
      return {
        ...item,
        employee_id,
        employee_name,
        studio_name,
        employee_email,
        status,
        actions: (
          <Box>
            <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                navigateEdit(employee_id);
                setOpenEdit(true);

                editData(item);
              }}
              sx={{ paddingTop: "0px", paddingBottom: "0px" }}
              aria-label="edit"
            >
              <Tooltip title={"Edit"}>
                <OpenInNewIcon fontSize="medium" sx={{ color: "#42a5f5" }} />
              </Tooltip>
            </Button>
            {/* <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                openConfirmationDialogHandler();
                setDeleteQuestion(item);
              }}
              sx={{ paddingTop: "0px", paddingBottom: "0px", color: 'rgb(255, 86, 80)' }}
            >
              <Tooltip title={"Delete"}>
                <Box sx={{
                  display: "inline-block",
                  borderRadius: "60px",
                  boxShadow: "0 0 2px #888",
                  padding: "0.5em 0.6em"
                }} >
                  <DeleteIcon sx={{ color: 'red' }} />
                </Box>
              </Tooltip>
            </Button> */}
          </Box>
        ),
      };
    });
  }
  return (
    <>
      <TableWrapperLayout
        label="Employee Management"
        tableName="Employee"
        onHandleEditEmployee={navigateEdit}
        handleOpenAdd={handleProfileOpen}
        handleUploadFile={handleUploadModal}
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
            data-testid="ClassicSpinner"
          >
            <ClassicSpinner size={70} color="#000" loading={isLoading} />
          </Backdrop>
        ) : (
          <StickyTable
            columns={columns}
            rows={employeeStateList}
            tableName="Employee"
            onHandleEditEmployee={navigateEdit}
          />
        )}
      </TableWrapperLayout>
      {openProfileEditModal && (
        <AddEmployeeDrawr
          openProfileEditModal={openProfileEditModal}
          onHandleClose={handleProfileClose}
          isUpdated={getInfo}
          studio={studio}
        />
      )}

      {/* {openEdit && (
        <EditDialog
          code={dataEdit.studio_name}
          name={dataEdit.employee_name}
          email={dataEdit.employee_email}
          status={dataEdit.status}
          id={dataEdit.employee_id}
          openEdit={openEdit}
          loading={loading}
          getInfo={getInfo}
          handleEditClose={handleEditClose}
          onEditQuestionComplete={(e) => handleCompleteEdit(e)}
        />
        
      )} */}
      {open && (
        <ConfirmationDialog
          title={`Are You Sure`}
          body={`You want to delete this employee? `}
          open={open}
          onConfirmAction={confirmDeleteActionHandler}
          onCancelAction={closeDeleteActionHandler}
          cancelLabel={`Cancel`}
          confirmLabel={`Confirm`}
        />
      )}

      {uploadModal && (
        <UploadFileModal
          open={uploadModal}
          onHandleClose={handleCloseUploadModal}
          getInfo={callGetInfo}
        />
      )}
    </>
  );
};

export default Employee;
