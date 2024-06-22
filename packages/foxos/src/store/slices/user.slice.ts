import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    department: "1",
  },
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; department: string }>
    ) => {
      state.name = action.payload.name;
      state.department = action.payload.department;
    },
  },
});

export const getUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
