import { IoMdClose } from "react-icons/io";
import "./slidetoptoast.css";
type ToastType = {
  message: string;
  show: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SlideTopToast: React.FC<ToastType> = ({
  message,
  show,
  onClose,
}) => {
  return (
    <div className={`slide-top-toast ${show ? "show" : ""}`}>
      <div className="slide-top-toast-message">{message}</div>
      <button className="slide-top-toast-close" onClick={onClose}>
        <IoMdClose />
      </button>
    </div>
  );
};
