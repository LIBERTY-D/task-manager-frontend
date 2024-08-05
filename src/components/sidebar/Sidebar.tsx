import "./sidebar.css";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { CiSettings, CiLocationOn } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <HiHome className="sidebar-icons" />
          <Link to="/">Home</Link>
        </li>
        <li>
          <MdAccountCircle className="sidebar-icons" />
          <Link to="/dashboard/account">Account</Link>
        </li>
        <li>
          <CiSettings className="sidebar-icons" />
          <Link to="/dashboard/profile">Profile</Link>
        </li>
        <li>
          <FaTasks className="sidebar-icons" />
          <Link to="/dashboard/tasks">Tasks Completed</Link>
        </li>
        <li>
          <CiLocationOn className="sidebar-icons" />
          <Link to="/dashboard/location">Location</Link>
        </li>
      </ul>

      <div className="sidebar-nav-footer">
        <span>Task Manager version </span>

        <span>1.0.0</span>
      </div>
    </nav>
  );
};
