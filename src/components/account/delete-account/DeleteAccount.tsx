//@ts-nocheck
import React, { FC } from "react";
import "./deleteaccount.css";
import { DeleteAcountModal } from "../DeleteAccountModal";

type DeleteAccountType = {
  openHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setValueData: React.Dispatch<React.SetStateAction<string>>;
  showDeleteModal: boolean;
};
export const DeleteAccount: FC<DeleteAccountType> = ({
  showDeleteModal,
  openHandler,
  deleteHandler,
  closeHandler,
  setValueData,
}) => {
  return (
    <>
      {showDeleteModal && (
        <DeleteAcountModal
          openHandler={openHandler}
          deleteHandler={deleteHandler}
          closeHandler={closeHandler}
          setValueData={setValueData}
        />
      )}
      <main className="account-delete">
        <div className="form">
          <div className="subtitle">Delete Account</div>
          <button type="button" className="submit" onClick={openHandler}>
            Delete Account
          </button>
        </div>
      </main>
    </>
  );
};
