import { FiUser, FiClock } from "react-icons/fi";
import formatDate from "../utils/formatDate";

const PendingActionCard = ({ transaction, onReview }) => {
  const getActionIcon = () => {
    switch (transaction.assetType.toLowerCase()) {
      case "giftcard":
        return "🎁";
      case "coin":
        return transaction.transactionType === "buy" ? "💳" : "💰";
      default:
        return "📝";
    }
  };

  const getActionColor = () => {
    switch (transaction.assetType.toLowerCase()) {
      case "giftcard":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "coin":
        return transaction.transactionType === "buy" 
          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Format amount with currency symbol
  const formatAmount = () => {
    return `$${transaction.usdAmount.toLocaleString()}`;
  };

  // Get user's full name
  const getUserName = () => {
    return `${transaction.user.firstName} ${transaction.user.lastName}`;
  };

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={`p-2 shrink-0 rounded-full ${getActionColor()} mr-3`}>
            <span className="text-sm">{getActionIcon()}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">
              {transaction.description}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <FiUser size={12} className="mr-1" />
              {getUserName()}
            </p>
          </div>
        </div>
        <div className="text-right">
          {transaction.usdAmount && (
            <p className="font-medium text-gray-800 dark:text-white">
              {formatAmount()}
            </p>
          )}
          <div className="flex items-center justify-end mt-1">
            <FiClock size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(transaction.createdAt)} {/* Use the imported utility */}
            </span>
          </div>
          {/* <button
            onClick={() => onReview(transaction)}
            className="text-xs bg-primary-dark hover:bg-primary-light text-white px-3 py-1 rounded-full mt-2"
          >
            Review
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PendingActionCard;