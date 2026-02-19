import "./navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <span className="logo">lamabooking</span>
        </Link>

        {/* 🔥 NEW SECTION - MAIN NAV TABS */}
        <div className="navTabs">
          <Link to="/" className={location.pathname === "/" ? "activeTab" : ""}>
            Stays
          </Link>

          <Link to="/flights" className={location.pathname === "/flights" ? "activeTab" : ""}>
            Flights
          </Link>

          <Link to="/cars" className={location.pathname === "/cars" ? "activeTab" : ""}>
            Car rentals
          </Link>

          <Link to="/attractions" className={location.pathname === "/attractions" ? "activeTab" : ""}>
            Attractions
          </Link>

          <Link to="/taxis" className={location.pathname === "/taxis" ? "activeTab" : ""}>
            Airport taxis
          </Link>
        </div>

        {user ? (
          <div className="navItems">
            <span className="username">Hi, {user.username}</span>

            <Link to="/my-bookings">
              <button className="navButton">My Bookings</button>
            </Link>

            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>

            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;