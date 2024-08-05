import "./accountinformation.css";

import { ContextType, useAuth } from "../../../context/auth/Auth";

export const AccountInformation = () => {
  const { user }: ContextType = useAuth();

  return (
    <>
      <main className="account-information">
        <div className="form">
          <div className="subtitle">Account Information</div>
          <div className="input-container ic1">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              value={user?.user?.username}
              type="text"
            />
          </div>

          <div className="input-container ic2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              value={user?.user.email}
              type="text"
            />
          </div>
          <button type="button" className="submit">
            change me
          </button>
        </div>
      </main>
    </>
  );
};
