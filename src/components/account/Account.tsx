//@ts-nocheck
import "./account.css";
import { AccountInformation } from "./account-information/AccountInformation";
import { AccountSecurity } from "./account-security/AccountSecurity";
import { AccountSubscribe } from "./account-subscribe/AccountSubscribe";
import { UpdatePasswordModal } from "./UpdatePasswordModal";
import { UpdateSubScribeModal } from "./UpdateSubscribeModal";
import { useState } from "react";
import { DeleteAccount } from "./delete-account/DeleteAccount";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../context/auth/Auth";
import { SlideTopToast } from "../slide-top-toast/SlideTopToast";
import React from "react";
import { useNavigate } from "react-router";

const USER_URL = import.meta.env.VITE_USER_URL;
export type ModalState = { passwordModal: boolean; subScribeModal: boolean };
type errorType = {
  updatePass?: {
    isError: boolean;
    isSuccces: boolean;
    message: string;
  };
  deleteAccount?: {
    isError: boolean;
    isSuccces: boolean;
    message: string;
    showDeleteModal: boolean;
  };
};
export type updatePasswordType = {
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  email: string | undefined;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export const Account = () => {
  const [show, setShow] = useState<ModalState>({
    passwordModal: false,
    subScribeModal: false,
  });
  const [successOrErr, setSuccessOrErr] = useState<errorType>({
    updatePass: { isError: false, isSuccces: false, message: "" },
  });

  const [valueData, setValueData] = useState<string>(""); //HOLDS DELETE WORD
  const navigate = useNavigate();
  const { user } = useAuth();

  const passwordModal = () => {
    setShow((prevState) => {
      return { ...prevState, passwordModal: true };
    });
  };
  const subscribeModal = () => {
    setShow((prevState) => {
      return { ...prevState, subScribeModal: true };
    });
  };
  const closeModal = () => {
    if (show.passwordModal || show.subScribeModal) {
      setShow((_) => {
        return { subScribeModal: false, passwordModal: false };
      });
    }
  };

  const updatePassword = async (
    _: React.MouseEvent<HTMLButtonElement>,
    data: updatePasswordType
  ) => {
    if (
      data.confirmPassword === "" ||
      data.oldPassword === "" ||
      data.newPassword === ""
    ) {
      return setSuccessOrErr({
        updatePass: {
          message: "all fields required",
          isError: true,
          isSuccces: false,
        },
      });
    } else if (data.newPassword !== data.confirmPassword) {
      return setSuccessOrErr({
        updatePass: {
          message: "passwords do not match",
          isError: true,
          isSuccces: false,
        },
      });
    } else {
      try {
        const postData = await axios.patch(
          USER_URL + `/${user?.user.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + user?.user.token,
            },
          }
        );

        if (postData.status == 200) {
          setSuccessOrErr({
            updatePass: {
              isError: false,
              isSuccces: true,
              message: "updated data",
            },
          });
        }

        setTimeout(() => {
          setSuccessOrErr({
            updatePass: {
              isError: false,
              isSuccces: false,
              message: "",
            },
          });
          closeModal();
        }, 3000);
      } catch (err) {
        if (err instanceof AxiosError) {
          setSuccessOrErr({
            updatePass: {
              isError: true,
              isSuccces: false,
              message: err.response?.data.message,
            },
          });
        } else {
          // console.log(err);
        }
      }
    }
  };

  const closeSlideTopToast = (_: React.MouseEvent<HTMLButtonElement>) => {
    setSuccessOrErr({
      updatePass: {
        isError: false,
        isSuccces: false,
        message: "",
      },
    });
  };

  const openDeleteModalHandler = (_: React.MouseEvent<HTMLButtonElement>) => {
    setSuccessOrErr({
      deleteAccount: {
        isError: false,
        message: "",
        isSuccces: false,
        showDeleteModal: true,
      },
    });
  };
  const closeDeleteModalHandler = (_: React.MouseEvent<HTMLButtonElement>) => {
    setSuccessOrErr({
      deleteAccount: {
        isError: false,
        message: "",
        isSuccces: false,
        showDeleteModal: false,
      },
    });
  };
  // TODO: delete account
  const deleteAccountHandler = async (
    _: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (valueData !== "DELETE") {
      setSuccessOrErr({
        deleteAccount: {
          isError: true,
          message: "type 'DELETE' to delete account!",
          isSuccces: false,
          showDeleteModal: true,
        },
      });
    } else {
      try {
        const res = await axios.delete(USER_URL + "/" + user?.user.id, {
          headers: {
            Authorization: "Bearer " + user?.user.token,
          },
        });
        if (res.status == 204) {
          setSuccessOrErr({
            deleteAccount: {
              isError: false,
              isSuccces: true,
              message: "delete success",
              showDeleteModal: false,
            },
          });
          sessionStorage.removeItem("task-manager-user");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          setSuccessOrErr({
            deleteAccount: {
              isError: true,
              isSuccces: false,
              message: "error deleting",
              showDeleteModal: true,
            },
          });

          setTimeout(() => {
            setSuccessOrErr({
              deleteAccount: {
                isError: false,
                isSuccces: false,
                message: "",
                showDeleteModal: true,
              },
            });
          }, 3000);
        }
      } catch (err) {
        setSuccessOrErr({
          deleteAccount: {
            isError: true,
            isSuccces: false,
            message: "error deleting",
            showDeleteModal: true,
          },
        });

        setTimeout(() => {
          setSuccessOrErr({
            deleteAccount: {
              isError: false,
              isSuccces: false,
              message: "",
              showDeleteModal: true,
            },
          });
        }, 3000);
      }
    }
  };
  return (
    <>
      {successOrErr.updatePass?.isError && (
        <SlideTopToast
          onClose={closeSlideTopToast}
          message={successOrErr.updatePass.message}
          show={successOrErr.updatePass.isError}
        />
      )}
      {successOrErr.updatePass?.isSuccces && (
        <SlideTopToast
          onClose={closeSlideTopToast}
          message={successOrErr.updatePass.message}
          show={successOrErr.updatePass.isSuccces}
        />
      )}
      {successOrErr.deleteAccount?.isSuccces && (
        <SlideTopToast
          onClose={closeSlideTopToast}
          message={successOrErr.deleteAccount.message}
          show={successOrErr.deleteAccount.isSuccces}
        />
      )}
      {successOrErr.deleteAccount?.isError && (
        <SlideTopToast
          onClose={closeSlideTopToast}
          message={successOrErr.deleteAccount.message}
          show={successOrErr.deleteAccount.isError}
        />
      )}
      <main className="content">
        <h1>Account Settings</h1>

        <div className="account-main">
          {show.passwordModal && (
            <UpdatePasswordModal
              updatePassword={updatePassword}
              closeModal={closeModal}
            />
          )}
          {show.subScribeModal && (
            <UpdateSubScribeModal closeModal={closeModal} />
          )}
          <AccountInformation />
          <AccountSecurity passwordModal={passwordModal} />

          <AccountSubscribe subScribeModal={subscribeModal} />
          <DeleteAccount
            setValueData={setValueData}
            showDeleteModal={successOrErr.deleteAccount?.showDeleteModal}
            openHandler={openDeleteModalHandler}
            deleteHandler={deleteAccountHandler}
            closeHandler={closeDeleteModalHandler}
          />
        </div>
      </main>
    </>
  );
};
