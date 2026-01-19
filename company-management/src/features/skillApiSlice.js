import { apiSlice } from "../services/apiSlice";

export const skillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => "skill",
    }),

    addSkill: builder.mutation({
      query: (newSkill) => ({
        url: "skill",
        method: "POST",
        body: newSkill,
      }),

      getSkillById: builder.query({
        query: (id) => `skill/${id}`,
      }),

      getSkillByName: builder.mutation({
        query: (name) => ({
          url: "skill/skillName",
          method: "POST",
          body: name,
        }),
      }),
    }),
  }),
});

export const { useGetAllSkillsQuery, useAddSkillMutation } = skillApiSlice;
