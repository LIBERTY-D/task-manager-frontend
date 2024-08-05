import { IoIosClose } from "react-icons/io";
import "../../update.css";
import React, { FC, useState } from "react";
import { updatePasswordType } from "./Account";
import { useAuth } from "../../context/auth/Auth";

type UpdatePasswordModalType = {
  closeModal: () => void;
  updatePassword: (
    _: React.MouseEvent<HTMLButtonElement>,
    data: updatePasswordType
  ) => Promise<void>;
};
export const UpdatePasswordModal: FC<UpdatePasswordModalType> = ({
  closeModal,
  updatePassword,
}) => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="main-update">
      <span className="close-update" onClick={closeModal}>
        <IoIosClose />
      </span>
      <form className="form-container-modal-update">
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            value={data.oldPassword}
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            value={data.newPassword}
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={data.confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="form-submit-btn"
          onClick={async (e) =>
            await updatePassword(e, {
              firstName: user?.user.firstName,
              lastName: user?.user.lastName,
              password: data.newPassword,
              email: user?.user.email,
              oldPassword: data.oldPassword,
              confirmPassword: data.confirmPassword,
              newPassword: data.newPassword,
            })
          }
        >
          update password
        </button>
      </form>
    </div>
  );
};
