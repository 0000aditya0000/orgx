import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL_API,
    prepareHeaders: (headers) => {
      const tenantCode = localStorage.getItem("tenant_code");
      const authToken = localStorage.getItem("token");

      if (tenantCode) {
        headers.set("tenant_code", tenantCode);
      }
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Employee", "Competency", "Skill", "Project"],
  endpoints: () => ({}),
});

