import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_EVENTS } from "../../data/data";

const slice = createSlice({
  name: "calendar",
  initialState: {
    events: INITIAL_EVENTS,
  },
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    addEvent(state, action) {
      state.events.push(action.payload);
    },
    removeEvent(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, removeEvent } = slice.actions;
export default slice.reducer;
