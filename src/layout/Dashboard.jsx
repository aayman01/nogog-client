import UserDashboard from "../Pages/UserDashboard";
import AgentDashboard from "../Pages/AgentDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { userInfo, userLoading } = useUser();
  const [showBalance, setShowBalance] = useState(false);

  console.log(userInfo);

  if (loading | userLoading) return <p className="flex items-start justify-center">Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between px-4">
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
        {/* <p className="text-lg font-bold">
          Your Balance: {userInfo?.balance} Taka
        </p> */}
      </div>
      {user?.role === "user" && <UserDashboard />}
      {user?.role === "agent" && <AgentDashboard />}
      {user?.role === "admin" && <AdminDashboard />}
    </div>
  );
};
export default Dashboard;