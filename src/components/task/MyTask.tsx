import { FC } from "react";
import "./mytask.css";
import React from "react";

type DoneTask = {
  id: number;
  title: string;
  completedOn: Date | null;
  removeCompletedTask: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
};
export const MyTask: FC<DoneTask> = ({
  title,
  completedOn,
  removeCompletedTask,
  id,
}) => {
  return (
    <div className="task-item">
      <div className="task-link">
        <div className="task-bg"></div>

        <div className="task-title">{title}</div>

        <div className="task-date-box">
          completed on:{" "}
          <span className="task-date">
            {completedOn &&
              new Date(completedOn).toDateString() +
                " " +
                new Date(completedOn).toLocaleTimeString()}
          </span>
          <div className="task-button-container">
            <button type="button" onClick={(e) => removeCompletedTask(e, id)}>
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
