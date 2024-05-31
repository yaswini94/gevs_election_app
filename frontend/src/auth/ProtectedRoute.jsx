import { Navigate, Outlet } from "react-router-dom";
import { hasToken } from "../utils";
import PropTypes from "prop-types";

const ProtectedRoute = ({ redirect = "/login", component: Component }) => {
  if (!hasToken()) {
    return <Navigate to={redirect} replace />;
  }

  return Component ? <Component /> : <Outlet />;
};

ProtectedRoute.propTypes = {
  redirect: PropTypes.string,
  component: PropTypes.elementType,
};

export default ProtectedRoute;
