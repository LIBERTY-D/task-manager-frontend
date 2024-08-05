import { FC } from "react";
import "./tag.css";

type TagType = {
  tag: string;
};

export const Tag: FC<TagType> = ({ tag }) => {
  return <div className="tag">#{tag}</div>;
};
