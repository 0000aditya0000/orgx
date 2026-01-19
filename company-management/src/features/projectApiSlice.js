import { apiSlice } from "../services/apiSlice";

export const projectSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => "project",
      providesTags: ["Project"],
    }),
    getProjectById: builder.query({
      query: (id) => `project/${id}`,
      providesTags: ["Project"],
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: "project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: ({id, data}) => ({
        url: `project/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
} = projectSlice;
