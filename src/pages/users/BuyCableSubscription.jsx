import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

// Import your custom local assets
import dstv from "./../../assets/images/cables/dstv.png";
import goTv from "./../../assets/images/cables/goTv.png";
import starTimes from "./../../assets/images/cables/starTimes.png";

// Stages
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import CableFormStage from "../../components/stages/CableFormStage";
import VtuPaymentStage from "../../components/stages/VtuPaymentStage";
import VtuConfirmationStage from "../../components/stages/VtuConfirmationStage";

// 🧩 Static Map linking API responses to local UI Assets
const LOGO_MAP = {
  dstv: dstv,
  gotv: goTv,
  startimes: starTimes,
};

const BuyCableSubscription = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [decoderNumber, setDecoderNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [stage, setStage] = useState("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);

  const steps = [
    { id: "select", name: "Select Provider" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  // 🔄 Fetch dynamic providers from Peyflex backend on mount
  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoadingProviders(true);
      try {
        const res = await axios.get("/api/v1/cables/providers");
        const apiProviders = res.data.data.providers || [];

        // Decorate the raw api strings with your local design assets safely
        const decoratedProviders = apiProviders.map((prov) => ({
          name: prov.name,
          identifier: prov.identifier.toLowerCase(),
          logo: LOGO_MAP[prov.identifier.toLowerCase()] || dstv, // Fallback asset if needed
        }));

        setProviders(decoratedProviders);
      } catch (err) {
        toast.error("Unable to load cable providers. Please refresh.");
      } finally {
        setIsLoadingProviders(false);
      }
    };
    fetchProviders();
  }, []);

  // 🔄 Fetch corresponding plans when a provider gets highlighted
  useEffect(() => {
    if (selectedProvider) {
      const fetchPlans = async () => {
        try {
          const res = await axios.get(`/api/v1/cables/plans?provider=${selectedProvider.identifier}`);
          setPlans(res.data.data.plans || []);
        } catch (err) {
          toast.error("Plans currently not available. Please check back later");
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

    // ✅ Clean payload variables mapped directly to your new controller requirements
    const payload = {
      identifier: selectedProvider.identifier,
      plan: selectedPlan?.plan_code,
      iuc: decoderNumber,
      phone: phoneNumber,
      requestId: uuidv4(),
    };

    try {
      const response = await axios.post("/api/v1/cables/subscribe", payload);

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
          networks={providers} // Uses dynamic state now instead of static hardcoding
          onNetworkSelect={handleProviderSelect}
          title="Buy Cable Subscription"
          description={isLoadingProviders ? "Loading available services..." : "Choose your cable provider"}
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