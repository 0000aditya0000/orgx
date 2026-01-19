import apiRequest from "./apiClient";

export const getCompetencies = async () => {
  return apiRequest("/competency");
};

export const postCompetency = async (data) => {
  return apiRequest("/competency", "POST", data);
};

export const getCompetencyById = async (id) => {
  return apiRequest(`/competency/${id}`);
};

export const putCompetecy = async (id, data) => {
  return apiRequest(`/competency/${id}`, "PUT", data);
};

export const getCompetencyByName = async (value) => {
  return apiRequest("/competency/competencyName", "POST", value);
};
