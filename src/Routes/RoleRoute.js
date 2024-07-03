import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { currentUser, peran } = useAuth();



  return currentUser && allowedRoles.includes(peran) ? <Outlet /> : <Navigate to="/notFound" />;
};

export default RoleRoute;
