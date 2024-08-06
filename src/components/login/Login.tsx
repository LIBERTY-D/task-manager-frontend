//@ts-nocheck
import { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { SlideTopToast } from "../slide-top-toast/SlideTopToast";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../context/auth/Auth";


type LoginDataType = {
  username: string;
  password: string;
};
const postUrl = import.meta.env.VITE_USER_URL + "/login";
export const Login = () => {
  const {login}  = useAuth()

  const [loginData, setLoginData] = useState<LoginDataType>({
    username: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [err, setErr] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: "",
  });
  const [success, setSuccess] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });


  const handleLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loginData.password == "" || loginData.username == "") {
      setErr({ isError: true, message: "fields can't be empty" });
    } else {
      try {
        const postData = await axios.post(postUrl, loginData);

        if (postData.status == 200) {
          setErr({ isError: false, message: "" });
          setSuccess({ show: true, message: "login sucess" });
          setTimeout(() => {
            setSuccess({ show: false, message: "" });
      
          }, 3000);
          login({user:postData.data,authenticated:true});
      
          setIsSubmitted(true);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status == 403) {
            setErr({
              isError: true,
              message: "please provide proper credentials",
            });
          } else {
            setErr({
              isError: true,
              message: err.response.data.errors,
            });
          }
        } else {
          setErr({
            isError: true,
            message: "an uknown error occured",
          });
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setLoginData((prevState) => {
      return { ...prevState, [element.name]: element.value };
    });
  };
  const emptyInputs = (): void => {
    setTimeout(() => {
      setLoginData({ username: "", password: "" });
    }, 3000);
  };

  useEffect(() => {
    emptyInputs();
  }, [isSubmitted]);

  const onClose = (_: React.MouseEvent<HTMLButtonElement>) => {
    setErr({ isError: false, message: "" });
    setSuccess({ show: false, message: "" });
  };

  return (
    <>
      {err.isError && (
        <SlideTopToast
          message={err.message}
          show={err.isError}
          onClose={onClose}
        />
      )}
      {success.show && (
        <SlideTopToast
          message={success.message}
          show={success.show}
          onClose={onClose}
        />
      )}
      <form className="login-form">
        <p className="title">Login </p>
        <p className="message">TaskManager making it simpler. </p>

        <label>
        <span>Email</span>
          <input
            value={loginData.username}
            placeholder=""
            type="username"
            name="username"
            className="input"
            onChange={handleChange}
          />
          
        </label>

        <label>
        <span>Password</span>
          <input
            value={loginData.password}
            placeholder=""
            type="password"
            name="password"
            className="input"
            onChange={handleChange}
          />
          
        </label>

        <button className="submit" onClick={handleLoginSubmit}>
          login
        </button>
        <p className="signup">
          Don't have an account ? <Link to="/register">signup</Link>{" "}
        </p>
      </form>
    </>
  );
};
