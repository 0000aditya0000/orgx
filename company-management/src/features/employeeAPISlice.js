import { apiSlice } from "../services/apiSlice";

export const employeeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "employee",
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employee/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),
    addEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({id, data}) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employee", id },
        "Employee",
      ],
    }),
    getDesignations: builder.query({
      query: () => "employee/designation",
    }),
    updateEmployeeReporting: builder.mutation({
      query: ({id, data}) => ({
        url: `/employee/reporting/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employee", id },
        "Employee",
      ],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetDesignationsQuery,
  useUpdateEmployeeReportingMutation
} = employeeSlice;
