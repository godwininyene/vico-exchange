import { FiClock } from "react-icons/fi";

const OrderSummary = ({
  order,
  paymentProofPreview,
  file,
  isCrypto = false,
  isSellOrder = false,
}) => (
  <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
    <h3 className="font-bold text-gray-800 dark:text-white mb-4">
      {isSellOrder ? "Transaction Details" : "Order Details"}
    </h3>
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">
          {isCrypto ? "Cryptocurrency:" : "Gift Card:"}
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {order.cryptoName || order.cardName}
        </span>
      </div>
      {isCrypto && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Amount Sent:</span>
          <span className="font-medium text-gray-800 dark:text-white">
            ${order.amount} {order.symbol}
          </span>
        </div>
      )}
      {!isCrypto && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Amount:</span>
          <span className="font-medium text-gray-800 dark:text-white">
            ${order.amount}
          </span>
        </div>
      )}
      {isSellOrder && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            You'll Receive:
          </span>
          <span className="font-medium text-gray-800 dark:text-white">
            ₦{order.totalPaid.toLocaleString()}
          </span>
        </div>
      )}
      {!isSellOrder && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Total Paid:</span>
          <span className="font-medium text-gray-800 dark:text-white">
            ₦{order.totalPaid.toLocaleString()}
          </span>
        </div>
      )}
      {isCrypto && !isSellOrder && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Receiving Wallet:
          </span>
          <span className="font-medium text-gray-800 dark:text-white break-all text-sm">
            {order.walletAddress}
          </span>
        </div>
      )}
      {isSellOrder && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Payment Account:
          </span>
          <span className="font-medium text-gray-800 dark:text-white">
            {order.account}
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">
          Transaction Reference:
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {order.reference}
        </span>
      </div>
    </div>

    {!isCrypto && !isSellOrder && (
      <div className="mt-6 flex items-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <FiClock className="text-yellow-600 dark:text-yellow-400 mr-2" />
        <p className="text-yellow-700 dark:text-yellow-300">
          Your gift card will be delivered within 1-2 hours after verification.
        </p>
      </div>
    )}

    {paymentProofPreview && (
      <div className="mt-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-2">
          {isSellOrder ? "Transaction Proof" : "Payment Proof"}
        </h3>
        <div className="max-w-md border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <img
            src={paymentProofPreview}
            alt={isSellOrder ? "Transaction proof" : "Payment proof"}
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    )}

    {file && !paymentProofPreview && (
      <div className="mt-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-2">
          {isSellOrder ? "Transaction Proof" : "Payment Proof"}
        </h3>
        <div className="max-w-md bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-gray-600 dark:text-gray-300">{file.name}</p>
        </div>
      </div>
    )}
  </div>
);

export default OrderSummary;
