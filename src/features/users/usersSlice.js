import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../data/data";

const initialUsers = userData.map((user, index) => ({
  ...user,
  id: `user-${index + 1}`,
}));

const slice = createSlice({
  name: "users",
  initialState: {
    users: initialUsers,
  },
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index >= 0) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload,
        };
      }
    },
    removeUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, removeUser } = slice.actions;
export default slice.reducer;
