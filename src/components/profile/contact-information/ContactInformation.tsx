import { FC } from "react";
import "./contactinformation.css";
import { ContextType, useAuth } from "../../../context/auth/Auth";
type ContactInformationType = {
  showProfModal: () => void;
};
export const ContactInformation: FC<ContactInformationType> = ({
  showProfModal,
}) => {
  const { user }: ContextType = useAuth();

  return (
    <main className="contact-information">
      <div className="form">
        <div className="subtitle">Contact Information</div>
        <div className="input-container ic1">
          <label htmlFor="firstNamr">Firstname</label>
          <input
            id="firstName"
            className="input"
            value={user?.user?.firstName}
            type="text"
            readOnly
          />
        </div>
        <div className="input-container ic2">
          <label htmlFor="firstNamr">Lastname</label>
          <input
            id="firstName"
            className="input"
            value={user?.user?.lastName}
            type="text"
            readOnly
          />
        </div>

        <div className="input-container ic2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={user?.user?.email}
            type="text"
            readOnly
          />
        </div>
        <button type="button" className="submit" onClick={showProfModal}>
          change me
        </button>
      </div>
    </main>
  );
};
