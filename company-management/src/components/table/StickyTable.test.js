import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StickyTable from "./StickyTable";
import mediaQuery from "css-mediaquery";
import { Box, Tooltip, Button } from "@mui/material";
import ToggleTable from "../toggle/Toggle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {},
});

const profilePageHandler = jest.fn();
const switchEnableHandler = jest.fn();

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Code", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 50 },
  { id: "country", label: "Country", minWidth: 100 },
  { id: "position", label: "Position", minWidth: 150 },
];

const rows = [
  { name: "Alice", code: "A1", age: 30, country: "USA", position: "Developer" },
  { name: "Bob", code: "B1", age: 25, country: "Canada", position: "Designer" },
  { name: "Charlie", code: "C1", age: 35, country: "UK", position: "Manager" },
  {
    name: "David",
    code: "D1",
    age: 28,
    country: "Germany",
    position: "Developer",
  },
  { name: "Eve", code: "E1", age: 22, country: "France", position: "Intern" },
  { name: "Frank", code: "F1", age: 40, country: "Spain", position: "CEO" },
  {
    name: "Grace",
    code: "G1",
    age: 29,
    country: "Italy",
    position: "Developer",
  },
  {
    name: "Hank",
    code: "H1",
    age: 32,
    country: "Netherlands",
    position: "CTO",
  },
  {
    name: "Ivy",
    code: "I1",
    age: 26,
    country: "Belgium",
    position: "Designer",
  },
  { name: "Jack", code: "J1", age: 38, country: "Sweden", position: "Manager" },
];

const noRows = [];

