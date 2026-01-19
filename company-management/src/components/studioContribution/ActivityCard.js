import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { green, red } from "@material-ui/core/colors";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    height: 138,
    padding: "0.4rem",
  },
}));
function ActivityCard(props) {
  const classes = useStyles();
  return (
    <div>
      <Card className={`${classes.card} contricard`}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="h5" component="div">
              {props.heading}
            </Typography>
            <Typography variant="h2">{props.count}</Typography>
          </Stack>
          <Stack sx={{ marginTop: "2rem" }}>
            {props.percent < 0 ? (
              <TrendingDownIcon style={{ color: red[400], fontSize: 40 }} />
            ) : (
              <TrendingUpIcon style={{ color: green[500], fontSize: 40 }} />
            )}
            <Typography>{`${props.percent}%`}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivityCard;
