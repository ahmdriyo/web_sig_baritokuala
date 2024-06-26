import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { currentUser, role } = useAuth();


  return currentUser && allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/notFound" />;
};

export default RoleRoute;
