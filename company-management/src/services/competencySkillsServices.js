import apiRequest from "./apiClient";

export const getCompetencySkillByName = async (skill) => {
  return apiRequest(`/competencySkill/${skill}`);
};

export const getCompetencySkillByNameAndLevel = async (skill, level) => {
  return apiRequest(`/competencySkill/${skill}/${level}`);
};

export const getCompetencySkillById = async (studio_id) => {
  return apiRequest(`/competencySkill/${studio_id}`, "POST", {
    studio_id: studio_id,
  });
};
