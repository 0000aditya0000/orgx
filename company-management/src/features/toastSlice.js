import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSnackbar: false,
  severitySnackbar: "info",
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.openSnackbar = true;
      state.severitySnackbar = action.payload.severitySnackbar || "info";
      state.message = action.payload.message || "";
    },
    hideToast: (state) => {
      state.openSnackbar = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
