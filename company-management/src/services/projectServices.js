import apiRequest from "./apiClient";

export const createProject = async (data) => {
  return apiRequest("/project", "POST", data, true);
};

export const getProjects = async () => {
  return apiRequest("/project");
};

export const projectById = async (id) => {
  return apiRequest(`/project/${id}`);
};

export const updateProject = async (data, id) => {
  return apiRequest(`/project/${id}`, "PUT", data, true);
};
