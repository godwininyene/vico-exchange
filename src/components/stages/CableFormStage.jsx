import { useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Loader from "../Loader";
import axios from "../../lib/axios";
import { toast } from "react-toastify";

const CableFormStage = ({
  selectedProvider,
  decoderNumber,
  phoneNumber,
  plans = [],
  selectedPlan,
  onDecoderNumberChange,
  onPhoneNumberChange,
  onPlanSelect,
  onSubmit,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // ✅ VERIFY DECODER
  const verifyCable = async () => {
    if (!decoderNumber || decoderNumber.length < 6 || !selectedProvider) return;

    try {
      setIsVerifying(true);
      setIsVerified(false);
      setCustomerName("");

      const payload = {
        iuc: decoderNumber,
        identifier: selectedProvider.identifier,
      };

      const res = await axios.post("/api/v1/cables/verify-card", payload);

      if (res.data.status === "success") {
        setCustomerName(res.data.data.customer);
        setIsVerified(true);
        toast.success("Decoder verified successfully");
      } else {
        setIsVerified(false);
        toast.error(res.data.message || "Unable to verify decoder");
      }
    } catch (err) {
      setIsVerified(false);
      setCustomerName("");
      toast.error(err.response?.data?.message || "Unable to verify decoder");
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ DISABLE LOGIC
  const isDisabled =
    !decoderNumber ||
    decoderNumber.length < 6 ||
    !phoneNumber ||
    phoneNumber.length < 11 ||
    !selectedPlan ||
    !isVerified;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      
      {/* HEADER */}
      <div className="flex items-center mb-6">
        <img
          src={selectedProvider.logo}
          alt={selectedProvider.name}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Buy {selectedProvider.name} Subscription
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter decoder details and verify before purchase
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* PLAN */}
        <SelectField
          label="Subscription Plan"
          value={selectedPlan?.value || ""}
          onChange={(e) => {
            const plan = plans.find((p) => p.value === e.target.value);
            onPlanSelect(plan);

            // reset verification if plan changes (optional but safe)
            setIsVerified(false);
            setCustomerName("");
          }}
          options={[
            { label: "Select a plan", value: "" },
            ...plans.map((plan) => ({
              label: `${plan.display_name} - ₦${Number(plan.price).toLocaleString()}`,
              value: plan.value,
            })),
          ]}
        />

        {/* DECODER + VERIFY */}
        <div className="space-y-2">
          <InputField
            label="Decoder / Smart Card Number"
            placeholder="1234567890"
            value={decoderNumber}
            onChange={(e) => {
              setIsVerified(false);
              setCustomerName("");
              onDecoderNumberChange(e.target.value);
            }}
          />

          <button
            type="button"
            onClick={verifyCable}
            disabled={!decoderNumber || decoderNumber.length < 6 || isVerifying}
            className={`font-medium py-2 px-6 rounded-lg transition ${
              !decoderNumber || decoderNumber.length < 6
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-primary-dark hover:bg-primary-light text-white"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify Decoder"}
          </button>
        </div>

        {/* LOADER */}
        {isVerifying && (
          <div className="flex justify-center">
            <Loader size={6} />
          </div>
        )}

        {/* SUCCESS */}
        {isVerified && customerName && (
          <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
            Decoder verified: <strong>{customerName}</strong>
          </div>
        )}

        {/* ERROR PROMPT */}
        {!isVerified && !isVerifying && decoderNumber && decoderNumber.length >= 6 && (
          <p className="text-sm text-red-500">
            Please verify your decoder before continuing
          </p>
        )}

        {/* PHONE */}
        <InputField
          label="Phone Number"
          placeholder="08012345678"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full font-medium py-3 px-6 rounded-lg transition ${
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

export default CableFormStage;