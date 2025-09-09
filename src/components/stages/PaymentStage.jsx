import { FiCheckCircle } from "react-icons/fi";
import FileUpload from "../../components/FileUpload";
import PaymentDetails from "../../components/PaymentDetails";
import { useCompanyAccount } from "../../hooks/useBankAccounts";

const PaymentStage = ({
  selectedCard,
  nairaAmount,
  file,
  filePreview,
  onFileChange,
  onRemoveFile,
  onPaymentConfirmation,
  isSubmitting,
}) => {

  const { bankData, loadingCompanyAccount } = useCompanyAccount();
  const isDisabled = !file || isSubmitting || !bankData;

  if (loadingCompanyAccount) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading company account...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedCard.cardLogo}
          alt={selectedCard.cardName}
          className="w-12 h-12 object-contain mr-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Complete Your Purchase
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Please send only the sum of{" "}
            <span className="font-bold">₦{nairaAmount.toLocaleString()}</span>{" "}
            to the account below. Do not send more or less than this amount.
          </p>
        </div>

        <PaymentDetails bankAccount={bankData} amount={nairaAmount} />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            Ensure to take a screenshot/snapshot of the transfer confirmation
            page and upload it below for verification.
          </p>
        </div>

        <FileUpload
          file={file}
          filePreview={filePreview}
          onFileChange={onFileChange}
          onRemoveFile={onRemoveFile}
        />
        <button
          onClick={onPaymentConfirmation}
          className={`w-full font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white cursor-pointer"
            }`}
          disabled={isDisabled}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <FiCheckCircle className="mr-2" />I Have Sent the Money
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentStage;
