import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Button,
  Typography,
  Divider,
  Box,
  Card,
  Backdrop,
} from "@mui/material";
import SkillModal from "./SkillModal";
import Chip from "@mui/material/Chip";
import { ClassicSpinner } from "react-spinners-kit";
import { getCompetencyByName } from "../../services/competencyService";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../features/toastSlice";
import {
  useDeleteEmployeeSkillMutation,
  useGetEmployeeSkillsQuery,
} from "../../features/employeeSkillAPI";
import {
  setSkillsToEmployee,
  removeSkillFromEmployee,
} from "../../features/employeeSkillSlice";

const useStyle = makeStyles((theme) => ({
  card: {
    backgroundColor: "gray",
    minWidth: 70,
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  about: {
    padding: 18,
  },
  cardsHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillLegendContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  legendContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignItems: "baseline",
  },
  beginnerLegend: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "blue",
  },
  intermediateLegend: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "orange",
  },
  advanceLegend: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "green",
  },
}));
export default function EmployeeSkills({ editButton, employeeData }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [openSkillEditModal, setOpenSkillEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleSkillOpen = () => setOpenSkillEditModal(true);
  const handleSkillClose = () => setOpenSkillEditModal(false);
  const employeeId = employeeData?.id;
  const [studioId, setStudioId] = useState();
  const {
    data: skillData,
    isLoading: skillDataLoading,
    isError,
    error,
  } = useGetEmployeeSkillsQuery(employeeId);
  const [deleteSkill] = useDeleteEmployeeSkillMutation();

  const employeeSkills = useSelector((state) => state.employeeSkill.skillSet);

  const getCompetencyId = async () => {
    try {
      const data = await getCompetencyByName({
        competency_name: employeeData?.studio_name,
      });
      setStudioId(data?.data?.id);
    } catch (err) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${err.message}` })
      );
    }
  };

  const getEmployeeSkills = async () => {
    try {
      getCompetencyId();
    } catch (err) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${err.message}` })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id).unwrap();
      dispatch(removeSkillFromEmployee(id));
    } catch (error) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.data.message}` })
      );
    }
  };

  useEffect(() => {
    getEmployeeSkills();
    if (skillData) {
      dispatch(setSkillsToEmployee(skillData.data));
    }
    if (isError) {
      dispatch(
        showToast({ severitySnackbar: "error", message: `${error.data.message}` })
      );
    }
  }, [skillData, isError, error, dispatch]);

  return (
    <div>
      <Card className={`${classes.card} emp_edit_card`} sx={{ boxShadow: 3 }}>
        <Box className={classes.cardsHead} my={1}>
          <Typography variant="h5">Skills</Typography>
          {editButton && (
            <Button
              onClick={handleSkillOpen}
              sx={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Add
            </Button>
          )}
        </Box>
        {loading || skillDataLoading ? (
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
            <ClassicSpinner size={70} color="#000" loading={loading} />
          </Backdrop>
        ) : (
          <>
            {openSkillEditModal && (
              <SkillModal
                employeeData={employeeData}
                studioId={studioId}
                openProfileEditModal={openSkillEditModal}
                onHandleClose={handleSkillClose}
              />
            )}

            <Divider
              className="employee-devider"
              sx={{ marginBottom: 2 }}
            ></Divider>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }} my={2}>
              {employeeSkills.map((item, index) => (
                <Chip
                  label={item.skill_name}
                  variant="outlined"
                  onDelete={
                    editButton ? () => handleDelete(item.id) : undefined
                  }
                  key={item.id}
                  style={{
                    backgroundColor:
                      item.level > 4
                        ? "green"
                        : item.level >= 3
                        ? "orange"
                        : "blue",
                    color: "white",
                  }}
                />
              ))}
            </Box>
          </>
        )}
        <Box className={classes.skillLegendContainer} my={1}>
          <Box className={classes.legendContainer}>
            <Box className={classes.beginnerLegend}></Box>
            <Typography fontSize={12}>Beginner</Typography>
          </Box>
          <Box className={classes.legendContainer}>
            <Box className={classes.intermediateLegend}></Box>
            <Typography fontSize={12}>Intermediate</Typography>
          </Box>
          <Box className={classes.legendContainer}>
            <Box className={classes.advanceLegend}></Box>
            <Typography fontSize={12}>Advance</Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
}
