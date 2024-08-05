import { FC } from "react";
import { Search, AccountPop } from "../../components";
import "./topbar.css";
import { useAuth } from "../../context/auth/Auth";
import { BytesToUrl } from "../../utils/BytesToBase64";

type TopBarType = {
  handleSearch: (str: string) => void;
  logoutUser: (
    _: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => void;
};
export const TopBar: FC<TopBarType> = ({ handleSearch, logoutUser }) => {
  const { user } = useAuth();

  return (
    <nav className="topbar">
      <div className="topbar-container">
        <div className="topbar-container-logo">Task Manager</div>
        <div className="topbar-container-search-container">
          {" "}
          <Search handleSearch={handleSearch} />
        </div>
        <div className="topbar-container-profile">
          <div className="topbar-container-profile-img-container">
            <img
              className="topbar-container-img"
              src={
                user?.user.profileImage
                  ? BytesToUrl(user.user.profileImage)
                  : "/images/blank.jpg"
              }
              alt=""
            />
          </div>
          <span className="topbar-container-profile-name">daniel</span>
          {/* account pop */}
          <AccountPop logoutUser={logoutUser} />
          {/* end of account pop */}
        </div>
      </div>
    </nav>
  );
};
