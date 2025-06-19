import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  // console.log();
  let user;
  if (isLoggedIn) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <span
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking Website
        </span>
        {!isLoggedIn && (
          <div className="navItems">
            <button
              className="navButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
            <button
              className="navButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className="navItems">
            <span>{user.username}</span>
            <button
              className="navButton"
              onClick={() => {
                navigate("/transactions");
              }}
            >
              Transactions
            </button>
            <button
              className="navButton"
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
