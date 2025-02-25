import { createBrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;