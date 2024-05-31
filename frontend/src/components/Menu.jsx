import { Link, useNavigate } from "react-router-dom";
import { hasToken } from "../utils";
import AuthService from "../auth/service";

import "./Menu.css";

const Menu = () => {
  const isAuthenticated = hasToken();
  let navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    return navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">GEVS Portal</div>

      <div>
        {!isAuthenticated ? (
          <>
            <Link className="menu-link" aria-current="page" to="/login">
              Login
            </Link>

            <Link className="menu-link" aria-current="page" to="/register">
              Register
            </Link>

            <Link
              className="menu-link"
              aria-current="page"
              to="/election/login"
            >
              Election Officer Login
            </Link>
          </>
        ) : (
          <div className="logout-link" onClick={logout}>
            Logout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
