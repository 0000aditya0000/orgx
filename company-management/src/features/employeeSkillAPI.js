import { apiSlice } from "../services/apiSlice";

export const employeeSkillSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSkills: builder.query({
      query: (id) => `employeeSkill/${id}`,
    }),
    addEmployeeSkill: builder.mutation({
      query: (skill) => ({
        url: "employeeSkill",
        method: "POST",
        body: skill,
      }),
    }),
    deleteEmployeeSkill: builder.mutation({
      query: (id) => ({
        url: `employeeSkill/${id}`,
        method: `DELETE`,
      }),
    }),
    getSkillMatrix: builder.query({
      query: () => "employeeSkill",
    }),
  }),
});

export const {
  useGetEmployeeSkillsQuery,
  useAddEmployeeSkillMutation,
  useDeleteEmployeeSkillMutation,
  useGetSkillMatrixQuery,
} = employeeSkillSlice;
