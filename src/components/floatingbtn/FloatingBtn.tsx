import { FC, RefObject } from "react";
import "./floatingbtn.css";

type FloatingBtnType = {
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  refobj: RefObject<HTMLButtonElement | undefined>;
};
export const FloatingBtn: FC<FloatingBtnType> = ({ handler, refobj }) => {
  return (
    <button ref={refobj} className="fab" onClick={handler}>
      +
    </button>
  );
};
