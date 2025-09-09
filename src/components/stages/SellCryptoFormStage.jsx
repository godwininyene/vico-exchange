import InputField from "../InputField";
import SelectField from "../SelectField";
const SellCryptoFormStage = ({
  selectedCrypto,
  amount,
  onAmountChange,
  coinAmount,
  selectedAccount,
  onAccountChange,
  userAccounts,
  loadingCryptoRate,
  onSubmit,
  calculateNairaAmount,
}) => {
  const accountOptions = userAccounts.map((account) => {
    return {
      value: account.number,
      label: `${account.bank} - ${account.number}`,
    };
  });
  const isDisabled = !amount || isNaN(amount) || !selectedAccount || loadingCryptoRate
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
            Sell {selectedCrypto.coinName}
          </h1>
        </div>
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
        <div>
          <label
            htmlFor="coinAmount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Amount in {selectedCrypto.coinName}
          </label>
          <div className="relative">
            <input
              type="text"
              id="coinAmount"
              value={loadingCryptoRate ? "Loading..." : coinAmount.toFixed(8)}
              disabled
              className="w-full py-2 px-4 transition-all duration-200 focus:outline-none dark:text-gray-100 border-1 border-solid border-[#D9E1EC] rounded-lg placeholder-[#A1A7C4] text-gray-900 dark:bg-gray-700 dark:border-gray-600 focus:border-primary-light"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {selectedCrypto.coinName}
            </span>
          </div>
        </div>

        <SelectField
          name={"receivingAccount"}
          label={"Receive Payment To"}
          value={selectedAccount}
          onChange={(e) => onAccountChange(e.target.value)}
          options={accountOptions}
          classNames="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
        />
       
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">Rate:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              ₦{selectedCrypto.coinRate.toLocaleString()} per{" $"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              You'll receive:
            </span>
            <span className="font-bold text-lg text-primary-dark dark:text-primary-light">
              ₦{calculateNairaAmount().toLocaleString()}
            </span>
          </div>
        </div>

        {/* <button
          type="submit"
          className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !amount || isNaN(amount) || !selectedAccount || loadingCryptoRate
          }
        >
          {loadingCryptoRate ? "Loading rates..." : "Continue to Payment"}
        </button> */}

         <button
          type="submit"
          className={`w-full font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white cursor-pointer"
          }`}
          disabled={isDisabled}
        >
           {loadingCryptoRate ? "Loading rates..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
};

export default SellCryptoFormStage;
