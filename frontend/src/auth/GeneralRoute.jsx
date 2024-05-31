import { Navigate, Outlet } from "react-router-dom";
import { hasToken } from "../utils";
import PropTypes from "prop-types";

const GeneralRoute = ({ redirect = "/", component: Component }) => {
  if (hasToken()) {
    return <Navigate to={redirect} replace />;
  }

  return Component ? <Component /> : <Outlet />;
};

GeneralRoute.propTypes = {
  redirect: PropTypes.string,
  component: PropTypes.elementType,
};

export default GeneralRoute;
