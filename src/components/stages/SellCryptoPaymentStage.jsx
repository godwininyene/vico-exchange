import { FiCheckCircle } from "react-icons/fi";
import FileUpload from "../../components/FileUpload";
import { toast } from "react-toastify";

const SellCryptoPaymentStage = ({
  selectedCrypto,
  coinAmount,
  nairaAmount,
  selectedAccount,
  userAccounts,
  file,
  filePreview,
  onFileChange,
  onRemoveFile,
  onPaymentConfirmation,
  isSubmitting,
}) => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCrypto.coinAddress);
    toast.success("Address copied to clipboard!");
  };

  const isDisabled = !file || isSubmitting

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedCrypto.coinImage}
          alt={selectedCrypto.coinName}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Complete Your Sale
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Please send exactly{" "}
            <span className="font-bold">
              {coinAmount.toFixed(8)} {selectedCrypto.coinName}
            </span>{" "}
            to the wallet below. Do not send more or less than this amount.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            Warning: Ensure you're sending {selectedCrypto.coinName} to this
            address only. Sending other cryptocurrencies will result in
            permanent loss.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">
            Wallet Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Cryptocurrency:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {selectedCrypto.coinName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Amount to send:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {coinAmount.toFixed(8)} {selectedCrypto.coinName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Network:</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {selectedCrypto.coinName} Network
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Wallet Address:
              </span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 dark:text-white break-all mr-2 text-sm">
                  {selectedCrypto.coinAddress}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="cursor-pointer text-primary-dark dark:text-primary-light hover:underline text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">
            Payment Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Receiving Account:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {
                  userAccounts.find(
                    (acc) => acc.number === selectedAccount)?.bank
                }{" "}
                - {" "}
                {
                  userAccounts.find(
                    (acc) => acc.number === selectedAccount)?.number
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Amount to receive:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                ₦{nairaAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            After sending, upload proof of transaction below for verification.
          </p>
        </div>

        <FileUpload
          file={file}
          filePreview={filePreview}
          onFileChange={onFileChange}
          onRemoveFile={onRemoveFile}
          accept="image/*,.pdf"
          description="PNG, JPG, or PDF (screenshot of transaction)"
        />

        {/* <button
          onClick={onPaymentConfirmation}
          className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <FiCheckCircle className="mr-2" />I Have Sent the Crypto
            </>
          )}
        </button> */}

        <button
          onClick={onPaymentConfirmation}
          className={`w-full font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white cursor-pointer"
          }`}
          disabled={isDisabled}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <FiCheckCircle className="mr-2" />I Have Sent the Crypto
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SellCryptoPaymentStage;
