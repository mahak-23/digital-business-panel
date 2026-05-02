import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import themeReducer from "../features/theme/themeSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import usersReducer from "../features/users/usersSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import sidebarReducer from "../features/ui/sidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    calendar: calendarReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    board: boardReducer,
    sidebar: sidebarReducer,
  },
});
