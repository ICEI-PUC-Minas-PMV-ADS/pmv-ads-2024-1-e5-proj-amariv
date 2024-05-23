import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SchedulingLoggedOut from "./pages/SchedulingLoggedOut";
import Home from "./pages/Home";
import History from "./pages/History";
import Scheduling from "./pages/Scheduling";
import Profile from "./pages/Profile";
import ProtectedRoute from "./contexts/AuthContext/ProtectedRoute";
import UnprotectedRoute from "./contexts/AuthContext/UnprotectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnprotectedRoute element={<Landing />} />,
  },
  {
    path: "/signin",
    element: <UnprotectedRoute element={< SignIn />} />,
  },
  {
    path: "/login",
    element: <UnprotectedRoute element={< Login />} />,
  },
  {
    path: "/agendamento",
    element: <UnprotectedRoute element={< SchedulingLoggedOut />} />
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />
  },
  {
    path: "/historico",
    element: <ProtectedRoute element={<History />} />
  },
  {
    path: "/novoagendamento",
    element: <ProtectedRoute element={<Scheduling />} />
  },
  {
    path: "/perfil",
    element: <ProtectedRoute element={<Profile />} />
  }
]);

export default router