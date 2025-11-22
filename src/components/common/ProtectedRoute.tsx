import { FC, JSX } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/token";

export { };

interface IProtectedRouteProps {
  children: JSX.Element  
}

const ProtectedRoute:FC<IProtectedRouteProps> = ({children}) => {
    const token = getToken();
      if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children
}

export default ProtectedRoute