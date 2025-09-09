import { FiCheckCircle, FiHome } from "react-icons/fi";
import OrderSummary from "../../components/OrderSummary";

const SellConfirmationStage = ({
  selectedCard,
  amount,
  nairaAmount,
  selectedAccount,
  userAccounts,
  cardImagePreview,
  onReset,
  transaction
}) => {
  const orderDetails = {
    cardName: selectedCard?.cardName,
    amount: amount,
    totalPaid: nairaAmount,
    account:
      userAccounts.find((a) => a.number === selectedAccount)?.bank +
      " - " +
      userAccounts.find((a) => a.number === selectedAccount)?.number,
    reference: transaction.ref,
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
        <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        Gift Card Submitted!
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We've received your {selectedCard?.cardName} gift card worth{" "}
        <span className="font-bold">${amount}</span>.
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        You'll receive{" "}
        <span className="font-bold text-primary-dark dark:text-primary-light">
          ₦{nairaAmount.toLocaleString()}
        </span>{" "}
        after verification.
      </p>

      <OrderSummary
        order={orderDetails}
        paymentProofPreview={cardImagePreview}
        isSellOrder={true}
      />

      <div className="mt-6 flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <p className="text-yellow-700 dark:text-yellow-300">
          Your payment will be processed within 1-2 hours after verification.
        </p>
      </div>

      <button
        onClick={onReset}
        className="cursor-pointer mt-8 w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
      >
        <FiHome className="mr-2" /> Back to Dashboard
      </button>
    </div>
  );
};

export default SellConfirmationStage;
