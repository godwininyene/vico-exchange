import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

// Stages
import DataNetworkFormStage from "../../components/stages/DataNetworkFormStage";
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import DataPaymentStage from "../../components/stages/DataPaymentStage";
import DataConfirmationStage from "../../components/stages/DataConfirmationStage";

const BuyData = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState("select"); // select | form | payment | confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [transaction, setTransaction] = useState(null);

  const steps = [
    { id: "select", name: "Select Network" },
    { id: "form", name: "Choose Plan" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  // Fetch networks
  const fetchNetworks = async () => {
    setProcessing(true);
    try {
      const res = await axios.get("api/v1/data/networks");
      if (res.data.status === "success") {
        setNetworks(res.data.data.networks);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch networks");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchNetworks();
  }, []);

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan || !phoneNumber) {
      toast.error("Please select a plan and enter phone number");
      return;
    }
    setStage("payment");
  };




  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    const payload = {
      network: selectedNetwork.identifier,
      mobile_number: phoneNumber,
      plan_code: selectedPlan.plan_code,
    };

    try {
      const response = await axios.post("api/v1/data/purchase", payload);

      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        setStage("confirmation");
        toast.success("Data purchase successful!");
      } else {
        toast.error(response.data.message || "Purchase failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedNetwork(null);
    setSelectedPlan(null);
    setPhoneNumber("");
    setStage("select");
    setTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <ProgressStepper steps={steps} currentStep={stage} />

      {stage !== "select" && (
        <button
          onClick={resetProcess}
          className="flex items-center text-primary-dark dark:text-primary-light mb-6 hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Back to Networks
        </button>
      )}

      {stage === "select" && (
        <DataNetworkSelectionStage
          networks={networks}
          processing={processing}
          onNetworkSelect={handleNetworkSelect}
          title="Select Network"
          description="Choose your mobile network"
        />
      )}

      {stage === "form" && selectedNetwork && (
        <DataNetworkFormStage
          selectedNetwork={selectedNetwork}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          onSubmit={handleSubmit}
        />
      )}

      {stage === "payment" && selectedPlan && (
        <DataPaymentStage
          selectedNetwork={selectedNetwork}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          // walletBalance={user?.wallet_balance || 0}
          walletBalance={20000}
          isSubmitting={isSubmitting}
          onConfirmPayment={handlePaymentConfirmation}
          onCancel={resetProcess}
        />
      )}

      {stage === "confirmation" && (
        <DataConfirmationStage
          selectedNetwork={selectedNetwork}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          transaction={transaction}
          onReset={resetProcess}
        />
      )}
    </div>
  );
};

export default BuyData;
