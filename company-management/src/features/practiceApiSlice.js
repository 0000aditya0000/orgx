import { apiSlice } from "../services/apiSlice";

export const practiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPractice: builder.query({
      query: () => `practice`,
      providesTags: ["Practice"],
    }),
    getPracticeById: builder.query({
        query: (id) => `practice/${id}`,
        providesTags: ["Practice"],
    }),
    addPractice: builder.mutation({
      query: (practice) => ({
        url: "pratice",
        method: "POST",
        body: practice,
      }),
        invalidatesTags: ["Practice"],
    }),
    getPracticeByName: builder.mutation({
      query: (name) => ({
        url: `practice/practiceName`,
        method: `POST`,
        body:name,
      }),
      invalidatesTags: ["Practice"],
    }),
  }),
});


export const { useGetPracticeQuery, useAddPracticeMutation, useGetPracticeByNameMutation, useGetPracticeByIdQuery } = practiceSlice;