import React, { FC, useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { IoWarning } from "react-icons/io5";
import "./toast.css";

type ToastType = {
  message: string;
  duration: number;
  onClose?: (value: React.SetStateAction<boolean>) => void;
  type: "warn" | "success" | "primary";
  backgroundColor?: string;
  textColor?: string;
  show: boolean;
};

export const Toast: FC<ToastType> = ({
  type,
  message,
  backgroundColor,
  show,
  duration,
  onClose,
  textColor,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => {
          if (onClose) {
            onClose(false);
          }
        }, duration);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <div
      className={`toast-container ${isVisible ? "slide-in" : "slide-out"}`}
      style={{ backgroundColor, color: textColor }}
    >
      {type == "success" && <TiTickOutline className="success-icon" />}{" "}
      {type == "warn" && <IoWarning className="danger-icon" />}
      {message}
      <div
        className={`progress-bar ${type}`}
        style={{ animationDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};