const employeeColumns = [
  { id: "employee_name", label: "Name", minWidth: 300 },
  { id: "studio_name", label: "Studio", minWidth: 300 },
  { id: "employee_email", label: "Email", minWidth: 300 },
  { id: "status", label: "Status", minWidth: 300 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const employeeData = [
  {
    id: 29,
    first_name: "Devon",
    last_name: null,
    designation: "Internal",
    role: null,
    gender: "Supervisor",
    email: "Kiarra13@hotmail.com",
    password: "(491) 593-5368 x92286",
    image: null,
    location: null,
    marital_status: null,
    blood_group: null,
    phy_disable: null,
    pan_card: null,
    aadhaar_card: null,
    uan: null,
    personal_email: null,
    phone: null,
    whatsapp: null,
    wordpress: null,
    github: null,
    bitbuket: null,
    work_phone: null,
    address: null,
    tenant_id: 10,
    studio_name: null,
    status: "active",
    created_at: "2024-07-12T11:56:50.678Z",
    updated_at: "2024-07-12T11:56:50.678Z",
  },
  {
    id: 30,
    first_name: "Johann",
    last_name: null,
    designation: "Future",
    role: null,
    gender: "Designer",
    email: "Candida_OReilly81@gmail.com",
    password: "121.449.9514 x3007",
    image: null,
    location: null,
    marital_status: null,
    blood_group: null,
    phy_disable: null,
    pan_card: null,
    aadhaar_card: null,
    uan: null,
    personal_email: null,
    phone: null,
    whatsapp: null,
    wordpress: null,
    github: null,
    bitbuket: null,
    work_phone: null,
    address: null,
    tenant_id: 10,
    studio_name: null,
    status: "active",
    created_at: "2024-07-12T11:56:50.693Z",
    updated_at: "2024-07-12T11:56:50.693Z",
  },
];

const employeeRows = employeeData.map((item) => {
  const employee_id = item.id;
  const employee_name = item.first_name;
  const studio_name = item.studio_name || "Not Assigned";
  const employee_email = item.email;

  const status = (
    <Tooltip title={item.status === "active" ? "Active" : "Inactive"}>
      <ToggleTable
        status={item.status === "active"}
        handleSwitch={switchEnableHandler}
      ></ToggleTable>
    </Tooltip>
  );
  return {
    ...item,
    employee_name,
    studio_name,
    employee_email,
    status,
    actions: (
      <Box>
        <Button
          size="large"
          variant="text"
          color="info"
          onClick={profilePageHandler}
          sx={{ paddingTop: "0px", paddingBottom: "0px" }}
          aria-label="edit"
        >
          <Tooltip title={"Edit"}>
            <OpenInNewIcon fontSize="medium" sx={{ color: "#42a5f5" }} />
          </Tooltip>
        </Button>
      </Box>
    ),
  };
});

const studioColumn = [
  { id: "studio_name", label: "Competency", minWidth: 300 },
  { id: "studio_code", label: "Code", minWidth: 300 },
  { id: "studioAdmin_email", label: "Email", minWidth: 300 },
  { id: "status", label: "Status", minWidth: 300 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const studioData = [
  {
    id: 1,
    competency_name: "Frontend",
    competency_code: "6081",
    competency_admin_email: "feadmin@wirpo.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "",
    description: "fe",
    image: "",
    created_at: "2024-06-03T05:39:54.365Z",
    updated_at: "2024-06-04T12:37:41.608Z",
  },
  {
    id: 22,
    competency_name: "Scala1",
    competency_code: "8420",
    competency_admin_email: "devansh@wirpro.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "Devansh",
    description: "Testing competency",
    image: "",
    created_at: "2024-06-17T05:33:08.494Z",
    updated_at: "2024-06-17T05:34:13.642Z",
  },
  {
    id: 20,
    competency_name: "Scala",
    competency_code: "2800",
    competency_admin_email: "devansh@wirpro.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "Devansh",
    description: "Scala Competency is new competency",
    image: "",
    created_at: "2024-06-14T12:12:36.610Z",
    updated_at: "2024-06-17T05:52:54.425Z",
  },
  {
    id: 23,
    competency_name: "Scala3",
    competency_code: "4059",
    competency_admin_email: "devansh@tcs.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "Devansh Shuklaaa",
    description: "Aiml competency",
    image: "",
    created_at: "2024-06-17T06:18:39.823Z",
    updated_at: "2024-06-17T06:19:09.080Z",
  },
  {
    id: 21,
    competency_name: "Springboot1",
    competency_code: "6209",
    competency_admin_email: "devansh@wirpro.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "Devansh",
    description: "kotlin competency is new ",
    image: "",
    created_at: "2024-06-14T12:37:19.889Z",
    updated_at: "2024-06-21T13:02:00.603Z",
  },
  {
    id: 2,
    competency_name: "Scala1",
    competency_code: "2497",
    competency_admin_email: "devansh@tcs.com",
    status: "active",
    total_project: 10,
    total_employee: 15,
    competency_head: "Devansh Shukla",
    description: "scala",
    image: "",
    created_at: "2024-06-03T06:16:50.562Z",
    updated_at: "2024-07-11T07:18:28.959Z",
  },
];

const studioRows = studioData.map((item) => {
  const studio_name = item.competency_name;
  const studio_code = item.competency_code;
  const studio_id = item.id;
  const studioAdmin_email = item.competency_admin_email;
  const status = (
    <Tooltip title={item.status === "active" ? "Active" : "Inactive"}>
      <ToggleTable
        status={item.status === "active"}
        handleSwitch={switchEnableHandler}
      />
    </Tooltip>
  );
  return {
    ...item,
    studio_name,
    studio_code,
    studioAdmin_email,
    status,
    studio_id,
    actions: (
      <Box>
        <Button
          size="large"
          variant="text"
          color="info"
          onClick={profilePageHandler}
          sx={{ paddingTop: "0px", paddingBottom: "0px" }}
          aria-label="edit"
        >
          <Tooltip title={"Edit"}>
            <OpenInNewIcon fontSize="medium" sx={{ color: "#42a5f5" }} />
          </Tooltip>
        </Button>
      </Box>
    ),
  };
});

describe("StickyTable", () => {
  test("renders table with columns and rows", () => {
    window.matchMedia = createMatchMedia(1900);
    render(<StickyTable columns={columns} rows={rows} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });

    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("David")).toBeInTheDocument();
  });

  test('renders "No Data Found" message when there are no rows', () => {
    render(<StickyTable columns={columns} rows={noRows} />);

    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  test("handles page change", () => {
    render(<StickyTable columns={columns} rows={rows} />);

    fireEvent.click(screen.getByRole("button", { name: /Go to next page/i }));
    expect(screen.getByText("Page: 2 of 2")).toBeInTheDocument();
  });

  test("renders Tablecards for small screen size", () => {
    window.matchMedia = createMatchMedia(800);
    render(<StickyTable columns={columns} rows={rows} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  test("renders with employees data", () => {
    window.matchMedia = createMatchMedia(1900);
    render(
      <StickyTable
        columns={employeeColumns}
        rows={employeeRows}
        tableName={"Employee"}
      />
    );

    employeeColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });

    expect(screen.getByText("Devon")).toBeInTheDocument();
    expect(screen.getByText("Johann")).toBeInTheDocument();
  });

  test("renders with competencies data", () => {
    window.matchMedia = createMatchMedia(1900);
    render(
      <StickyTable
        columns={studioColumn}
        rows={studioRows}
        tableName={"Competency"}
      />
    );

    studioColumn.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  test("renders with competencies data when on small screen", () => {
    window.matchMedia = createMatchMedia(800);
    render(
      <StickyTable
        columns={studioColumn}
        rows={studioRows}
        tableName={"Competency"}
      />
    );

    expect(screen.getByText("Scala")).toBeInTheDocument();
    expect(screen.getByText("Springboot1")).toBeInTheDocument();
  });
});
