//@ts-nocheck
import React, {
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CiSquarePlus } from "react-icons/ci";
import "./modal.css";
import { Tag, Toast } from "../../components";
import { DragType } from "../../pages";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../context/auth/Auth";

const TASK_URL = import.meta.env.VITE_TASK_URL;

type ModalType = {
  type: "update" | "add";
  data?: {
    completed: boolean;
    id?: number;
    title: string;
    desc: string;
    dueDate: Date | null;
    tags: string[];
  };
  show: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  excludeRef: MutableRefObject<HTMLButtonElement | null>;
  editRef: React.RefObject<HTMLDivElement> | null;
  setTasks: React.Dispatch<React.SetStateAction<DragType[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editTaskIndex?: number | undefined | false;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitted: boolean;
};

type NewTaskType = {
  id?: number;
  completed: boolean;
  title: string;
  desc: string;
  dueDate: Date | null;
  tag: string;
  tags: string[];
};

type errType = {
  isErr: boolean;
  message: string;
};

export const Modal: FC<ModalType> = ({
  show,
  setShowModal,
  excludeRef,
  setTasks,
  type,
  data,
  editRef,
  editTaskIndex,
  setIsEditing,
  setIsSubmitted,
  isSubmitted,
}) => {
  const [newTask, setNewTask] = useState<NewTaskType>({
    completed: false,
    id: undefined,
    title: "",
    desc: "",
    dueDate: null,
    tag: "",
    tags: [],
  });

  const [msg, setMsg] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState<errType>({ isErr: false, message: "" });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { user } = useAuth();
  useEffect(() => {
    if (data) {
      setNewTask({
        completed: data.completed,
        id: data.id,
        title: data.title,
        desc: data.desc,
        dueDate: data.dueDate,
        tag: "",
        tags: data.tags,
      });
      setStartDate(data.dueDate);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const element = e.target;
    setNewTask((prevState) => {
      return { ...prevState, [element.name]: element.value };
    });
  };

  const handleTags = (_: React.MouseEvent<HTMLButtonElement>) => {
    setNewTask((prevState) => {
      return { ...prevState, tags: [...prevState.tags, newTask.tag], tag: "" };
    });
  };

  const handleTaskSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === "add") {
      if (newTask.title === "" || newTask.desc === "" || startDate === null) {
        setErr({
          isErr: true,
          message: "(title, desc, dueDate) cannot be empty",
        });
        setTimeout(() => {
          setErr({ isErr: false, message: "" });
        }, 3000);
      } else {
        await submitTaskToServer();
      }
    } else {
      if (newTask.title === "" || newTask.desc === "" || startDate === null) {
        setErr({
          isErr: true,
          message: "(title, desc, dueDate) cannot be empty",
        });
        setTimeout(() => {
          setErr({ isErr: false, message: "" });
        }, 3000);
      } else {
        await editsubmitTaskToServer();
      }
    }
  };

  const emptyInputs = (): void => {
    setTimeout(() => {
      setNewTask({
        title: "",
        desc: "",
        dueDate: null,
        tag: "",
        tags: [],
        completed: false,
      });
      setStartDate(null);
      setIsSubmitted(false);
      setErr({ isErr: false, message: "" });
    }, 3000);
  };

  useEffect(() => {
    if (isSubmitted) {
      emptyInputs();
    }
  }, [isSubmitted]);

  const closeModalHandler = (event: MouseEvent) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.target as Node) &&
      (!excludeRef.current ||
        !excludeRef.current.contains(event.target as Node)) &&
      (!editRef?.current || !editRef.current.contains(event.target as Node))
    ) {
      setShowModal(false);
    }
  };

  const closeModal = (_: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeModalHandler);
    return () => {
      document.removeEventListener("click", closeModalHandler);
    };
  }, [closeModalHandler]);

  const submitTaskToServer = async () => {
    try {
      const postTask = await axios.post(
        TASK_URL,
        {
          ...newTask,
          userId: user?.user.id,
          dueDate: startDate,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.user.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (postTask.status == 201) {
        setMsg("Task added");
        setTasks((prevState) => {
          return [{ ...newTask, dueDate: startDate }, ...prevState];
        });
        setIsSubmitted(true);
        setErr({ isErr: false, message: "" });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr({ isErr: true, message: err.response?.data.message });
      } else {
        setErr({ isErr: true, message: "an unknown error occured" });
      }
    }
  };

  const editsubmitTaskToServer = async () => {
    try {
      const postTask = await axios.patch(TASK_URL, newTask, {
        headers: {
          Authorization: "Bearer " + user?.user.token,
          "Content-Type": "application/json",
        },
      });
      if (postTask.status == 200) {
        setIsEditing(false);
        setMsg("Task updated");
        setIsSubmitted(true);
        setErr({ isErr: false, message: "" });
        setTasks((prevState) => {
          const edit = prevState.find((_, index) => index === editTaskIndex);
          if (edit) {
            edit.dueDate = startDate;
            edit.id = newTask.id;
            edit.desc = newTask.desc;
            edit.title = newTask.title;
            edit.completed = newTask.completed;
            prevState.splice(editTaskIndex, 1, edit);
          }
          return prevState;
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr({ isErr: true, message: err.response?.data.message });
      } else {
        setErr({ isErr: true, message: "an unknown error occured" });
      }
    }
  };

  return (
    <>
      {isSubmitted && msg.length > 0 && (
        <Toast
          show={isSubmitted}
          message={msg}
          duration={3000}
          type="success"
        />
      )}
      {err.isErr && (
        <Toast show={true} message={err.message} duration={3000} type="warn" />
      )}
      <div
        className={`form-container-modal ${show ? "show" : ""}`}
        ref={formRef}
      >
        <button className="modal-close-add-item" onClick={closeModal}>
          <IoMdClose />
        </button>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              value={newTask.title}
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Desc</label>
            <textarea
              value={newTask.desc}
              name="desc"
              id="desc"
              rows={10}
              cols={50}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Date</label>
            <DatePicker
              name="dueDate"
              selected={startDate}
              id="dueDate"
              onChange={(dueDate) => setStartDate(dueDate)}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <div className="added-tags">
              {newTask.tags.map((text, index) => {
                return <Tag tag={text} key={index} />;
              })}
            </div>
            <div className="last">
              <input
                value={newTask.tag}
                type="text"
                id="tag"
                name="tag"
                onChange={handleChange}
              />
              <button type="button" className="add-tag" onClick={handleTags}>
                <CiSquarePlus className="plus-icon" />
              </button>
            </div>
          </div>
          <button
            className="form-submit-btn"
            type="submit"
            onClick={(e) => {
              handleTaskSubmit(e);
            }}
          >
            {type === "add" ? "Add" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};
