import { Box, Grid, Typography } from "@mui/material";
import React,{useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  progress: {
    height: 10,
    borderRadius: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  languageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignItems: "center",
  },
  lang: {
    height: 9,
  },
  firstLanguageStyle: {
    height: 9,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastLanguageStyle: {
    height: 9,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
}));

const data = [
  {
    language: "HTML",
    percentage: "10%",
  },
  {
    language: "CSS",
    percentage: "20%",
  },
  {
    language: "JavaScript",
    percentage: "30%",
  },
  {
    language: "React",
    percentage: "40%",
  },
];

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

export default function TechnologyList() {
  const classes = useStyles();
  const listData = data.slice();
  const firstLanguage = data.shift();
  const lastLanguage = data.pop();
  return (
    <div>
      <Box height={"310px"}>
        <Box>
          <Typography variant="h5" fontWeight={"500"}>
            Tech Stack
          </Typography>
        </Box>
        <Box my={3}>
          <Box className={classes.progress}>
            <Box
              className={classes.firstLanguageStyle}
              width={firstLanguage.percentage}
              backgroundColor={stringToColor(firstLanguage.language)}
            ></Box>
            {data.map((item) => (
              <Box
                key={item.id}
                className={classes.lang}
                width={item.percentage}
                backgroundColor={stringToColor(item.language)}
              ></Box>
            ))}
            <Box
              className={classes.lastLanguageStyle}
              width={lastLanguage.percentage}
              backgroundColor={stringToColor(lastLanguage.language)}
            ></Box>
          </Box>
        </Box>
        <Box my={3} padding={1}>
          <Grid container spacing={4}>
            {listData.map((item) => (
              <Grid item xs={4} key={item.id}>
                <Box className={classes.languageContainer}>
                  <Box
                    className={classes.dot}
                    backgroundColor={stringToColor(item.language)}
                  ></Box>
                  <Typography>{item.language}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
