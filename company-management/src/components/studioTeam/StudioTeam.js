// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Backdrop from "@mui/material/Backdrop";
// import { ClassicSpinner } from "react-spinners-kit";
// import StickyTable from "../table/StickyTable";
// import { Box, Button, Tooltip } from "@mui/material";
// import ToastMessage from "../snackbar/ToastMessage";
// import ToggleTable from "../toggle/Toggle";
// import EditIcon from "@mui/icons-material/Edit";

// function StudioTeams() {
//   const columns = [
//     { id: "employee_name", label: "Name", minWidth: 300 },
//     { id: "studio_name", label: "Studio", minWidth: 300 },
//     { id: "employee_email", label: "Email", minWidth: 300 },
//     { id: "status", label: "Inactive / Active", minWidth: 300 },
//     { id: "actions", label: "Actions", minWidth: 180 },
//   ];
//   const [cardDatas, setCardDatas] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const [severitySnackbar, setSeveritySnackbar] = React.useState("");

//   const { id } = useParams();
//   const handleClose = () => {
//     setOpenSnackbar(false);
//   };
//   const getInfo = function getInfo1() {
//     return new Promise(async (resolve, reject) => {
//       const response = await fetch(
//         "https://microfeapi.azurewebsites.net/employees/",
//         {
//           method: "GET",
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       if (response.ok) {
//         const data1 = await response.json();
//         setTimeout(() => {
//           setCardDatas(data1.users);
//           setLoading(false);
//           resolve(data1);
//         }, 1000);
//       } else if (response.statusText === "Unauthorized") {
//         const error = "Something went wrong Please login again";
//         setOpenSnackbar(true);
//         setLoading(false);
//         setSeveritySnackbar("error");
//         setMessage(error);
//         return reject(error);
//       } else {
//         const error = await response.json();
//         setOpenSnackbar(true);
//         setLoading(false);
//         setSeveritySnackbar("error");
//         setMessage(error.message);
//         return reject(error);
//       }
//     });
//   };
//   useEffect(() => {
//     getInfo();
//   }, []);

//   const navigate = useNavigate();
//   const navigateEdit = (item) => {
//     navigate(`/home/company/employee/${item}`);
//   };
//   const filteredData = cardDatas.filter((data) => data.studio_id == id);
//   let employeeStateData = filteredData;

//   let employeeStateList = [];
//   if (employeeStateData != null) {
//     employeeStateList = employeeStateData.map((item) => {
//       const employee_id = item.employee_id;
//       const employee_name = item.employee_name;
//       const studio_name = item.studio_name;
//       const employee_email = item.employee_email;

//       const status = (
//         <Tooltip title={item.status === "enable" ? "Active" : "Inactive"}>
//           <ToggleTable
//             status={item.status === "enable"}
//             handleSwitch={() =>
//               switchEnableHandler(
//                 item.status === "enable" ? "disable" : "enable",
//                 item
//               )
//             }
//           ></ToggleTable>
//         </Tooltip>
//       );
//       return {
//         ...item,
//         employee_name,
//         studio_name,
//         employee_email,
//         status,
//         actions: (
//           <Box>
//             <Button
//               size="large"
//               variant="text"
//               color="info"
//               onClick={() => {
//                 navigateEdit(employee_id);
//                 setOpenEdit(true);

//                 editData(item);
//               }}
//               sx={{ paddingTop: "0px", paddingBottom: "0px" }}
//               aria-label="edit"
//             >
//               <Tooltip title={"Edit"}>
//                 <EditIcon fontSize="medium" sx={{ color: "#42a5f5" }} />
//               </Tooltip>
//             </Button>
//           </Box>
//         ),
//       };
//     });
//   }
//   return (
//     <div style={{ marginTop: "-2rem" }}>
//       {loading ? (
//         <Backdrop
//           sx={{
//             color: "#fff",
//             zIndex: (theme) => theme.zIndex.drawer + 1,
//             position: "initial",
//             height: "10rem",
//             marginTop: "1rem",
//             background: "transparent",
//           }}
//           open
//         >
//           <ClassicSpinner size={70} color="#000" loading={loading} />
//         </Backdrop>
//       ) : (
//         <StickyTable
//           columns={columns}
//           rows={employeeStateList}
//           tableName="Employee"
//           onHandleEditEmployee={navigateEdit}
//         />
//       )}

//       {openSnackbar && (
//         <ToastMessage
//           openSnackbar={openSnackbar}
//           severitySnackbar={severitySnackbar}
//           handleClose={handleClose}
//           message={message}
//         />
//       )}
//     </div>
//   );
// }
// export default StudioTeams;
import React from 'react'

function StudioTeam() {
  return (
    <div>StudioTeam</div>
  )
}

export default StudioTeam