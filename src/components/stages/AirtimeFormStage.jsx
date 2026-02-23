import InputField from "../InputField";

const AirtimeFormStage = ({
  selectedNetwork,
  phoneNumber,
  onPhoneNumberChange,
  amount,
  onAmountChange,
  onSubmit,
}) => {
//   const isDisabled = !phoneNumber || !amount || Number(amount) < 50;
 const isDisabled = !phoneNumber || !amount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedNetwork.logo}
          alt={selectedNetwork.name}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Buy {selectedNetwork.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter phone number and amount
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <InputField
          label="Phone Number"
          placeholder="08012345678"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />

        <InputField
          label="Amount (₦)"
          placeholder="100"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white"
          }`}
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AirtimeFormStage;
