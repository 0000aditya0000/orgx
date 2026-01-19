import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";
import { Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useGetSkillMatrixQuery } from "../../features/employeeSkillAPI";
import { useGetAllSkillsQuery } from "../../features/skillApiSlice";
import { showToast } from "../../features/toastSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
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
    borderRadius: "25%",
    backgroundColor: "#03AED2",
  },
  intermediateLegend: {
    width: 10,
    height: 10,
    borderRadius: "25%",
    backgroundColor: "#FFA62F",
  },
  advanceLegend: {
    width: 10,
    height: 10,
    borderRadius: "25%",
    backgroundColor: "#A5DD9B",
  },
}));

export default function SkillStatistics({
  year,
  quarter,
  handleSkillForFilter,
  filterSkill,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState([
    { skillName: "", totalBeginner: 0, totalIntermediate: 0, totalAdvanced: 0 },
  ]);
  const {
    data: skillMatrix,
    isLoading,
    isError,
    error,
  } = useGetSkillMatrixQuery();

  const { data: skills, isLoading: loadingSkills } = useGetAllSkillsQuery();
  const [dataset, setDataset] = React.useState([
    {
      2024: [],
      2023: [
        {
          skill: "Java",
          beginner: 20,
          intermediate: 55,
          expert: 40,
        },
        {
          skill: "JS",
          beginner: 30,
          intermediate: 10,
          expert: 50,
        },
        {
          skill: "Python",
          beginner: 35,
          intermediate: 54,
          expert: 28,
        },
        {
          skill: "C#",
          beginner: 55,
          intermediate: 35,
          expert: 40,
        },
        {
          skill: "Kotlin",
          beginner: 15,
          intermediate: 40,
          expert: 20,
        },
        {
          skill: "Scala",
          beginner: 50,
          intermediate: 20,
          expert: 40,
        },
        {
          skill: ".NET",
          beginner: 22,
          intermediate: 45,
          expert: 40,
        },
        {
          skill: "WEB-3",
          beginner: 5,
          intermediate: 15,
          expert: 50,
        },
        {
          skill: "Rust",
          beginner: 35,
          intermediate: 30,
          expert: 40,
        },
        {
          skill: "Data Science",
          beginner: 18,
          intermediate: 20,
          expert: 15,
        },
        {
          skill: "M L",
          beginner: 10,
          intermediate: 8,
          expert: 35,
        },
        {
          skill: "ReactJs",
          beginner: 8,
          intermediate: 6,
          expert: 35,
        },
        {
          skill: "Angular",
          beginner: 6,
          intermediate: 4,
          expert: 32,
        },
      ],
      "Q1-FMA24": [
        { skill: "Java", beginner: 25, intermediate: 50, expert: 45 },
        { skill: "JS", beginner: 35, intermediate: 15, expert: 55 },
        { skill: "Python", beginner: 40, intermediate: 60, expert: 30 },
        { skill: "C#", beginner: 60, intermediate: 40, expert: 45 },
        { skill: "Kotlin", beginner: 20, intermediate: 45, expert: 25 },
        { skill: "Scala", beginner: 55, intermediate: 25, expert: 45 },
        { skill: ".NET", beginner: 24, intermediate: 50, expert: 45 },
        { skill: "WEB-3", beginner: 6, intermediate: 18, expert: 55 },
        { skill: "Rust", beginner: 40, intermediate: 35, expert: 45 },
        { skill: "Data Science", beginner: 22, intermediate: 25, expert: 20 },
        { skill: "M L", beginner: 15, intermediate: 12, expert: 40 },
        { skill: "ReactJs", beginner: 12, intermediate: 10, expert: 40 },
        { skill: "Angular", beginner: 8, intermediate: 6, expert: 35 },
      ],
      "Q2-FMA24": [
        { skill: "Java", beginner: 30, intermediate: 60, expert: 50 },
        { skill: "JS", beginner: 40, intermediate: 20, expert: 60 },
        { skill: "Python", beginner: 45, intermediate: 70, expert: 35 },
        { skill: "C#", beginner: 65, intermediate: 45, expert: 50 },
        { skill: "Kotlin", beginner: 25, intermediate: 50, expert: 30 },
        { skill: "Scala", beginner: 60, intermediate: 30, expert: 50 },
        { skill: ".NET", beginner: 26, intermediate: 55, expert: 50 },
        { skill: "WEB-3", beginner: 7, intermediate: 20, expert: 60 },
        { skill: "Rust", beginner: 45, intermediate: 40, expert: 50 },
        { skill: "Data Science", beginner: 25, intermediate: 30, expert: 25 },
        { skill: "M L", beginner: 20, intermediate: 15, expert: 45 },
        { skill: "ReactJs", beginner: 15, intermediate: 12, expert: 45 },
        { skill: "Angular", beginner: 10, intermediate: 8, expert: 40 },
      ],
      "Q3-FMA24": [
        { skill: "Java", beginner: 35, intermediate: 70, expert: 55 },
        { skill: "JS", beginner: 45, intermediate: 25, expert: 65 },
        { skill: "Python", beginner: 50, intermediate: 80, expert: 40 },
        { skill: "C#", beginner: 70, intermediate: 50, expert: 55 },
        { skill: "Kotlin", beginner: 30, intermediate: 55, expert: 35 },
        { skill: "Scala", beginner: 65, intermediate: 35, expert: 55 },
        { skill: ".NET", beginner: 28, intermediate: 60, expert: 55 },
        { skill: "WEB-3", beginner: 8, intermediate: 22, expert: 65 },
        { skill: "Rust", beginner: 50, intermediate: 45, expert: 55 },
        { skill: "Data Science", beginner: 28, intermediate: 35, expert: 30 },
        { skill: "M L", beginner: 25, intermediate: 20, expert: 50 },
        { skill: "ReactJs", beginner: 18, intermediate: 15, expert: 50 },
        { skill: "Angular", beginner: 12, intermediate: 10, expert: 45 },
      ],
      "Q4-FMA24": [
        { skill: "Java", beginner: 40, intermediate: 80, expert: 60 },
        { skill: "JS", beginner: 50, intermediate: 30, expert: 70 },
        { skill: "Python", beginner: 55, intermediate: 90, expert: 45 },
        { skill: "C#", beginner: 75, intermediate: 60, expert: 60 },
        { skill: "Kotlin", beginner: 35, intermediate: 65, expert: 40 },
        { skill: "Scala", beginner: 70, intermediate: 40, expert: 60 },
        { skill: ".NET", beginner: 30, intermediate: 65, expert: 60 },
        { skill: "WEB-3", beginner: 10, intermediate: 25, expert: 70 },
        { skill: "Rust", beginner: 55, intermediate: 50, expert: 60 },
        { skill: "Data Science", beginner: 30, intermediate: 40, expert: 35 },
        { skill: "M L", beginner: 28, intermediate: 25, expert: 55 },
        { skill: "ReactJs", beginner: 20, intermediate: 18, expert: 55 },
        { skill: "Angular", beginner: 15, intermediate: 12, expert: 50 },
      ],
    },
  ]);
  const skillNameArray = [];
  const countLevel = (value, data, index) => {
    var countB = 0;
    var countI = 0;
    var countE = 0;
    if (data[index].level === 4) countI++;
    else if (data[index].level === 5) countE++;
    else countB++;
    for (let i = 0; i < skillNameArray.length; i++) {
      if (skillNameArray[i] === value) {
        return;
      }
    }
    for (let i = index + 1; i < data.length; i++) {
      if (value === data[i].skill_name) {
        if (data[i].level === 4) {
          countI++;
        } else if (data[i].level === 5) {
          countE++;
        } else {
          countB++;
        }
      }
    }
    setCount((prevCount) => {
      const existingSkillIndex = prevCount.findIndex(
        (skill) => skill.skillName === value
      );
      let updatedCount;

      if (existingSkillIndex !== -1) {
        updatedCount = prevCount.map((skill, index) =>
          index === existingSkillIndex
            ? {
                ...skill,
                totalBeginner: skill.totalBeginner + countB,
                totalIntermediate: skill.totalIntermediate + countI,
                totalAdvanced: skill.totalAdvanced + countE,
              }
            : skill
        );
      } else {
        updatedCount = [
          ...prevCount,
          {
            skillName: value,
            totalBeginner: countB,
            totalIntermediate: countI,
            totalAdvanced: countE,
          },
        ];
      }

      setDataset((prevDataset) => {
        const updatedDataset = [...prevDataset];
        const yearData = updatedDataset[0][2024] || [];
        updatedCount.forEach((skill) => {
          const skillIndex = yearData.findIndex(
            (item) => item.skill === skill.skillName
          );

          if (skillIndex !== -1) {
            yearData[skillIndex] = {
              skill: skill.skillName,
              beginner: skill.totalBeginner,
              intermediate: skill.totalIntermediate,
              expert: skill.totalAdvanced,
            };
          } else {
            yearData.push({
              skill: skill.skillName,
              beginner: skill.totalBeginner,
              intermediate: skill.totalIntermediate,
              expert: skill.totalAdvanced,
            });
          }
        });

        updatedDataset[0][2024] = yearData;
        return updatedDataset;
      });
      return updatedCount;
    });
  };
  const getAllSKills = async () => {
    try {
      const data1 = [];
      skills?.data.forEach((skill) => {
        data1.push({
          skill: skill.skill_name,
          beginner: 0,
          intermediate: 0,
          expert: 0,
        });
      });
      setDataset((prevDataset) => {
        const updatedDataset = [...prevDataset];
        updatedDataset[0][2024] = data1;
        return updatedDataset;
      });
      getSkillCount();
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };
  const getSkillCount = async () => {
    try {
      getSkillDetails(skillMatrix?.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };
  React.useEffect(() => {
    getAllSKills();
    if(isError){
      dispatch(showToast({severitySnackbar: "error", message: `${error.data.message}`}))
    }
  }, [skills, skillMatrix, error]);
  const getSkillDetails = (newSkillCount) => {
    if (!newSkillCount || !Array.isArray(newSkillCount) || newSkillCount.length === 0) {
      return;
    }
    for (let i = 0; i < newSkillCount.length; i++) {
      countLevel(newSkillCount[i].skill_name, newSkillCount, i);
    }
  };
  const handleBarClick = (event, values) => {
    handleSkillForFilter({ ...filterSkill, skill: values.axisValue });
  };

  const handleItemClick = (event, values) => {
    if (values.seriesId === "auto-generated-id-2") {
      handleSkillForFilter({ ...filterSkill, level: "Expert" });
    } else if (values.seriesId === "auto-generated-id-1") {
      handleSkillForFilter({ ...filterSkill, level: "Intermediate" });
    } else if (values.seriesId === "auto-generated-id-0") {
      handleSkillForFilter({ ...filterSkill, level: "Beginner" });
    } else {
      handleSkillForFilter({ skill: "", level: "" });
    }
  };

  const drawerClose = () => {
    setOpenFilterDrawer(false);
  };
  return (
    <Box
      className="skills-matrics"
      style={{ padding: 20, borderRadius: "1rem" }}
    >
      <Typography
        variant="h5"
        style={{
          textAlign: "left",
          marginBottom: "1rem",
          color: "inherit !important",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        Skills
      </Typography>
      <Box
        sx={{
          height: expanded ? "max-content" : "15rem",
          overflow: "auto",
          padding: "5px",
          "&::-webkit-scrollbar ": {
            width: "10px",
          },

          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "20px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "20px",
          },

          "&::-webkit-scrollbar-thumb:hover ": {
            background: "#555",
          },
        }}
      >
        <BarChart
          dataset={dataset[0][quarter] || dataset[0][year]}
          series={[
            {
              dataKey: "beginner",
              label: "Beginner Employees",
              stack: "skills",
              color: "#03AED2",
              highlightScope: {
                highlighted: "item",
              },
            },
            {
              dataKey: "intermediate",
              label: "Intermediate Employees",
              stack: "skills",
              color: "#FFA62F",
              highlightScope: {
                highlighted: "item",
              },
            },
            {
              dataKey: "expert",
              label: "Expert Employees",
              stack: "skills",
              color: "#A5DD9B",
              highlightScope: {
                highlighted: "item",
              },
            },
          ]}
          height={200 + ((dataset[0][quarter] || dataset[0][year] || []).length * 50 - 200)}
          yAxis={[
            {
              dataKey: "skill",
              scaleType: "band",
              tickLabelStyle: {
                fill: "#999999",
                fontWeight: "bolder",
              },
            },
          ]}
          bottomAxis={null}
          topAxis={{
            position: "top",
            tickLabelStyle: {
              fill: "#999999",
              fontWeight: "bolder",
            },
            label: "Employees",
            labelStyle: {
              fill: "#999999",
              fontWeight: "bolder",
            },
          }}
          margin={{ top: 40, bottom: 20, left: 82, right: 10 }}
          layout="horizontal"
          slotProps={{
            legend: {
              hidden: true,
            },
            axisLine: { display: "none" },
            axisTick: { display: "none" },
            bar: { ry: 4, style: { shapeRendering: "auto" } },
            axisContent: {},
          }}
          onAxisClick={handleBarClick}
          onItemClick={handleItemClick}
        />
      </Box>
      <Box className={classes.skillLegendContainer} my={1.8}>
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
          <Typography fontSize={12}>Expert</Typography>
        </Box>
      </Box>
    </Box>
  );
}
