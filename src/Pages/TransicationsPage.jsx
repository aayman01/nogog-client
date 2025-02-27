import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const TransactionsPage = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/agents/${id}`);
      return data.transactions;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-lg font-semibold flex items-center justify-center">
        Loading transactions...
      </p>
    );
  }

  // Add check for empty transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Agent Transactions</h2>
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow">
          <p className="text-lg text-gray-600">No transactions found for this agent.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Agent Transactions</h2>
      <table className="w-full border-collapse border shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((tx) => (
            <tr key={tx._id} className="border text-center">
              <td className="p-2">${tx.amount.toFixed(2)}</td>
              <td className="p-2">{tx.type}</td>
              <td className="p-2">
                {new Date(tx.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
