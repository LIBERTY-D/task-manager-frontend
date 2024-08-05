import { FaTasks } from "react-icons/fa";
import "./accountpop.css";
import { CiLocationOn, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FC } from "react";

type AccountPopType = {
  logoutUser: (
    _: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => void;
};
export const AccountPop: FC<AccountPopType> = ({ logoutUser }) => {
  return (
    <div className="account-pop">
      <Link to="/dashboard/profile" className="account-pop-item">
        <button>
          <VscAccount className="account-pop-icon" />
          Profile
        </button>
      </Link>

      <Link to="/dashboard/account" className="account-pop-item">
        <button>
          <CiSettings className="account-pop-icon" />
          Account
        </button>
      </Link>

      <Link to="/dashboard/tasks" className="account-pop-item">
        <button>
          <FaTasks className="account-pop-icon" />
          Completed Tasks
        </button>
      </Link>
      <Link to="/dashboard/location" className="account-pop-item">
        <button>
          <CiLocationOn className="account-pop-icon" />
          Your location
        </button>
      </Link>

      {/* <Link to="dashboard/notifications" className="account-pop-item">
        <button>
          <IoIosNotificationsOutline className="account-pop-icon" />
          Notifications
        </button>
      </Link> */}
      <Link to="#" className="account-pop-item" onClick={logoutUser}>
        <button>
          <RiLogoutCircleLine className="account-pop-icon" />
          logout
        </button>
      </Link>
    </div>
  );
};
