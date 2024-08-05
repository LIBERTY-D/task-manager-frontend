//@ts-nocheck
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  TopBar,
  Todo,
  TripleCard,
  Modal,
  FloatingBtn,
  Toast,
  Footer,
} from "../../components";
import { workingData } from "../../assets/data";
import "./home.css";
import { useAuth } from "../../context/auth/Auth";
import axios, { AxiosError } from "axios";

export type DragType = {
  completed: boolean;
  completedOn: Date | null;
  id?: number;
  title: string;
  desc: string;
  dueDate: Date | null;
  tags: string[];
};

/* @ts-ignore: start */
const USER_URL = import.meta.env.VITE_USER_URL;
const TASK_URL = import.meta.env.VITE_TASK_URL;
export const Home = () => {
  const [tasks, setTasks] = useState<DragType[]>([]); //PUT WORKING DATA
  const [showModal, setShowModal] = useState<boolean>(false);
  const floatingActionButtonRef = useRef<HTMLButtonElement>(null);
  const [editRef, setEditRef] = useState<RefObject<HTMLDivElement> | null>(
    null
  );
  const [_, setDeleteRef] = useState<RefObject<HTMLDivElement> | null>(null);
  const [taskTemp, setTasksTemp] = useState<DragType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<DragType>({
    completed: false,
    completedOn: null,
    id: undefined,
    title: "",
    desc: "",
    dueDate: null,
    tags: [],
  });
  const [editTaskIndex, setEditTaskIndex] = useState<number | undefined>(
    undefined
  );
  const [__, setDeleteIndex] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [isDeletingTask, setIsDeletingTask] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const gottenTasks = await axios.get(USER_URL + "/" + user?.user.id, {
          headers: {
            Authorization: "Bearer " + user?.user.token,
          },
        });
        let data: Array<DragType> = gottenTasks.data.user.tasks;
        data = data.filter((tsk, _) => !tsk.completed);

        setTasks(data);
        setTasksTemp(data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchTasks();
  }, [user, isSubmitted]);

  const showModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      floatingActionButtonRef.current &&
      floatingActionButtonRef.current.contains(e.target as HTMLButtonElement)
    ) {
      setShowModal(true);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: DragType,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ task, index }));
    e.currentTarget.classList.add("dragging");
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { index: dragIndex, task: draggedTodo } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    const containerRect = e.currentTarget.getBoundingClientRect();
    const dropY = e.clientY - containerRect.top;
    const itemHeight = containerRect.height / tasks.length;
    let dropIndex = Math.floor(dropY / itemHeight);

    if (dropIndex < 0) {
      dropIndex = 0;
    }
    if (dropIndex >= tasks.length) {
      dropIndex = tasks.length - 1;
    }
    if (dragIndex === dropIndex) {
      return;
    }

    const updatedData = [...tasks];
    updatedData.splice(dragIndex, 1);
    updatedData.splice(dropIndex, 0, draggedTodo);
    setTasks(updatedData);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleSearch = (str: string) => {
    if (str.length > 0) {
      const searched = tasks.filter((task) =>
        task.title.toLowerCase().startsWith(str.toLocaleLowerCase())
      );
      setTasks(searched);
    } else {
      setTasks(taskTemp);
    }
  };

  const handleTaskEdit = (
    e: React.MouseEvent,
    data: DragType,
    editButtonRef: RefObject<HTMLDivElement>
  ) => {
    setEditRef(editButtonRef);
    setEditTask(data);
    const index = tasks.findIndex((task) => task.id === data.id);
    setEditTaskIndex(index);
    if (
      editButtonRef.current &&
      editButtonRef.current.contains(e.target as HTMLDivElement)
    ) {
      setShowModal(true);
    }

    setIsEditing(true);
  };
  const handleTaskDelete = async (
    _: React.MouseEvent,
    data: DragType,
    deleteRef: RefObject<HTMLDivElement>
  ) => {
    await deleteSubmitTaskToServer(data, deleteRef);
  };

  useEffect(() => {
    if (isDeletingTask) {
      setTimeout(() => {
        setIsDeletingTask(false);
      }, 3000);
    }
  }, [isDeletingTask, setIsDeletingTask, tasks]);

  const logoutUser = (_: React.MouseEvent<HTMLButtonElement>) => {
    logout();
  };

  const deleteSubmitTaskToServer = async (
    data: DragType,
    deleteRef: RefObject<HTMLDivElement>
  ) => {
    try {
      const postTask = await axios.delete(TASK_URL + "/" + data.id, {
        headers: {
          Authorization: "Bearer " + user?.user.token,
        },
      });
      if (postTask.status == 200) {
        setMsg("delete success");
        setIsDeletingTask(true);
        setDeleteRef(deleteRef);
        setErr(false);
        const index = tasks.findIndex((task) => task.id === data.id);
        setDeleteIndex(index);
        setTasks((prevState) => {
          return prevState.filter((tsk, _) => tsk.id !== data.id);
        });
      } else if (postTask.status == 401) {
        setMsg("try to login in again,token expired or not valid");
        setErr(true);
        setTimeout(() => {
          setMsg("");
          setErr(false);
        }, 3000);
      } else if (postTask.status == 403) {
        setMsg(postTask.statusText);
        setErr(true);
        setTimeout(() => {
          setMsg("");
          setErr(false);
        }, 3000);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setMsg(err.response?.data.message);
        setErr(true);
        setTimeout(() => {
          setMsg("");
          setErr(false);
        }, 3000);
      } else {
        setMsg("an unknown error occured");
        setErr(true);
        setTimeout(() => {
          setMsg("");
          setErr(false);
        }, 3000);
      }
    }
  };
  const updateCompleteToServer = async (newTask: DragType) => {
    try {
      const postTask = await axios.patch(
        TASK_URL,
        { ...newTask, isCompleted: true, completedOn: new Date() },
        {
          headers: {
            Authorization: "Bearer " + user?.user.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (postTask.status == 200) {
        setIsEditing(false);
        setMsg("Task completed");
        setIsSubmitted(true);
        setErr(false);
        setTasks((prevState) => {
          return prevState.filter((tsk, _) => tsk.id !== newTask.id);
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErr(true);
        setMsg(err.response?.data.message);
      } else {
        setErr(true);
        setMsg("an unknown error occured");
      }
    }
  };
  const goalComplete = async (
    _: React.MouseEvent | React.MouseEventHandler<SVGElement>,
    data: DragType
  ) => {
    await updateCompleteToServer(data);
  };
  return (
    <>
      {isDeletingTask && (
        <Toast show={true} message={msg} duration={3000} type="warn" />
      )}
      {err && <Toast show={err} message={msg} duration={3000} type="warn" />}
      {isSubmitted && msg.length > 0 && (
        <Toast show={true} message={msg} duration={3000} type="success" />
      )}
      <div className="home">
        <TopBar handleSearch={handleSearch} logoutUser={logoutUser} />
        <Modal
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setIsEditing={setIsEditing}
          setTasks={setTasks}
          editRef={editRef}
          excludeRef={floatingActionButtonRef}
          setShowModal={setShowModal}
          show={showModal}
          data={editTask}
          type={isEditing ? "update" : "add"}
          editTaskIndex={isEditing && editTaskIndex}
        />
        <div
          className="home-todos"
          onDrop={(e) => handleDrop(e)}
          onDragOver={handleDragOver}
        >
          {tasks.length === 0 ? (
            <TripleCard text="Add Your Tasks" />
          ) : (
            tasks.map((todo, index) => {
              return (
                <Todo
                  handleDragEnd={handleDragEnd}
                  completed={todo.completed}
                  key={todo.id}
                  id={todo.id}
                  index={index}
                  onDragStart={(e) => handleDragStart(e, todo, index)}
                  title={todo.title}
                  desc={todo.desc}
                  completedOn={todo.completedOn}
                  dueDate={new Date(todo.dueDate)}
                  tags={todo.tags}
                  handleTaskEdit={handleTaskEdit}
                  handleTaskDelete={handleTaskDelete}
                  goalComplete={goalComplete}
                />
              );
            })
          )}
        </div>

        <FloatingBtn
          refobj={floatingActionButtonRef}
          handler={showModalHandler}
        />
      </div>
      <Footer />
    </>
  );
};
/* @ts-ignore: end */