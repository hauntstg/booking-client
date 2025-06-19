import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import classes from "./login.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
export default function Login() {
  const [error, setError] = useState();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispath = useDispatch();
  const { pathname } = location;
  let namePage;
  if (pathname === "/login") {
    namePage = "login";
  } else {
    namePage = "register";
  }
  // useEffect(() => {
  //   console.log(isLoggedIn);
  // }, [isLoggedIn]);
  async function handleLoginClick() {
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;
    if (
      usernameInput.trim().length === 0 ||
      passwordInput.trim().length === 0
    ) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return null;
    }
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    });
    if (res.status === 404) {
      const err = await res.json();
      setError(err.message);
      return null;
    }
    const resData = await res.json();
    // console.log(resData);
    dispath({
      type: "LOGIN",
      payload: {
        userId: resData._id,
        username: resData.username,
        password: resData.password,
        email: resData.email,
        isAdmin: resData.isAdmin,
        phoneNumber: resData.phoneNumber,
        fullName: resData.fullName,
      },
    });
    navigate("/");
  }
  return (
    <>
      <Navbar />
      <div className={classes["wrap-login"]}>
        <h1>Login</h1>
        <input type="text" name="username" ref={usernameRef} />
        <input type="password" name="password" ref={passwordRef} />
        {error && <p>{error}</p>}
        <button type="button" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </>
  );
}
