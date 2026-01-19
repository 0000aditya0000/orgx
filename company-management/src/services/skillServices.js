import apiRequest from "./apiClient";

export const fetchAllSkills = async () => {
  return apiRequest("/skill");
};

export const createSkill = async (skill) => {
  return apiRequest("/skill", "POST", skill);
};

export const getSkillByid = async (id) => {
  return apiRequest(`/skill/${id}`);
};

export const getSkillBySkillName = async (name) => {
  return apiRequest(`/skill/skillName`, "POST", name);
};
