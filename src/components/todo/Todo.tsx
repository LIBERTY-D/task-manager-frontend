//@ts-nocheck
import React, { FC, useRef } from "react";
import "./todo.css";
import { Tag } from "../tag/Tag";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoPinSharp } from "react-icons/io5";
import { DragType } from "../../pages";
import { IoIosDoneAll } from "react-icons/io";

type TodoType = {
  completedOn: Date | null;
  id: number;
  completed: boolean;
  title: string;
  dueDate: Date | null;
  desc: string;
  tags: string[];
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: DragType,
    index: number
  ) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  index: number;
  handleTaskEdit: (
    e: React.MouseEvent<HTMLDivElement>,
    data: DragType,
    refObj: React.RefObject<HTMLDivElement>
  ) => void;
  handleTaskDelete: (
    e: React.MouseEvent,
    data: DragType,
    deleteRef: React.RefObject<HTMLDivElement>
  ) => void;
  goalComplete: (
    _: React.MouseEvent | React.MouseEventHandler<SVGElement>,
    data: DragType
  ) => void;
};

export const Todo: FC<TodoType> = ({
  title,
  completedOn,
  dueDate,
  completed,
  id,
  desc,
  tags,
  onDragStart,
  index,
  handleDragEnd,
  handleTaskEdit,
  handleTaskDelete,
  goalComplete,
}) => {
  const editButtonRef = useRef<HTMLDivElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="card-todo"
      draggable
      onDragStart={(e) =>
        onDragStart(
          e,
          { id, completedOn, completed, title, desc, dueDate, tags },
          index
        )
      }
      onDragEnd={handleDragEnd}
    >
      <div className="cart-todo-calender-complete-icons">
        <IoPinSharp className="todo-pin" />
        <IoIosDoneAll
          className="todo-complete"
          title="goal complete"
          onClick={(e) => {
            goalComplete(e, {
              completed,
              completedOn,
              title,
              desc,
              dueDate,
              tags,
              id,
            });
          }}
        />
      </div>
      <h3 className="card-todo-title">{title}</h3>
      <p className="card-todo-content">{desc}</p>
      <div className="card-todo-date">{dueDate?.toDateString()}</div>
      <div className="card-tags">
        {tags?.map((text, index) => (
          <Tag tag={text} key={index} />
        ))}
      </div>
      <div className="card-todo-buttons">
        <div
          id={id && id.toLocaleString()}
          ref={editButtonRef}
          onClick={(e) =>
            handleTaskEdit(
              e,
              { completed, completedOn, title, desc, dueDate, tags, id },
              editButtonRef
            )
          }
        >
          <MdEdit className="todo-btn todo-edit" />
        </div>
        <div
          ref={deleteRef}
          onClick={(e) =>
            handleTaskDelete(
              e,
              { completedOn, completed, id, title, desc, dueDate, tags },
              deleteRef
            )
          }
        >
          <FaTrash className="todo-btn todo-del" />
        </div>
      </div>
      <div className="card-todo-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="15"
          width="15"
        >
          <path
            fill="#fff"
            d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
