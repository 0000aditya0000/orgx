import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
// import userReducer from "../services/userSlice";
import toastReducer from "../features/toastSlice";
import employeeSkillReducer from "../features/employeeSkillSlice";
// import { skillApiSlice } from "../services/skillApiSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    employeeSkill: employeeSkillReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // user:  userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
