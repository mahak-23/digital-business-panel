import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (e) {
    console.error("Error reading theme from localStorage:", e);
  }
  // Default to light theme
  return "light";
};

const slice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, setMode } = slice.actions;
export default slice.reducer;
