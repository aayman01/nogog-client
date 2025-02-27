import { createBrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Main from "../layout/Main";
import Dashboard from "../layout/Dashboard";
import { TransactionsPage } from "../Pages/TransicationsPage";
import SendMoney from "../Pages/SendMoney";

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
        element: <Dashboard />,
      },
      {
        path:"send-money",
        element: <SendMoney/>
      },
      {
        path: "/admin/agents/:id",
        element: <TransactionsPage />,
      },
    ],
  },
]);

export default router;
