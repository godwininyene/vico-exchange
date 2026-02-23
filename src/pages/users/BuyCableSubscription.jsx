import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

import dstv from "./../../assets/images/cables/dstv.png";
import goTv from "./../../assets/images/cables/goTv.png";
import starTimes from "./../../assets/images/cables/starTimes.png";

// Stages
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import CableFormStage from "../../components/stages/CableFormStage";
import VtuPaymentStage from "../../components/stages/VtuPaymentStage";
import VtuConfirmationStage from "../../components/stages/VtuConfirmationStage";

const BuyCableSubscription = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [decoderNumber, setDecoderNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [stage, setStage] = useState("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const steps = [
    { id: "select", name: "Select Provider" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  const cables = [
    { name: "DSTV", logo: dstv, identifier: "dstv" },
    { name: "GOTV", logo: goTv, identifier: "gotv" },
    { name: "StarTimes", logo: starTimes, identifier: "startimes" },
  ];

  // Fetch plans from backend when a provider is selected
  useEffect(() => {
    if (selectedProvider) {
      const fetchPlans = async () => {
        try {
          const res = await axios.get(`/api/v1/cables/plans?service=${selectedProvider.identifier}`);
          setPlans(res.data.data.plans || []);
        } catch (err) {
          toast.error("Failed to fetch plans");
        }
      };
      fetchPlans();
    }
  }, [selectedProvider]);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!decoderNumber || decoderNumber.length < 6) {
      toast.error("Enter a valid decoder number");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 11) {
      toast.error("Enter a valid phone number");
      return;
    }

    if (!selectedPlan) {
      toast.error("Select a subscription plan");
      return;
    }

    setStage("payment");
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    const payload = {
      serviceID: selectedProvider.identifier,
      phone: phoneNumber,
      customerID:decoderNumber,
      variation_code: selectedPlan.value,
      requestId: uuidv4(),
    };


    try {
      const response = await axios.post("/api/v1/cables/purchase", payload);

      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        setStage("confirmation");
        toast.success("Cable subscription purchased successfully!");
      } else {
        toast.error(response.data.message || "Purchase failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedProvider(null);
    setDecoderNumber("");
    setPhoneNumber("");
    setSelectedPlan(null);
    setPlans([]);
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
          Back to Providers
        </button>
      )}

      {stage === "select" && (
        <DataNetworkSelectionStage
          networks={cables}
          onNetworkSelect={handleProviderSelect}
          title="Buy Cable Subscription"
          description="Choose your cable provider"
        />
      )}

      {stage === "form" && selectedProvider && (
        <CableFormStage
          selectedProvider={selectedProvider}
          decoderNumber={decoderNumber}
          onDecoderNumberChange={setDecoderNumber}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          plans={plans}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          onSubmit={handleSubmit}
        />
      )}

      {stage === "payment" && selectedProvider && selectedPlan && (
        <VtuPaymentStage
          selectedProvider={selectedProvider}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          decoderNumber={decoderNumber}
          isSubmitting={isSubmitting}
          onConfirmPayment={handlePaymentConfirmation}
          onCancel={resetProcess}
          serviceType="cable"
        />
      )}

      {stage === "confirmation" && (
        <VtuConfirmationStage
          serviceType="cable"
          selectedNetwork={selectedProvider}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          decoderNumber={decoderNumber}
          transaction={transaction}
          onReset={resetProcess}
        />
      )}
    </div>
  );
};

export default BuyCableSubscription;