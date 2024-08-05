import { useEffect, useState } from "react";
import { MyTask } from "./MyTask";
import "./task.css";
import { useAuth } from "../../context/auth/Auth";
import axios, { AxiosError } from "axios";
import { Toast } from "../toast/Toast";

type TaskType = {
  completedOn: Date | null;
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  desc: string;
  tags: string[];
};
type errType = {
  isErr: boolean;
  isSuccess: boolean;
  message: string;
};

const USER_URL = import.meta.env.VITE_USER_URL;
const TASK_URL = import.meta.env.VITE_TASK_URL;

export const Task = () => {
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  const [successOrErr, setSuccessOrErr] = useState<errType>({
    isErr: false,
    isSuccess: false,
    message: "",
  });
  const { user } = useAuth();

  const deleteSubmitTaskToServer = async (id: number) => {
    try {
      const postTask = await axios.delete(TASK_URL + "/" + id, {
        headers: {
          Authorization: "Bearer " + user?.user.token,
        },
      });
      if (postTask.status == 200) {
        setSuccessOrErr({
          message: "delete success",
          isErr: false,
          isSuccess: true,
        });

        setCompletedTasks((prevState) => {
          return prevState.filter((tsk, _) => tsk.id !== id);
        });
      } else if (postTask.status == 401) {
        setSuccessOrErr({
          message: "try to login in again,token expired or not valid",
          isErr: true,
          isSuccess: false,
        });

        setTimeout(() => {
          setSuccessOrErr({ message: "", isErr: false, isSuccess: false });
        }, 3000);
      } else if (postTask.status == 403) {
        setSuccessOrErr({
          message: postTask.statusText,
          isErr: true,
          isSuccess: false,
        });
        setTimeout(() => {
          setSuccessOrErr({ message: "", isErr: false, isSuccess: false });
        }, 3000);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setSuccessOrErr({
          message: err.response?.data.message,
          isErr: true,
          isSuccess: false,
        });
        setTimeout(() => {
          setSuccessOrErr({ message: "", isErr: false, isSuccess: false });
        }, 3000);
      } else {
        setSuccessOrErr({
          message: "an unknown error occured",
          isErr: true,
          isSuccess: false,
        });
        setTimeout(() => {
          setSuccessOrErr({ message: "", isErr: false, isSuccess: false });
        }, 3000);
      }
    }
  };
  const removeCompletedTask = async (
    _: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    await deleteSubmitTaskToServer(id);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const gottenTasks = await axios.get(USER_URL + "/" + user?.user.id, {
          headers: {
            Authorization: "Bearer " + user?.user.token,
          },
        });
        let data: Array<TaskType> = gottenTasks.data.user.tasks;
        data = data.filter((tsk) => tsk.completed);
        setCompletedTasks(data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <>
      {successOrErr.isErr && (
        <Toast
          show={successOrErr.isErr}
          message={successOrErr.message}
          duration={3000}
          type="warn"
        />
      )}
      {successOrErr.isSuccess && (
        <Toast
          show={successOrErr.isSuccess}
          message={successOrErr.message}
          duration={3000}
          type="success"
        />
      )}
      <main className="content">
        <h1>Tasks Completed</h1>
        <div className="task-container">
          <div className="task-box">
            {completedTasks?.map((task, index) => {
              return (
                <MyTask
                  key={index}
                  id={task.id}
                  title={task.title}
                  completedOn={task.completedOn}
                  removeCompletedTask={removeCompletedTask}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};
