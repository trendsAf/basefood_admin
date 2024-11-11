import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: localStorage.getItem("theme") || "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.value);
      window.dispatchEvent(new Event("storage"));
    },
    setTheme: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("theme", state.value);
      window.dispatchEvent(new Event("storage"));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
