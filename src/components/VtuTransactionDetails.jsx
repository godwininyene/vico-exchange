import { FiCopy, FiUser, FiZap } from "react-icons/fi";
import formatDate from "../utils/formatDate";
import StatusBadge from "./StatusBadge";
import { toast } from "react-toastify";

const VtuTransactionDetails = ({ transaction }) => {
  const copyToken = async () => {
    await navigator.clipboard.writeText(transaction.token);
    toast.success("Token copied to clipboard");
  };

   const getBeneficiaryLabel = () => {
    const name = transaction.serviceName?.toLowerCase() || "";
    if (name.includes("electric") || name.includes("disco")) {
      return `${transaction.beneficiary} (Meter No)`;
    }
    return `${transaction.beneficiary} (Phone No)`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Transaction Information
          </h3>

          <div className="space-y-3">
            {transaction.user && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                <p className="text-gray-800 dark:text-white flex items-center gap-1">
                  <FiUser size={14} />
                  {transaction.user.firstName} {transaction.user.lastName} ({transaction.user.email})
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
              <p className="text-gray-800 dark:text-white">{transaction.serviceName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
              <p className="text-gray-800 dark:text-white capitalize">{transaction.type}</p>
            </div>

            {transaction.planLabel && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
                <p className="text-gray-800 dark:text-white">{transaction.planLabel}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Beneficiary</p>
              <p className="text-gray-800 dark:text-white break-all">
               {getBeneficiaryLabel()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount Paid</p>
              <p className="font-medium text-gray-800 dark:text-white">
                ₦{Number(transaction.amountPaid).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Face Value</p>
              <p className="font-medium text-gray-800 dark:text-white">
                ₦{Number(transaction.faceValue).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>
              <p className="font-medium text-green-600 dark:text-green-400">
                ₦{Number(transaction.profit || 0).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <StatusBadge status={transaction.status} />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Provider Status</p>
              <p className="text-gray-800 dark:text-white">{transaction.providerStatus}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Provider Ref</p>
              <p className="text-gray-800 dark:text-white break-all">
                {transaction.providerRef || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Request ID</p>
              <p className="text-gray-800 dark:text-white break-all">
                {transaction.requestId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="text-gray-800 dark:text-white">
                {formatDate(transaction.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Financials
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cost Price</p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(transaction.costPrice).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Selling Price</p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(transaction.sellingPrice).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Initial Balance</p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(transaction.initialBalance).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Final Balance</p>
              <p className="text-gray-800 dark:text-white">
                ₦{Number(transaction.finalBalance).toLocaleString()}
              </p>
            </div>

            {transaction.token && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <FiZap size={14} /> Token
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono break-all text-sm">
                  {transaction.token}
                </div>

                <button
                  onClick={copyToken}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary-dark hover:underline"
                >
                  <FiCopy size={14} /> Copy Token
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VtuTransactionDetails;