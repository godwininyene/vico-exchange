import { FiCheckCircle } from "react-icons/fi";
import OrderSummary from "../../components/OrderSummary";

const ConfirmationStage = ({
  selectedCard,
  amount,
  nairaAmount,
  filePreview,
  file,
  onReset,
  transaction
}) => {
  const orderDetails = {
    cardName: selectedCard?.cardName,
    amount: amount,
    totalPaid: nairaAmount,
    reference: transaction.ref
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
        <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        Payment Received!
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We've received your payment of{" "}
        <span className="font-bold">₦{nairaAmount.toLocaleString()}</span> and we're processing
        your order.
      </p>

      <OrderSummary
        order={orderDetails}
        paymentProofPreview={filePreview}
        file={file}
      />

      <button
        onClick={onReset}
        className="cursor-pointer mt-8 w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ConfirmationStage;