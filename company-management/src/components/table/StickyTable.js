import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@material-ui/core";
import TableCards from "../TableCard/Tablecards";

const useStyles = makeStyles((theme) => ({
  root: {
    border: " 0 solid yellow !important",
    color: "inherit !important",
    backgroundColor: "inherit !important",
    borderRadius: "0.75rem !important",
    boxShadow: "none !important",
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem",
    alignItems:"baseline",
    flexDirection: "row",
    gap: "20px",
    marginLeft:"-0.5rem !important"
  },
  filtertext: {
    fontWeight: "bold !important",
    marginTop: "17px !important",
  },
  formctrl: {
    minWidth: 120,
    marginRight: "-1.6rem !important",
    display: "flex !important",
    flexDirection: "row !important",
  },
  tblcontainer: {
    borderRadius: 8,
    border: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "#fff",
    overflowX: "auto",
    "& td": {
      paddingLeft: "3rem",
      fontSize: "14px",
      color: "inherit",
    },
  },
  table: {
    padding: "10px"
  },
  tablecell: {
    fontSize: "1rem",
    color: "inherit",
  },
  tablerow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  tablefooter: {
    width: "100%",
    textAlign: "center",
  },
  pagination: {
    marginTop: "2rem",
    color: "#333 !important",
    "& div": {
      alignItems: "baseline",
    },
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function StickyTable({
  columns,
  rows,
  label,
  tableName,
  handleOpenAdd,
}) {
  var filterName = tableName;
  if (filterName === "Employee") {
    filterName = "Studio";
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [noDataText, setNoDataText] = React.useState(false);
  const [studio, setStudio] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState(filterName);
  const [activeStatus, setActiveStatus] = React.useState("Status");
  const [filteredRows, setFilteredRows] = React.useState([]);
  const theme = useTheme();
  const showText = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function defaultLabelDisplayedRows({ from, to, count, page }) {
    return `Page: ${page + 1} of ${
      Math.ceil(count / 6) !== -1 ? Math.ceil(count / 6) : `more than ${to}`
    }`;
  }

  React.useEffect(() => {
    if (rows.length === 0) {
      setNoDataText(true);
    }
  }, [rows]);
  // const fetchStudios = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://microfeapi.azurewebsites.net/studios/",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data1 = await response.json();

  //       const studioData = data1.studios;

  //       setStudio(studioData);
  //     } else {
  //       throw new Error("Error fetching data from API");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  React.useEffect(() => {
    // fetchStudios();
  }, []);

  React.useEffect(() => {
    const filteredByStudio =
      activeFilter !== filterName
        ? rows.filter((row) => row.studio_name === activeFilter)
        : rows;

    const filteredByStatus =
      activeStatus !== "Status"
        ? filteredByStudio.filter(
            (row) => row.status.props.title === activeStatus
          )
        : filteredByStudio;

    setFilteredRows(filteredByStatus);
  }, [activeFilter, activeStatus, rows, filterName]);

  return (
    <Paper className={classes.root} data-testid='sticky-table'>
      <Box className={classes.box}>
        {/* <Typography className={` ${classes.filtertext} tablefilter`}>
          Filter By:
        </Typography>
        <FormControl className={classes.formctrl}>
          <Select
            className="tableselect filter-color"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            sx={{
              paddingRight: "0px",

              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
            }}
          >
            <MenuItem value={filterName}>{filterName}</MenuItem>{" "}
            {studio.map((option, index) => (
              <MenuItem key={index} value={option.studio_name}>
                {option.studio_name}
              </MenuItem>
            ))}
          </Select>
          <Select
            className="tableselect filter-color"
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
            sx={{
              paddingRight: "0px",
              marginLeft: "1rem",

              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
            }}
          >
            <MenuItem value="Status">Status</MenuItem>
            <MenuItem value="Active">{"Active"}</MenuItem>
            <MenuItem value="Inactive">{"Inactive"}</MenuItem>
          </Select>
        </FormControl> */}
      </Box>
      <TableContainer className={classes.tblcontainer}>
        {showText ? (
          <Table
            stickyHeader
            className="table"
            aria-label="sticky table"
            sx={{
              width: "100%",
              padding: "10px",
              mb: "0",
              "& tbody tr:last-child": {
                "& .css-fcgju7-MuiTableCell-root": {
                  borderBottom: "none",
                },
              },
            }}
          >
            <TableHead
              sx={{
                height: "4rem",
              }}
            >
              <TableRow
                sx={{
                  "& th": {
                    fontSize: "3rem",
                    fontWeight: "700",
                    opacity: 1,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "1rem",
                      color: "inherit",
                      paddingLeft: "3rem",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={
                          filterName == "Practice"
                            ? row.practice_code
                            : row.code
                        }
                        sx={{
                          height: "3.5rem",
                          cursor: "pointer",
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={classes.tablecell}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Container maxWidth="xs">
                      <Box className={classes.tablerow}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          mb={0.5}
                          className={classes.tablefooter}
                        >
                          No Data Found
                        </Typography>
                      </Box>
                    </Container>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          filteredRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableCards
                key={row.code}
                rows={row}
                columns={columns}
                onClick={() => {
                  if (tableName === "Competency") {
                    profilePageHandler(row?.studio_id);
                  } else if (tableName === "Practice") {
                    profilePageHandler(row?.practice_id);
                  }
                }}
              />
            ))
        )}
         {filteredRows.length >= 1 && (
        <TablePagination
          component="div"
          className={classes.pagination}
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelDisplayedRows={defaultLabelDisplayedRows}
        />
      )}
      </TableContainer>
    </Paper>
  );
}
