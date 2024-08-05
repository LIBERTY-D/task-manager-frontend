import { Route, Routes } from "react-router";
import { Account, Location, Profile, Sidebar, Task } from "../../components";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Task />} />
          <Route path="location" element={<Location />} />
        </Routes>
      </div>
    </div>
  );
};
