import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SchedulingLoggedOut from "./pages/SchedulingLoggedOut";
import Home from "./pages/Home";
import History from "./pages/History";
import Scheduling from "./pages/Scheduling";

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
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/historico",
    element: <History />
  },
  {
    path: "/novoagendamento",
    element: <Scheduling />
  }
]);

export default router