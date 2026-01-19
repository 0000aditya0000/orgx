import apiRequest from "./apiClient";

export const getEmployees = async () => {
  return apiRequest("/employee");
};

export const getEmployeeById = async (id) => {
  return apiRequest(`/employee/${id}`);
};

export const postEmployee = async (data) => {
  return apiRequest("/employee", "POST", data);
};

export const putEmployee = async (id, data) => {
  return apiRequest(`/employee/${id}`, "PUT", data);
};

export const EmployeeEmailCheck = async (value) => {
  return apiRequest(`/employee/email/check?email=${value}`);
};

export const EmployeeFilterByName = async (value) => {
  return apiRequest(`/employee/filterByName?name=${value}`);
};
