import { FiCheckCircle } from "react-icons/fi";

const VtuPaymentStage = ({
  selectedProvider,   // network | disco | cable provider
  selectedPlan,       // data plan | cable plan | { amount }
  phoneNumber,
  meterNumber,
  meterType,
  decoderNumber,
  isSubmitting,
  onConfirmPayment,
  onCancel,
  serviceType = "data", // "data" | "airtime" | "electricity" | "cable"
}) => {
  const isDisabled = isSubmitting;

  const isData = serviceType === "data";
  const isAirtime = serviceType === "airtime";
  const isElectricity = serviceType === "electricity";
  const isCable = serviceType === "cable";

  const amount = isCable
    ? Number(selectedPlan?.price || 0)
    : Number(selectedPlan?.amount || 0);

  const planLabel = isCable
    ? selectedPlan?.display_name
    : selectedPlan?.label;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedProvider.logo}
          alt={selectedProvider.name}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Confirm{" "}
            {isData
              ? "Data"
              : isAirtime
              ? "Airtime"
              : isElectricity
              ? "Electricity"
              : "Cable"}{" "}
            Purchase
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You’re about to complete this transaction
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">
            Purchase Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                {isElectricity
                  ? "Disco"
                  : isCable
                  ? "Provider"
                  : "Network"}
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {selectedProvider.name}
              </span>
            </div>

            {(isData || isCable) && planLabel && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {isCable ? "Plan" : "Data Plan"}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {planLabel}
                </span>
              </div>
            )}

            {isElectricity && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Meter Type</span>
                  <span className="font-medium text-gray-800 dark:text-white capitalize">
                    {meterType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Meter Number</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {meterNumber}
                  </span>
                </div>
              </>
            )}

            {isCable && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Decoder / Smart Card
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {decoderNumber}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Phone</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {phoneNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Amount</span>
              <span className="font-bold text-primary-dark">
                ₦{amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirmPayment}
          disabled={isDisabled}
          className={`w-full font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <FiCheckCircle className="mr-2" />
              Confirm & Pay
            </>
          )}
        </button>

        <button
          onClick={onCancel}
          className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VtuPaymentStage;