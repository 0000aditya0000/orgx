import { apiSlice } from "../services/apiSlice";

export const CompetencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompetency: builder.query({
      query: () => "competency",
      providesTags: ["Competency"],
    }),
    getCompetencyById: builder.query({
      query: (id) => `/competency/${id}`,
        providesTags: ["Competency"],
    }),
    getCompetencyByName: builder.mutation({
      query: (name) => ({
        url: "competency/competencyName",
        method: "POST",
        body: name,
      }),
      invalidatesTags:["Competency"]
    }),
    addCompetency: builder.mutation({
      query: (newCompetency) => ({
        url: "competency",
        method: "POST",
        body: newCompetency,
      }),
        invalidatesTags: ["Competency"],
    }),
   
    updateCompetency: builder.mutation({
      
      query: ({id,updatedData}) => {
        console.log(id);
        return {
          url: `competency/${id}`,
          method: "PUT",
          body: updatedData,
        }
        
      },
      invalidatesTags:["Competency"]
    })
    
  }),
});

export const {
  useGetAllCompetencyQuery,
  useGetCompetencyByIdQuery,
  useAddCompetencyMutation,
  useUpdateCompetencyMutation,
  useGetCompetencyByNameMutation,
} = CompetencyApiSlice;
