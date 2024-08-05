import { FC } from "react";
import "./accountsecurity.css";
import { ContextType, useAuth } from "../../../context/auth/Auth";

type AccountSecurityType = {
  passwordModal: () => void;
};
export const AccountSecurity: FC<AccountSecurityType> = ({ passwordModal }) => {
  const { user }: ContextType = useAuth();
  return (
    <main className="account-security">
      <div className="form">
        <div className="subtitle">Password Management</div>
        <div className="input-container ic1">
          <label htmlFor="password">password</label>
          <input
            id="password"
            className="input"
            value={user?.user?.password}
            type="password"
            readOnly
          />
        </div>

        <button type="button" className="submit" onClick={passwordModal}>
          change password
        </button>
      </div>
    </main>
  );
};
