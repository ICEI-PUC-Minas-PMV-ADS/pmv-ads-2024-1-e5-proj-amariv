import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Route } from "react-router-dom";

const UnprotectedRoute = ({ element, ...rest }: { element: React.ReactNode }) => {
  const { user } = useContext(AuthContext);

  return !user ? (
    <>
      {element}
    </>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default UnprotectedRoute;