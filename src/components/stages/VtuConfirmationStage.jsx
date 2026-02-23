import { FiCheckCircle, FiHome, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const VtuConfirmationStage = ({
  serviceType = "vtu", // airtime | data | cable | electricity | education
  selectedNetwork,     // network | disco | cable provider
  selectedPlan,
  phoneNumber,
  meterNumber,
  meterType,
  decoderNumber,
  transaction,
  onReset,
}) => {
  const serviceLabels = {
    airtime: "Airtime Purchase Successful 🎉",
    data: "Data Purchase Successful 🎉",
    cable: "Cable Subscription Successful 🎉",
    electricity: "Electricity Payment Successful ⚡",
    education: "Educational Payment Successful 🎓",
    vtu: "Transaction Successful 🎉",
  };

  const deliveryText = {
    airtime: "Your airtime has been successfully delivered to",
    data: "Your data has been successfully delivered to",
    cable: "Your cable subscription was successful for smartcard",
    electricity: "Your electricity token has been generated for meter",
    education: "Your educational payment was successful for",
    vtu: "Your transaction was successful for",
  };

  const isCable = serviceType === "cable";
  const isElectricity = serviceType === "electricity";

  const planLabel = isCable
    ? selectedPlan?.display_name
    : selectedPlan?.label;

  const amount = isCable
    ? Number(selectedPlan?.price || transaction?.amount || 0)
    : Number(selectedPlan?.amount || transaction?.amount || 0);

  const handleCopyToken = () => {
    if (!transaction?.token) return;
    navigator.clipboard.writeText(transaction.token);
    toast.success("Token copied to clipboard");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
        <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>

      <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        {serviceLabels[serviceType]}
      </h2>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {deliveryText[serviceType]}
        <span className="font-bold">
          {" "}
          {isElectricity
            ? meterNumber
            : isCable
            ? decoderNumber
            : phoneNumber}
        </span>
        .
      </p>

      {/* Electricity Token */}
      {isElectricity && transaction?.token && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-700 dark:text-green-300 mb-2">
            Electricity Token
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-lg font-bold text-green-800 dark:text-green-200 break-all">
              {transaction.token}
            </span>
            <button
              onClick={handleCopyToken}
              className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              <FiCopy />
            </button>
          </div>

          {transaction?.units && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Units: <span className="font-bold">{transaction.units} kWh</span>
            </p>
          )}
        </div>
      )}

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-5 text-left">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">
          Transaction Summary
        </h3>

        <div className="space-y-3 text-sm">
          {selectedNetwork && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                {isElectricity
                  ? "Disco"
                  : isCable
                  ? "Provider"
                  : "Network"}
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {selectedNetwork?.name}
              </span>
            </div>
          )}

          {isElectricity && meterType && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Meter Type</span>
              <span className="font-medium text-gray-800 dark:text-white capitalize">
                {meterType}
              </span>
            </div>
          )}

          {planLabel && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                {serviceType === "airtime" ? "Package" : "Plan"}
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {planLabel}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              {isElectricity
                ? "Meter Number"
                : isCable
                ? "Smart Card Number"
                : "Phone Number"}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {isElectricity
                ? meterNumber
                : isCable
                ? decoderNumber
                : phoneNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Amount Paid</span>
            <span className="font-bold text-primary-dark">
              ₦{amount.toLocaleString()}
            </span>
          </div>

          {transaction?.ref && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Reference</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {transaction.ref}
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="cursor-pointer mt-8 w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
      >
        <FiHome className="mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
};

export default VtuConfirmationStage;