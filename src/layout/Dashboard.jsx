import UserDashboard from "../Pages/UserDashboard";
import AgentDashboard from "../Pages/AgentDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const { userInfo, userLoading } = useUser();
  const [showBalance, setShowBalance] = useState(false);

  console.log(userInfo);

  if (loading | userLoading) return <div className="flex items-start justify-center">Loading...</div>;

  return (
    <div className="">
      <div className="flex items-center justify-between bg-secondary text-white rounded-md py-7 px-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {userInfo?.name}</h1>
          <h3 className="text-lg font-semibold">
            Account Type:{" "}
            <span className="uppercase">{userInfo?.accountType}</span>
          </h3>
        </div>
        <p
          className="text-lg font-bold cursor-pointer"
          onClick={() => setShowBalance(true)}
        >
          Your Balance: {showBalance ? `${userInfo?.balance} Taka` : "********"}
        </p>
      </div>
      <div className="flex items-center justify-end p-5">
        <button
          onClick={logout}
          className="font-semibold rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-secondary"
        >
          Log out
        </button>
      </div>
      {user?.role === "user" && <UserDashboard />}
      {user?.role === "agent" && <AgentDashboard />}
      {user?.role === "admin" && <AdminDashboard />}
    </div>
  );
};
export default Dashboard;