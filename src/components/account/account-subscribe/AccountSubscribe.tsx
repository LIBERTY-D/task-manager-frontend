import { FC } from "react";
import "./accountsubscribe.css";

type AccountSubscribeType = {
  subScribeModal: () => void;
};
export const AccountSubscribe: FC<AccountSubscribeType> = ({
  subScribeModal,
}) => {
  return (
    <main className="account-subscibe">
      <div className="form">
        <div className="subtitle">News Letter Subscription</div>
        <div className="input-container ic1">
          <label htmlFor="subscribe">subscribed</label>
          <input
            id="subscribe"
            className="input"
            value="not yet subscribed"
            type="text"
            readOnly
          />
        </div>

        <button type="button" className="submit" onClick={subScribeModal}>
          subscribe now
        </button>
      </div>
    </main>
  );
};
