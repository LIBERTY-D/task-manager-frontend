//@ts-nocheck
import React, { useEffect, useState } from "react";
import "./register.css";
import { SlideTopToast } from "../slide-top-toast/SlideTopToast";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

type RegisterDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

const USER_URL = import.meta.env.VITE_USER_URL + "/register";

export const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
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
  const navigate = useNavigate();

  const handleRegisterSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (
      (registerData.username == " " || registerData.firstName == "",
      registerData.lastName == "" || registerData.email == "",
      registerData.password == "" || registerData.confirmPassword == "")
    ) {
      return setErr(() => {
        return {
          isError: true,
          message: "all fields are required.",
        };
      });
    } else if (registerData.confirmPassword !== registerData.password) {
      return setErr(() => {
        return {
          isError: true,
          message: "passwords do not match",
        };
      });
    } else {
      try {
        const postData = await axios.post(USER_URL, {
          ...registerData,
          profile: {
            desc: "",
          },
        });
        if (postData.status == 200) {
          setSuccess({
            show: true,
            message: "account created",
          });
        }
        setIsSubmitted(true);

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } catch (err) {
        if (err instanceof AxiosError) {
          setErr({
            isError: true,
            message:
              err.response?.data.errors["email-password"] ||
              err.response?.data.errors["email"],
          });
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setRegisterData((prevState) => {
      return { ...prevState, [element.name]: element.value };
    });
  };
  const emptyInputs = (): void => {
    setTimeout(() => {
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      });
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
      <form className="register-form">
        <p className="title">Register </p>
        <p className="message">Signup now on Task Manager. </p>
        <div className="flex">
          <label>
          <span>username</span>
            <input
              value={registerData.username}
              placeholder=""
              type="text"
              name="username"
              className="input"
              onChange={handleChange}
            />
          
          </label>
          <label>
          <span>Firstname</span>
            <input
              value={registerData.firstName}
              placeholder=""
              type="text"
              name="firstName"
              className="input"
              onChange={handleChange}
            />
          
          </label>

          <label>
          <span>Lastname</span>
            <input
              value={registerData.lastName}
              placeholder=""
              type="text"
              name="lastName"
              className="input"
              onChange={handleChange}
            />
 
          </label>
        </div>

        <label>
        <span>Email</span>
          <input
            value={registerData.email}
            placeholder=""
            type="email"
            name="email"
            className="input"
            onChange={handleChange}
          />
        
        </label>

        <label>
        <span>Password</span>
          <input
            value={registerData.password}
            placeholder=""
            type="password"
            name="password"
            className="input"
            onChange={handleChange}
          />
      
        </label>
        <label>
        <span>Confirm password</span>
          <input
            value={registerData.confirmPassword}
            placeholder=""
            type="password"
            name="confirmPassword"
            className="input"
            onChange={handleChange}
          />
       
        </label>
        <button className="submit" onClick={handleRegisterSubmit}>
          signup
        </button>
        <p className="signin">
          Already have an account ? <Link to="/login">Signin</Link>{" "}
        </p>
      </form>
    </>
  );
};
