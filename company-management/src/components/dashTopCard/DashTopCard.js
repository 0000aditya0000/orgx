import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stack from "@mui/material/Stack";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { green, red } from "@material-ui/core/colors";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    padding: "1.2rem 2.5rem 1.2rem 1.5rem",
    borderRadius: "1.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(80, 41, 119, 0.07)",
    position: "relative",
    overflow: "visible",
  },
  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "7px",
    borderRadius: "1.2rem 0 0 1.2rem",
    background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
  },
  title: {
    fontSize: "1.3em",
    fontWeight: "500",
    color: "#310e68",
    marginBottom: "0.5rem",
  },
  change: {
    paddingTop: "1rem",
    fontSize: ".8rem",
    fontWeight: "600",
    color: green[500],
  },
  data: {
    fontSize: "2.7rem",
    fontWeight: "600",
    color: "#222",
    letterSpacing: "1px",
    marginBottom: "0.2rem",
  },
});

const DashTopCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} de_card`} elevation={0}>
      <Box className={classes.accent} />
      <Typography className={classes.title}>{props.title}</Typography>
      <Stack
        direction={"row"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
        sx={{ mt: 1 }}
      >
        <Typography className={classes.data}>{props.count}</Typography>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          {props.change < 0 ? (
            <>
              <TrendingDownIcon
                style={{
                  fontSize: 38,
                  background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <Typography
                className={classes.change}
                style={{ color: red[400], paddingTop: 0, marginLeft: 4 }}
              >
                {props.change}%
              </Typography>
            </>
          ) : (
            <>
              <TrendingUpIcon
                style={{
                  fontSize: 38,
                  background: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <Typography
                className={classes.change}
                style={{ color: green[500], paddingTop: 0, marginLeft: 4 }}
              >
                +{props.change}%
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default DashTopCard;
