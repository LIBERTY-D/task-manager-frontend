import { FC, useState } from "react";
import "./deleteaccountmodal.css";

type DeleteAcountModalType = {
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;

  setValueData: React.Dispatch<React.SetStateAction<string>>;
};
export const DeleteAcountModal: FC<DeleteAcountModalType> = ({
  setValueData,
  closeHandler,
  deleteHandler,
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="main-update">
      <div className="delete-account-modal">
        <div className="delete-account-modal-content">
          <div className="delete-account-modal-header">
            <h2>Delete Account</h2>
            <button className="close-button" onClick={closeHandler}>
              &times;
            </button>
          </div>
          <div className="delete-account-modal-body">
            <p> Enter DELETE to confirm deletion of your account.</p>
            <form>
              <label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setValueData(e.target.value);
                  }}
                  required
                />
              </label>
              <div className="delete-account-modal-actions">
                <button type="button" onClick={closeHandler}>
                  Cancel
                </button>
                <button type="button" onClick={deleteHandler}>
                  delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
