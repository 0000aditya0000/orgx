import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  leadercard: {
    width: "43rem",
    height: "32rem",
    "&::-webkit-scrollbar": { display: "none" },
  },
}));

const Leaderboard = (props) => {
  const classes = useStyles();
  const users = props.data;
  const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);
  return (
    <Box
      sx={{
        maxWidth: 345,
        mx: "auto",
        my: 2,
        bgcolor: "#020e1f",
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Card
        variant="outlined"
        className={`${classes.leadercard} cardleader`}
        sx={{ overflowY: "scroll" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User Leaderboard
          </Typography>
          <List>
            {sortedUsers.map((user, index) => (
              <ListItem
                className="leaderlist"
                key={index}
                divider={index !== user.length - 1}
              >
                <ListItemAvatar>
                  <Avatar alt="user photo" src="https://picsum.photos/20/20" />
                </ListItemAvatar>
                <ListItemText
                  secondaryTypographyProps={{ style: { color: "grey" } }}
                  primary={user.name}
                  secondary={`${user.points} Points`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="rank">
                    <Typography variant="body2" className="leaderrank">
                      {user.rank}
                    </Typography>
                    {user.rankColor === "success" ? (
                      <ArrowUpwardIcon color="success" />
                    ) : (
                      <ArrowDownwardIcon color="error" />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Leaderboard;
