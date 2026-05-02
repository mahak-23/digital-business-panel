import css from "./Sidebar.module.css";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Person } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../features/ui/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const menuItems = [
    { to: "dashboard", icon: <MdSpaceDashboard size={24} />, label: "Dashboard" },
    { to: "calender", icon: <AiFillCalendar size={24} />, label: "Calendar" },
    { to: "board", icon: <FaTasks size={24} />, label: "Board" },
    { to: "users", icon: <AiOutlineTable size={24} />, label: "Users" },
  ];

  return (
    <div className={`${css.container} ${isOpen ? css.open : css.collapsed}`}>
      <div className={css.header}>
        <img src="./logo.png" alt="Logo" className={css.logo} />
        <button
          className={css.toggleBtn}
          onClick={() => dispatch(toggleSidebar())}
          title={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
        </button>
      </div>

      <div className={css.menu}>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${css.item} ${isActive ? css.active : ""}`}
            title={item.label}
          >
            <span className={css.icon}>{item.icon}</span>
            {isOpen && <span className={css.label}>{item.label}</span>}
          </NavLink>
        ))}
      </div>

      <div className={css.userCard}>
        <div className={css.userIcon}>
          <Person fontSize="small" />
        </div>
        {isOpen && (
          <div className={css.userInfo}>
            <span>Mahak</span>
            <span>Admin</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
