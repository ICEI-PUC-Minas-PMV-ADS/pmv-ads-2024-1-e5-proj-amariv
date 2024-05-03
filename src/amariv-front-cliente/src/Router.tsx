import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SchedulingLoggedOut from "./pages/SchedulingLoggedOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Landing />),
  },
  {
    path: "/signin",
    element: (< SignIn />),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/agendamento",
    element: <SchedulingLoggedOut />
  }
]);

export default router