import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import {  Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";

const SendMoney = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const {userInfo} = useUser();


  const senderPhone = userInfo?.mobile;

  const verifyPhoneMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosPublic.get(`/verify-phone/${phone}`);
      return data;
    },
  });

  const sendMoneyMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosPublic.post("/send-money", {
        phone,
        amount: Number(amount),
        senderPhone,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user-balance"]);
      toast.success("Money sent successfully!");
      setPhone("");
      setAmount("");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Transaction failed";
      toast.error(message);
      setError(message);
    }
  });

  const handleSendMoney = async () => {
    setError("");
    
    // Basic validations
    if (!phone || !amount) {
      setError("Please enter both phone number and amount");
      return;
    }

    // Phone number validation (assuming BD phone format)
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    // Amount validations
    if (Number(amount) < 50) {
      setError("Minimum amount is 50 Taka");
      return;
    }

    if (Number(amount) > userInfo?.balance) {
      setError("Insufficient balance");
      return;
    }

    if (phone === senderPhone) {
      setError("You cannot send money to your own number");
      return;
    }

    try {
      await verifyPhoneMutation.mutateAsync();
      await sendMoneyMutation.mutateAsync();
    } catch (error) {
      const message = error.response?.data?.message || "Transaction failed";
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Send Money
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Phone Number
          </label>
          <input
            type="text"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (Taka)
          </label>
          <input
            type="number"
            placeholder="Enter amount (min. 50 Taka)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          onClick={handleSendMoney}
          disabled={!phone || !amount || sendMoneyMutation.isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {sendMoneyMutation.isLoading ? (
            <span>Processing...</span>
          ) : (
            <span>Send Money</span>
          )}
        </button>

        {userInfo?.balance && (
          <p className="text-sm text-gray-600 text-center">
            Available Balance: {userInfo.balance.toFixed(2)} Taka
          </p>
        )}
        <p className="flex items-center justify-center">
          <Link to="/dashboard">
            <BiHome size={30} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SendMoney;
