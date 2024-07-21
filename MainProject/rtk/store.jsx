import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import projectsReducer from './Slices/MyProjects.jsx'
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});
