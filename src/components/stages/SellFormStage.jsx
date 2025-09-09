import { FiDollarSign } from "react-icons/fi";
import FileUpload from "../../components/FileUpload";
import InputField from "../InputField";
import SelectField from "../SelectField";

const SellFormStage = ({
  selectedCard,
  amount,
  onAmountChange,
  cardNumber,
  onCardNumberChange,
  selectedAccount,
  onAccountChange,
  userAccounts,
  cardImage,
  cardImagePreview,
  onFileChange,
  onRemoveFile,
  onSubmit,
  calculateNairaAmount,
  isSubmitting,
}) => {
  const isDisabled =
    !amount || !cardNumber || !selectedAccount || !cardImage || isSubmitting;

  const accountOptions = userAccounts.map(account=>{
      return{
        value:account.number,
        label:`${account.bank} - ${account.number}`
      }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedCard.cardLogo}
          alt={selectedCard.cardName}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sell {selectedCard.cardName} Gift Card
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Card Type: {selectedCard.cardType}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <span className="absolute left-2  top-12 z-30 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <InputField
              label=" Amount in USD"
              name="usdAmount"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.0"
              type="number"
            />
          </div>
        </div>

        <InputField
          label="Gift Card Number"
          name="cardNum"
          value={cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
          placeholder="Enter gift card number"
        />

        <SelectField
          name={'receivingAccount'}
          label={'Receive Payment To'}
          value={selectedAccount}
          onChange={(e) => onAccountChange(e.target.value)}
          options={accountOptions}
          classNames="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
         
        />
        <div>
          <FileUpload
            file={cardImage}
            filePreview={cardImagePreview}
            onFileChange={onFileChange}
            onRemoveFile={onRemoveFile}
            accept="image/*"
            description="PNG or JPG (MAX. 5MB)"
            label={"Upload Gift Card Image"}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">
              Current Rate:
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              ₦{selectedCard.cardRate.toLocaleString()} per $1
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


        <button
          type="submit"
          className={`w-full font-medium py-3 flex items-center justify-center px-6 rounded-lg transition-colors duration-300 ${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary-light text-white cursor-pointer"
          }`}
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <FiDollarSign className="mr-2" />
              Sell Gift Card
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SellFormStage;
