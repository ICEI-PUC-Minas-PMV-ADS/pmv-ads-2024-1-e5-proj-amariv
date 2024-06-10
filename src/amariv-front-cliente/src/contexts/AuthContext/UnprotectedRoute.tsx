import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Navigate, Route } from "react-router-dom";

const UnprotectedRoute = ({ element, ...rest }: { element: React.ReactNode }) => {
  const { user } = useContext(AppContext);

  return !user ? (
    <>
      {element}
    </>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default UnprotectedRoute;