import * as React from "react";
import { Box, Typography } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SubscriptionCard from "./SubscriptionCard";

function Subscription() {
  const [data, setData] = React.useState([]);
  const tenant_code = localStorage.getItem("tenant_code");
  const authToken = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BASE_URL_API;
  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${baseUrl}subscription`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          tenant_code: tenant_code,
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data1 = await response.json();
        console.log(data1.data);
        setData(data1.data);
        console.log(data);
      }
    } catch {}
  };
  React.useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <Box
      className="dash"
      sx={{
        padding: "2rem",
        width: "100%",
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h4">
          <CardMembershipIcon fontSize="large" sx={{ marginRight: "1rem" }} />
          Subscription Plans
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: "2.5rem",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {data.map((item) => (
          <SubscriptionCard data={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}

export default Subscription;
