import apiRequest from "./apiClient";

export const getDesignations = async () => {
  return apiRequest("/employee/designation");
};
