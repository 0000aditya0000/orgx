import apiRequest from "./apiClient";

export const createEmployeeSkill = async (skill) => {
  return apiRequest("/employeeSkill", "POST", skill);
};

export const getSkillMatrix = async () => {
  return apiRequest("/employeeSkill");
};

export const fetchEmployeeSkills = async (employee_id) => {
  return apiRequest(`/employeeSkill/${employee_id}`);
};

export const deleteEmployeeSkill = async (id) => {
  return apiRequest(`/employeeSkill/${id}`);
};
