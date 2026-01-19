import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { AttendanceModal } from "./AttendanceModal";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toastSlice";

const useStyles = makeStyles((theme) => ({
  attendance: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  clock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    marginRight: "2rem",
    border: "1px solid gray",
    gap: 3,
    padding: "3px 10px",
    borderRadius: "4px",
  },
  actionTitle: {
    fontWeight: "bold !important",
    marginBottom: "0.5rem !important",
    letterSpacing: "2px !important",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
}));

export const AttendanceControl = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });
  const [clockIn, setClockIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  var requestBody = null;
  const resetTimeoutRef = useRef(null);
  const timeFormat = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const tick = () => {
    setTime(new Date());
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const strTime = hours + ":" + minutes + ":" + seconds;
    return { time: strTime, ampm: ampm };
  };

  const setResetTimeout = (clockInTime) => {
    const sixteenHoursLater = new Date(
      clockInTime.getTime() + 16 * 60 * 60 * 1000
    );
    const delay = sixteenHoursLater.getTime() - new Date().getTime();

    resetTimeoutRef.current = setTimeout(() => {
      requestBody = {
        empId: 1245,
        status: "clock-out",
        time: null,
        istTime: null,
        lat: null,
        lng: null,
      };
      setClockIn(false);
      setClockInTime(null);
    }, delay);
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLocation({ lat, lng });
            resolve({ lat, lng });
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  const toggleState = async () => {
    try {
      const { lat, lng } = await getLocation();
      if (clockIn) {
        requestBody = {
          empId: 1254,
          status: "clock-out",
          time: time.toISOString(),
          istTime: new Date(time.toISOString()).toLocaleString(),
          lat: lat,
          lng: lng,
        };
        setClockIn(false);
        setClockInTime(null);
        clearTimeout(resetTimeoutRef.current);
      } else {
        requestBody = {
          empId: 1254,
          status: "clock-in",
          time: time.toISOString(),
          istTime: new Date(time.toISOString()).toLocaleString(),
          lat: lat,
          lng: lng,
        };
        setClockIn(true);
        setClockInTime(time);
        setResetTimeout(time);
      }
    } catch (error) {
      dispatch(
        showToast({
          severitySnackbar: "error",
          message: `Failed to get location: ${error.message}`,
        })
      );
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
      clearTimeout(resetTimeoutRef.current);
    };
  }, []);
  return (
    <>
      <Box>
        {/* <Typography className={classes.actionTitle} variant="h5">
        Actions
      </Typography> */}
        <Typography variant="h6">Attendance</Typography>
        <Card className="paperclass" elevation={0}>
          <CardContent>
            <Box className={classes.attendance} style={{}}>
              <Box>
                <Box className={classes.clock} style={{}}>
                  <Typography className="h4" variant="h4" fontSize={"1.5rem"}>
                    {formatAMPM(time).time}
                  </Typography>
                  <Typography className="p" variant="span">
                    {formatAMPM(time).ampm}
                  </Typography>
                </Box>
                <Typography className="p" variant="p" fontSize={".8rem"}>
                  {time.toLocaleDateString("en-IN", timeFormat)}
                </Typography>
              </Box>
              <Box className={classes.actions} style={{}}>
                {clockIn ? (
                  <Button
                    variant="outlined"
                    onClick={toggleState}
                    color="warning"
                  >
                    Clock Out
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleState}
                    color="success"
                  >
                    Clock In
                  </Button>
                )}
                <Button variant="text" size="small" onClick={handleModalOpen}>
                  Work From Home
                </Button>
                <AttendanceModal open={modalOpen} onClose={handleModalClose} />
                <Button variant="text" size="small">
                  On Duty
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
