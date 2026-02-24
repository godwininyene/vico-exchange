import { useState } from "react";
import {
  FiWifi,
  FiPhoneCall,
  FiTv,
  FiZap,
  FiBookOpen,
  FiCheckCircle,
  FiXCircle,
  FiCopy,
  FiX,
  FiUser,
  FiEye,
  FiChevronRight,
} from "react-icons/fi";
import formatDate from "../utils/formatDate";
import { toast } from "react-toastify";

const VtuTransaction = ({
  transaction,
  variant = "default",
  context = "user", // 'admin' or 'user'
  openTransactionDetails,
}) => {
  const [showToken, setShowToken] = useState(false);

  const isCompact = variant === "dashboard";
  const isAdmin = context === "admin";

  const getIcon = () => {
    const name = transaction.serviceName?.toLowerCase() || "";

    if (name.includes("airtime")) return <FiPhoneCall size={18} />;
    if (name.includes("data")) return <FiWifi size={18} />;
    if (name.includes("dstv") || name.includes("gotv") || name.includes("startimes"))
      return <FiTv size={18} />;
    if (name.includes("electric")) return <FiZap size={18} />;
    if (name.includes("waec") || name.includes("neco") || name.includes("education"))
      return <FiBookOpen size={18} />;

    return <FiWifi size={18} />;
  };

  const getIconBg = () => {
    return transaction.status === "success"
      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
  };

  const getBeneficiaryLabel = () => {
    const name = transaction.serviceName?.toLowerCase() || "";
    if (name.includes("electric") || name.includes("disco")) {
      return `${transaction.beneficiary} (Meter No)`;
    }
    return `${transaction.beneficiary} (Phone No)`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <div className="text-green-600 dark:text-green-400 flex items-center gap-1 text-sm font-medium mt-1">
            <FiCheckCircle size={16} /> Success
          </div>
        );
      case "failed":
        return (
          <div className="text-red-600 dark:text-red-400 flex items-center gap-1 text-sm font-medium mt-1">
            <FiXCircle size={16} /> Failed
          </div>
        );
      default:
        return (
          <div className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1 text-sm font-medium mt-1">
            Pending
          </div>
        );
    }
  };

  const handleCopyToken = async () => {
    await navigator.clipboard.writeText(transaction.token);
    toast.success("Token copied to clipboard");
  };

  const handleOpenDetails = () => {
    if (openTransactionDetails) {
      openTransactionDetails(transaction);
    }
  };

  return (
    <>
      <div
        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors rounded-lg cursor-pointer"
        onClick={handleOpenDetails}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-start flex-1 min-w-0">
            <div
              className={`rounded-full p-3 flex-shrink-0 flex items-center justify-center ${getIconBg()}`}
              style={{ minWidth: 48, minHeight: 48 }}
            >
              {getIcon()}
            </div>

            <div className="flex-1 min-w-0 ml-3">
              <h3
                className={`font-medium text-gray-800 dark:text-white ${
                  isCompact ? "truncate" : "whitespace-normal break-words"
                }`}
              >
                {transaction.serviceName}
              </h3>

              {/* Admin sees user */}
              {isAdmin && transaction.user && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <FiUser size={12} />
                  {transaction.user.firstName} {transaction.user.lastName} ({transaction.user.email})
                </p>
              )}

              {transaction.planLabel && (
                <p
                  className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${
                    isCompact ? "truncate" : "whitespace-normal break-words"
                  }`}
                >
                  {transaction.planLabel}
                </p>
              )}

              <p
                className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${
                  isCompact ? "truncate" : "whitespace-normal break-all"
                }`}
              >
                Beneficiary: {getBeneficiaryLabel()}
              </p>

              {transaction.providerRef && variant !== "dashboard" && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                  Trans. ID: {transaction.providerRef}
                </p>
              )}

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatDate(transaction.createdAt)}
              </p>

              {/* View Token */}
              {transaction.type === "electricity" &&
                transaction.status === "success" &&
                transaction.token && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowToken(true);
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-primary-dark hover:underline"
                  >
                    <FiZap size={14} /> View Token
                  </button>
                )}
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0 gap-2">
            <p
              className={`font-semibold whitespace-nowrap ${
                transaction.status === "success"
                  ? "text-green-600 dark:text-green-400"
                  : transaction.status === "failed"
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              ₦{Number(transaction.type ==='data' ? transaction.sellingPrice : transaction.faceValue).toLocaleString()}
            </p>

            {getStatusBadge(transaction.status)}

            {/* Admin eye icon (desktop) */}
            {isAdmin && variant !== "dashboard" && (
              <button
                className="hidden sm:flex p-2 text-gray-400 hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                title="View details"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetails();
                }}
              >
                <FiEye size={18} />
              </button>
            )}

            {/* Mobile chevron */}
            <div className="sm:hidden text-gray-400">
              <FiChevronRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Token Modal */}
      {showToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                Electricity Token
              </h3>
              <button onClick={() => setShowToken(false)} className="h-10 w-10 rounded-full bg-primary-dark dark:bg-gray-400 flex items-center justify-center cursor-pointer">
                <FiX />
              </button>
            </div>

            <div className="bg-gray-100 dark:bg-gray-400 rounded-lg p-3 font-mono text-sm break-all">
              {transaction.token}
            </div>

            <button
              onClick={handleCopyToken}
              className="mt-4 w-full bg-primary-dark hover:bg-primary-light text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FiCopy size={16} /> Copy Token
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VtuTransaction;