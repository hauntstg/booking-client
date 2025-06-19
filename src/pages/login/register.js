import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import classes from "./register.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
export default function Register() {
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
    const res = await fetch(API_URL + "/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    });
    if (res.status === 409) {
      const err = await res.json();
      setError(err.message);
      return null;
    }
    if (!res.ok) {
    }
    navigate("/login");
  }
  return (
    <>
      <Navbar />
      <div className={classes["wrap-register"]}>
        <h1>Register</h1>
        <input type="text" name="username" ref={usernameRef} />
        <input type="password" name="password" ref={passwordRef} />
        {error && <p>{error}</p>}
        <button type="button" onClick={handleLoginClick}>
          Create Account
        </button>
      </div>
    </>
  );
}
