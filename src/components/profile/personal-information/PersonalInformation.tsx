import { FC } from "react";
import "./personalinformation.css";
import { ContextType, useAuth } from "../../../context/auth/Auth";
import { BytesToUrl } from "../../../utils/BytesToBase64";

type PersonalInformationType = {
  showProfModal: () => void;
};
export const PersonalInformation: FC<PersonalInformationType> = ({
  showProfModal,
}) => {
  const { user }: ContextType = useAuth();

  return (
    <main className="personal-information">
      <div id="personal-container">
        <img
          className="profile-img"
          src={
            user?.user.profileImage
              ? BytesToUrl(user.user.profileImage)
              : "/images/blank.jpg"
          }
        />
        <h1>{user?.user.firstName + " " + user?.user.lastName}</h1>
        <textarea
          className="description"
          value={user?.user?.profileDesc}
          readOnly
        />

        <div className="social">
          <a>GitHub</a>
          <a>Twitter</a>
          <a>LinkedIn</a>
        </div>
        <button type="button" onClick={showProfModal}>
          Change me
        </button>
      </div>
    </main>
  );
};
