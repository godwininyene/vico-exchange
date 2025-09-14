import { FiCreditCard, FiDollarSign, FiEye, FiUser, FiChevronRight } from "react-icons/fi";
import { BsCurrencyExchange } from "react-icons/bs";
import formatDate from "../utils/formatDate";
import TransactionTypeBadge from "./TransactionTypeBadge";
import StatusBadge from "./StatusBadge";

const Transaction = ({
  transaction,
  variant = "default",
  context = "admin", // 'admin' or 'user'
  openTransactionDetails,
}) => {
  // Variant-specific configurations
  const variants = {
    default: {
      container:
        "p-4 md:p-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer rounded-lg",
      showDetailsButton: context === "admin",
      showUser: context === "admin",
      showFullDescription: true,
      showStatusBadge: true,
      showTypeBadge: true,
      iconSize: 20,
      iconPadding: "p-3",
      layout: "flex-col", // Always column layout for better mobile handling
    },
    compact: {
      container:
        "p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer rounded-lg",
      showDetailsButton: false,
      showUser: context === "admin",
      showFullDescription: false,
      showStatusBadge: true,
      showTypeBadge: true,
      iconSize: 18,
      iconPadding: "p-2",
      layout: "flex-row", // Always row layout for compact
    },
    dashboard: {
      container:
        "p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 mb-2 w-full", // Added full width and border
      showDetailsButton: false,
      showUser: context === "admin",
      showFullDescription: true,
      showStatusBadge: false,
      showTypeBadge: false,
      iconSize: 16,
      iconPadding: "p-2",
      layout: "flex", // Changed to simple flex
    },
  };

  const config = variants[variant];
  const isAdmin = context === "admin";

  const getTransactionIcon = () => {
    if (transaction.assetType === "giftcard") {
      return <FiCreditCard size={config.iconSize} />;
    } else if (transaction.assetType === "crypto") {
      return <BsCurrencyExchange size={config.iconSize} />;
    } else {
      return <FiDollarSign size={config.iconSize} />;
    }
  };

  const getTransactionIconContainerClass = () => {
    return transaction.flowType === "deposit"
      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
  };

  const getDisplayDescription = () => {
    if (config.showFullDescription) {
      return transaction.description;
    }

    // For user context, we might want to simplify the description
    if (context === "user") {
      if (transaction.action) return transaction.action;

      // Extract just the main action from the description
      const actionMap = {
        giftcard: "Gift Card",
        crypto: "Crypto",
        deposit: "Deposit",
        withdrawal: "Withdrawal",
      };

      return (
        actionMap[transaction.assetType] || transaction.type || "Transaction"
      );
    }

    return transaction.action || transaction.description;
  };

  const getDisplayUser = () => {
    if (!config.showUser || !transaction.user) return null;
    // Return the user's full name if available
    if (transaction.user.firstName && transaction.user.lastName) {
      return `${transaction.user.firstName} ${transaction.user.lastName}`;
    }
    // Fallback to email if names aren't available
    return transaction.user.email || "Unknown User";
  };

  const handleClick = () => {
    if (openTransactionDetails) {
      openTransactionDetails(transaction);
    }
  };

  const formatTransactionAmount = (transaction) => {
    if (!transaction) return "";

    const sign = transaction.flowType === "deposit" ? "+" : "-";

    if (transaction.assetType === "coin" && transaction.coinDetails) {
      // Show coin amount + currency (or fallback to description first word)
      const coinAmount = transaction.coinDetails.coinAmount;
      const currency =
        transaction.currency || transaction.description.split(" ")[1] || ""; // e.g. "Bitcoin"

      return `${sign}${coinAmount} ${currency}`;
    }

    // Default (fiat/giftcard) case
    if (typeof transaction.amount === "number") {
      return `${sign}¥${transaction.amount.toLocaleString()}`;
    }

    return `${sign}¥${transaction.amount}`;
  };

  // For dashboard variant, use a simpler layout
  if (variant === "dashboard") {
    return (
      <div className={config.container} onClick={handleClick}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-1 min-w-0">
            <div className={`rounded-full flex-shrink-0 ${config.iconPadding} ${getTransactionIconContainerClass()}`}>
              {getTransactionIcon()}
            </div>
            
            <div className="ml-3 min-w-0 flex-1">
              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                {getDisplayDescription()}
              </h3>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(transaction.createdAt)}
                </p>
                {isAdmin && transaction.user && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex items-center">
                    <FiUser size={12} className="mr-1" />
                    {getDisplayUser()}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center flex-shrink-0 ml-2">
            <div className="text-right">
              <div className={`font-medium whitespace-nowrap ${
                transaction.flowType === "deposit" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                {formatTransactionAmount(transaction)}
              </div>
            </div>
            <FiChevronRight size={18} className="text-gray-400 dark:text-gray-500 ml-2" />
          </div>
        </div>
      </div>
    );
  }

  // Default implementation for other variants
  return (
    <div className={config.container} onClick={handleClick}>
      <div className={`flex justify-between ${config.layout} gap-3`}>
        <div className="flex items-start flex-1 min-w-0">
          <div className={`rounded-full flex-shrink-0 ${config.iconPadding} ${getTransactionIconContainerClass()}`}>
            {getTransactionIcon()}
          </div>

          <div className="ml-3 min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium text-gray-800 dark:text-white break-words pr-2">
                {getDisplayDescription()}
              </h3>
              <div className="sm:hidden flex-shrink-0 mt-1">
                <div className={`whitespace-nowrap font-medium ${
                  transaction.flowType === "deposit" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {formatTransactionAmount(transaction)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatDate(transaction.createdAt)}
              </p>
              {config.showTypeBadge && transaction.transactionType && (
                <TransactionTypeBadge type={transaction.transactionType} />
              )}
              {config.showStatusBadge && transaction.status && (
                <StatusBadge status={transaction.status} />
              )}
            </div>
            
            {/* Show user info on mobile for admin context */}
            {isAdmin && config.showUser && transaction.user && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center md:hidden">
                <FiUser size={12} className="mr-1" />
                <span className="truncate">{getDisplayUser()}</span>
              </p>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <div className="text-right min-w-0">
            {transaction.amount && (
              <>
                <div className={`font-medium whitespace-nowrap ${
                  transaction.flowType === "deposit" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {formatTransactionAmount(transaction)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap truncate">
                  {transaction.flowType === 'deposit' ? '+' : '-'}${transaction.usdAmount}
                </div>
              </>
            )}
            {/* Show user info on desktop for admin context */}
            {isAdmin && getDisplayUser() && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end">
                <FiUser size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate max-w-[120px]">{getDisplayUser()}</span>
              </div>
            )}
          </div>

          {config.showDetailsButton && (
            <button
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-dark dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex-shrink-0"
              title="View details"
              onClick={(e) => {
                e.stopPropagation();
                openTransactionDetails && openTransactionDetails(transaction);
              }}
            >
              <FiEye size={18} />
            </button>
          )}
        </div>
       {/* Test */}
        
        {/* Show chevron on mobile instead of eye icon */}
        <div className="sm:hidden text-gray-400 dark:text-gray-500 self-center">
          <FiChevronRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;