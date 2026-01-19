import React, { useEffect } from "react";
import { TableWrapperLayout } from "../TableWrapperLayout/TableWrapperLayout";
import { Box } from "@mui/material";
import { ProjectsAccordion } from "./ProjectsAccordion";
import Backdrop from "@mui/material/Backdrop";
import { ClassicSpinner } from "react-spinners-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";
import { useGetAllProjectsQuery } from "../../features/projectApiSlice";

export const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetAllProjectsQuery();

  const handleOpenAdd = () => {
    navigate(`add-project`);
  };

  let projects = [];
  projects = data?.data || [];

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: "Unauthorized access. Please login again.",
          })
        );
        navigate("/login");
      } else if (error.status === 500) {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: "Internal Server Error. Please try again later.",
          })
        );
      } else {
        dispatch(
          showToast({
            severitySnackbar: "error",
            message: error.data?.message || "An error occurred.",
          })
        );
      }
    }
  }, [isError, error, dispatch, navigate]);

  return (
    <>
      <TableWrapperLayout
        label={"Project Management"}
        tableName={"Projects"}
        handleOpenAdd={handleOpenAdd}
      >
        <Box mt={5}>
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
            <ProjectsAccordion projects={projects} />
          )}
        </Box>
      </TableWrapperLayout>
    </>
  );
};
