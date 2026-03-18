import InputField from "../InputField";
import SelectField from "../SelectField";

const ElectricityFormStage = ({
  selectedDisco,
  meterType,
  meterNumber,
  phoneNumber,
  amount,
  isVerified,
  onMeterTypeChange,
  onMeterNumberChange,
  onPhoneNumberChange,
  onAmountChange,
  onSubmit,
}) => {
  const isDisabled =
    !meterType ||
    !meterNumber ||
    !phoneNumber ||
    phoneNumber.length < 11 ||
    !amount ||
    Number(amount) < 100 

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedDisco.logo}
          alt={selectedDisco.name}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Buy Electricity ({selectedDisco.name})
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter meter details, phone number and amount
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Meter Type  */}
        <SelectField
          name="meterType"
          label="Meter Type"
          value={meterType}
          onChange={(e) => onMeterTypeChange(e.target.value)}
          options={[
            { label: "Prepaid", value: "prepaid" },
            { label: "Postpaid", value: "postpaid" },
          ]}
        />

        <InputField
          label="Meter Number"
          placeholder="12345678901"
          value={meterNumber}
          onChange={(e) => onMeterNumberChange(e.target.value)}
        />

        {/* Phone Number */}
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

export default ElectricityFormStage;