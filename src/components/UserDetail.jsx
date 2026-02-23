import { useState } from "react";
import { FiTrash2, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { FaUserTimes, FaUserCheck } from 'react-icons/fa';
import StatusBadge from "./StatusBadge";
import formatDate from "../utils/formatDate";
import ActionButton from "./ActionButton";
import InputField from "./InputField";
import { toast } from "react-toastify";
import axios from "../lib/axios";

const UserDetail = ({
  user,
  onDeleteUser,
  isDeleting,
  onStatusChange,
  updating
}) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [funding, setFunding] = useState(false);
  const [deducting, setDeducting] = useState(false);

  console.log('USER', user);


  const handleFundWallet = async () => {
    if (!amount || Number(amount) < 100) {
      return toast.error("Minimum amount is ₦100");
    }

    try {
      setFunding(true);
      const res = await axios.patch(`/api/v1/users/${user.id}/wallets`, {
        amount: Number(amount),
        action: 'increment',
        note,
      });

      if (res.data.status === "success") {
        toast.success("Wallet funded successfully");
        user.vtuBalance+=parseInt(amount)
        setAmount("");
        setNote("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fund wallet");
    } finally {
      setFunding(false);
    }
  };

  const handleDeductWallet = async () => {
    if (!amount || Number(amount) < 100) {
      return toast.error("Minimum amount is ₦100");
    }

    try {
      setDeducting(true);
      const res = await axios.patch(`/api/v1/users/${user.id}/wallets`, {
        amount: Number(amount),
        action: 'decrement',
        note,
      });

      if (res.data.status === "success") {
        toast.success("Wallet deducted successfully");
        setAmount("");
         user.vtuBalance-=parseInt(amount)
        setNote("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to deduct wallet");
    } finally {
      setDeducting(false);
    }
  };
  return (
    <div className="space-y-6 p-6">
      {/* Profile Header with Photo */}
      <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-gray-500 dark:text-gray-300">
                {user.firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.firstName} {" "} {user.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {user.email}
          </p>
          <div className="flex items-center gap-2">
            <StatusBadge status={user.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.firstName} {" "} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>
              <div className="flex items-center gap-2">
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Account Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join Date
              </p>
              <p className="text-gray-800 dark:text-white">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Transactions
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.transactionCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Volume
              </p>
              <p className="text-gray-800 dark:text-white">
                ₦{user.transactionVolume.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                VTU Wallet Balance
              </p>
              <p className="text-gray-800 dark:text-white">
                ₦{user.vtuBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                VTU Volume
              </p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(user.vtuVolume).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                VTU Profit from user
              </p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(user.vtuProfit).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Wallet Management */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Manage Wallet
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (min ₦100)"

          />
        </div>

        <div className="mt-4 flex gap-3">
          <ActionButton
            onClick={handleFundWallet}
            loading={funding}
            disabled={funding || deducting}
            icon={FiPlusCircle}
            variant="success"
          >
            Fund Wallet
          </ActionButton>

          <ActionButton
            onClick={handleDeductWallet}
            loading={deducting}
            disabled={funding || deducting}
            icon={FiMinusCircle}
            variant="danger"
          >
            Deduct Wallet
          </ActionButton>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-3">
          <ActionButton
            onClick={onDeleteUser}
            loading={isDeleting}
            disabled={isDeleting || updating}
            icon={FiTrash2}
            variant="danger"
          >
            Delete User
          </ActionButton>

          {user.status === 'active' ? (
            <ActionButton
              onClick={() => onStatusChange('deactivate', user)}
              loading={updating}
              disabled={updating || isDeleting}
              icon={FaUserTimes}
              variant="warning"
            >
              Deactivate User
            </ActionButton>
          ) : (
            <ActionButton
              onClick={() => onStatusChange('approve', user)}
              loading={updating}
              disabled={updating || isDeleting}
              icon={FaUserCheck}
              variant="success"
            >
              Activate User
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;