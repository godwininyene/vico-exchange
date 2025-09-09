const PaymentDetails = ({ bankAccount, amount }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
    <h3 className="font-bold text-gray-800 dark:text-white mb-3">
      Bank Account Details
    </h3>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">
          Account Name:
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {bankAccount.name}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">
          Account Number:
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {bankAccount.number}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">
          Bank Name:
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {bankAccount.bank}
        </span>
      </div>
      {amount && (
        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
          <span className="text-gray-600 dark:text-gray-300 font-semibold">
            Amount to Pay:
          </span>
          <span className="font-bold text-primary-dark dark:text-primary-light">
            ₦{amount.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  </div>
);

export default PaymentDetails;