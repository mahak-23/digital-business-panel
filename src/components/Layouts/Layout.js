import React from "react";
import moment from "moment/moment";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import css from "./Layout.module.css";
import Sidebar from "./Sidebar/Sidebar";

const titleMap = {
  dashboard: "Dashboard",
  calender: "Calendar",
  board: "Board",
  users: "Users",
};

const Layout = () => {
  const { pathname } = useLocation();
  const routeKey = pathname.replace(/^\//, "") || "dashboard";
  const pageTitle = titleMap[routeKey] ?? "Dashboard";

  return (
    <div className={css.container}>
      <Sidebar />
      {pathname === "/" && <Navigate to="/dashboard" />}

      <div className={css.dashboard}>
        <div className={css.header}>
          <div className={css.topBaseGradient}>
            <div className="gradient-red"></div>
            <div className="gradient-orange"></div>
            <div className="gradient-blue"></div>
          </div>

          <span className={css.pageTitle}>{pageTitle}</span>
          <span className={css.date}>{moment().format("dddd, Do MMM YYYY")}</span>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
