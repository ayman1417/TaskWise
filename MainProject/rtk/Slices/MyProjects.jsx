import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {PROJECT ,baseURL} from '../../src/API/API.js'
import axios from "axios";

const initialState = {
  projects: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch user data
export const fetchProjects = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${baseURL}/${PROJECT}`,{
    headers: {
      'Authorization': `Token ${token}`,
    }
  }); 
  return response.data;
});


const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjects: (state) => {
      return state.projects;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload; 
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getProjects} = projectSlice.actions;

export default projectSlice.reducer;
