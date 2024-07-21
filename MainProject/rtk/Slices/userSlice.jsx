import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {MANAGE,baseURL} from '../../src/API/API.js'
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${baseURL}/${MANAGE}`,{
    headers: {
      'Authorization': `Token ${token}`,
    }
  }); 
  return response.data;
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null; // Clear the user data
    },
    userInfo: (state) => {
      return state.user?state.user:{}; // Clear the user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; //Update the user data with the payload from the fulfilled action
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUser, userInfo} = userSlice.actions;

export default userSlice.reducer;
