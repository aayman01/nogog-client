import { createBrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Main from "../layout/Main";
import Dashboard from "../layout/Dashboard";
import { TransactionsPage } from "../Pages/TransicationsPage";
import SendMoney from "../Pages/SendMoney";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "send-money",
        element: (
          <PrivateRoute>
            <SendMoney />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/agents/:id",
        element: (
          <PrivateRoute>
            <TransactionsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
