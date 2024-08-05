import { IoIosClose } from "react-icons/io";
import "../../update.css";
import { FC } from "react";

type UpdateSubScribeModalType = {
  closeModal: () => void;
};
export const UpdateSubScribeModal: FC<UpdateSubScribeModalType> = ({
  closeModal,
}) => {
  return (
    <div className="main-update">
      <span className="close-update">
        <IoIosClose onClick={closeModal} />
      </span>
      <form className="form-container-modal-update">
        <div className="form-group">
          <h1>Subscribe/UnsubScribe?</h1>
          <div className="radio-container">
            <label htmlFor="yes">
              <span>Yes</span>
            </label>
            <input type="radio" id="yes" name="choice" value="yes" />
          </div>
          <div className="radio-container">
            <label htmlFor="no">
              <span>No</span>
            </label>
            <input type="radio" id="no" name="choice" value="no" />
          </div>
        </div>

        <button type="button" className="form-submit-btn">
          unsubscribe
        </button>
      </form>
    </div>
  );
};
