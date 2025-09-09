import InputField from "../InputField";
const AmountFormStage = ({
  selectedCard,
  amount,
  onAmountChange,
  onSubmit,
  calculateNairaAmount,
}) => {  
  const isDisabled = !amount || isNaN(amount);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedCard.cardLogo}
          alt={selectedCard.cardName}
          className="w-12 h-12 object-contain mr-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Buy {selectedCard.cardName} Gift Card
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <span className="absolute left-2  top-12 z-30 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <InputField
              label="Amount in USDT"
              name="usdAmount"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.0"
              type="number"
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">Rate:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              ₦{selectedCard.cardRate.toLocaleString()} per $1
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              You'll pay:
            </span>
            <span className="font-bold text-lg text-primary-dark dark:text-primary-light">
              ₦{calculateNairaAmount().toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${
            isDisabled
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-dark hover:bg-primary-light text-white cursor-pointer'
          }`}
          disabled={isDisabled}
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AmountFormStage;