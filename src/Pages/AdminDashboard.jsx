import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch all agents
  const { data: agents, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/agents");
      return data;
    },
  });

  // Approve agent mutation
  const approveAgentMutation = useMutation({
    mutationFn: async (agentId) =>
      axiosPublic.patch(`/agents/${agentId}/approve`),
    onSuccess: () => queryClient.invalidateQueries(["agents"]),
  });

  // Block agent mutation
  const blockAgentMutation = useMutation({
    mutationFn: async (agentId) =>
      axiosPublic.patch(`/agents/${agentId}/block`),
    onSuccess: () => queryClient.invalidateQueries(["agents"]),
  });

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold flex items-center justify-center">Loading agents...</p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Agents</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by phone number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {/* Agents Table */}
      <table className="w-full border-collapse border shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Nid</th>
            <th className="border p-2">Status</th> {/* New column */}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents
            ?.filter(
              (agent) =>
                agent?.mobile?.toLowerCase().includes(search.toLowerCase()) ||
                agent?.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((agent) => (
              <tr key={agent._id} className="border text-center">
                <td className="p-2">{agent.name}</td>
                <td className="p-2">{agent.mobile}</td>
                <td className="p-2">{agent.nid}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agent.isBlocked 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {agent.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-2">
                  {/* View Transactions Button */}
                  {agent.accountType === "agent" && (
                    <button
                      onClick={() => navigate(`/admin/agents/${agent._id}`)}
                      className="bg-blue-500 text-white p-1 px-2 rounded mr-2"
                    >
                      View Transactions
                    </button>
                  )}

                  <button
                    onClick={() => blockAgentMutation.mutate(agent._id)}
                    className={`${
                      agent.isBlocked 
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    } text-white p-1 px-2 rounded disabled:opacity-50`}
                    disabled={blockAgentMutation.isLoading}
                  >
                    {blockAgentMutation.isLoading 
                      ? "Processing..." 
                      : agent.isBlocked 
                        ? "Unblock" 
                        : "Block"}
                  </button>

                  {/* Approve Button */}
                  {agent.accountType === "pending" && (
                    <button
                      onClick={() => approveAgentMutation.mutate(agent._id)}
                      className="bg-green-500 text-white p-1 px-2 rounded ml-2 disabled:opacity-50"
                      disabled={approveAgentMutation.isLoading}
                    >
                      {approveAgentMutation.isLoading
                        ? "Approving..."
                        : "Approve"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
