import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skillSet: [],
};

const employeeSkillSlice = createSlice({
  name: "employeeSkill",
  initialState,
  reducers: {
    setSkillsToEmployee: (state, action) => {
      state.skillSet = action.payload;
    },
    addSkillToEmployee: (state, action) => {
      state.skillSet = [...state.skillSet, action.payload];
    },
    removeSkillFromEmployee: (state, action) => {
      state.skillSet = state.skillSet.filter(
        (skill) => skill.id !== action.payload
      );
    },
  },
});

export const {
  setSkillsToEmployee,
  addSkillToEmployee,
  removeSkillFromEmployee,
} = employeeSkillSlice.actions;

export default employeeSkillSlice.reducer;
