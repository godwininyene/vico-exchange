import { useState, useEffect } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Loader from "../Loader";
import axios from "../../lib/axios";
import { toast } from "react-toastify";

const ElectricityFormStage = ({
  selectedDisco,
  meterNumber,
  meterType,
  phoneNumber,
  amount,
  onMeterTypeChange,
  onMeterNumberChange,
  onPhoneNumberChange,
  onAmountChange,
  onSubmit,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Normalize min/max amounts
  const minAmount = Number(selectedDisco.min_amount);
  const maxAmount = Number(selectedDisco.max_amount);
  const numericAmount = Number(amount) || 0;

  const verifyMeter = async () => {
    if (!meterNumber || meterNumber.length < 6 || !meterType) return;

    try {
      setIsVerifying(true);
      setIsVerified(false);
      setCustomerName("");

      const payload = {
        meter: meterNumber,
        type: meterType,
        plan: selectedDisco.identifier,
      };

      const res = await axios.post("/api/v1/electricity/verify-meter", payload);

      if (res.data.status === "success") {
        setCustomerName(res.data.data.customer);
        setIsVerified(true);
        toast.success("Meter verified successfully");
      } else {
        setIsVerified(false);
        toast.error(res.data.message || "Unable to verify meter");
      }
    } catch (err) {
      setIsVerified(false);
      setCustomerName("");
      toast.error(err.response?.data?.message || "Unable to verify meter");
    } finally {
      setIsVerifying(false);
    }
  };

  // Button disabled logic
  const isDisabled =
    !meterType ||
    !meterNumber ||
    meterNumber.length < 6 ||
    !phoneNumber ||
    phoneNumber.length < 11 ||
    numericAmount < minAmount ||
    numericAmount > maxAmount ||
    !isVerified;

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
            Enter meter details and verify before purchase
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Meter Type */}
        <SelectField
          name="meterType"
          label="Meter Type"
          value={meterType}
          onChange={(e) => {
            setIsVerified(false);
            setCustomerName("");
            onMeterTypeChange(e.target.value);
          }}
          options={[
            { label: "Prepaid", value: "prepaid" },
            { label: "Postpaid", value: "postpaid" },
          ]}
        />

        {/* Meter Number & Verify */}
        <div className="space-y-2">
          <InputField
            label="Meter Number"
            placeholder="12345678901"
            value={meterNumber}
            onChange={(e) => {
              setIsVerified(false);
              setCustomerName("");
              onMeterNumberChange(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={verifyMeter}
            disabled={!meterNumber || meterNumber.length < 6 || !meterType || isVerifying}
            className={`font-medium py-2 px-6 rounded-lg transition-colors duration-300 ${
              !meterNumber || meterNumber.length < 6 || !meterType
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-primary-dark hover:bg-primary-light text-white"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify Meter"}
          </button>
        </div>

        {/* Verification Loader */}
        {isVerifying && (
          <div className="flex justify-center">
            <Loader size={6} />
          </div>
        )}

        {/* Verification Result */}
        {isVerified && customerName && (
          <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
            Meter verified: <strong>{customerName}</strong>
          </div>
        )}

        {/* Prompt to verify */}
        {!isVerified && !isVerifying && meterNumber && meterNumber.length >= 6 && (
          <p className="text-sm text-red-500">
            Please verify your meter before continuing
          </p>
        )}

        {/* Phone Number */}
        <InputField
          label="Phone Number"
          placeholder="08012345678"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />

        {/* Amount */}
        <div className="space-y-1">
          <InputField
            label="Amount (₦)"
            placeholder={minAmount}
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Minimum: ₦{minAmount} | Maximum: ₦{maxAmount}
          </p>
        </div>

        {/* Continue Button */}
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