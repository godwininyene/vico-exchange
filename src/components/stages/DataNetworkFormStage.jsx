import InputField from "../InputField";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DataNetworkFormStage = ({
  selectedNetwork,
  phoneNumber,
  onPhoneNumberChange,
  selectedPlan,
  onPlanSelect,
  onSubmit,
}) => {
  const [plans, setPlans] = useState([]);
  const [processing, setProcessing] = useState(false);

  const isDisabled = !phoneNumber || !selectedPlan;

  const fetchDataPlans = async () => {
    setProcessing(true);
    try {
      const res = await axios.get(
        `api/v1/data/plans?network=${selectedNetwork.identifier}`
      );
      if (res.data.status === "success") {
        setPlans(res.data.data.plans);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch data plans");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchDataPlans();
  }, [selectedNetwork.identifier]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={selectedNetwork.logo}
          alt={selectedNetwork.name}
          className="w-12 h-12 object-contain mr-4 rounded-lg"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Buy {selectedNetwork.name} 
        </h1>
      </div>

      {/* Plans */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Select Data Plan by clicking on any of the plan below.
        </label>

        {processing ? (
          <p className="text-gray-500">Loading plans...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plans.map((plan) => (
              <button
                key={plan.plan}
                type="button"
                onClick={() => onPlanSelect(plan)}
                className={`p-3 rounded-lg border text-left transition ${
                  selectedPlan?.plan === plan.plan
                    ? "border-primary-dark bg-primary-dark/10"
                    : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <p className="font-medium text-gray-800 dark:text-white">
                  {plan.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ₦{plan.amount.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <InputField
          label="Phone Number to Subscribe"
          name="mobileNumber"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          placeholder="080xxxxxxxx"
        />
      </div>

      {/* Summary */}
      {selectedPlan && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">You’ll pay:</span>
            <span className="font-bold text-lg text-primary-dark">
              ₦{selectedPlan.amount.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={onSubmit}
        className={`w-full font-medium py-3 px-6 rounded-lg transition-colors ${
          isDisabled
            ? "bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-primary-dark hover:bg-primary-light text-white"
        }`}
        disabled={isDisabled}
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default DataNetworkFormStage;
