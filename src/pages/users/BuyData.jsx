import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

import mtn from './../../assets/images/networks/mtn.jpeg';
import mtn_2 from './../../assets/images/networks/mtn-2.webp';
import airtel from './../../assets/images/networks/airtel.png';
import glo from './../../assets/images/networks/glo.jpg'
import etisalat from './../../assets/images/networks/9mobile.jpg'



// Stages
import DataNetworkFormStage from "../../components/stages/DataNetworkFormStage";
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import VtuPaymentStage from "../../components/stages/VtuPaymentStage";
import VtuConfirmationStage from "../../components/stages/VtuConfirmationStage";

const BuyData = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState("select"); // select | form | payment | confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transaction, setTransaction] = useState(null);



  const steps = [
    { id: "select", name: "Select Network" },
    { id: "form", name: "Choose Plan" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  const networks = [
    //MTN
    {
      name: 'MTN Awoof Data',
      logo: mtn,
      identifier: 'mtn_awoof'
    },

    {
      name: 'MTN Gifting Data',
      logo: mtn_2,
      identifier: 'mtn_gifting'
    },
    {
      name: 'MTN SME Data',
      logo: mtn,
      identifier: 'mtn_sme'
    },

    //AIRTEL

    {
      name: 'Airtel Gifting Data',
      logo: airtel,
      identifier: 'airtel_gifting'
    },
    {
      name: 'Airtel SME Data',
      logo: airtel,
      identifier: 'airtel_sme'
    },

    //GLO

    {
      name: 'Glo Corporate Gifting Data',
      logo: glo,
      identifier: 'glo_data'
    },
    {
      name: 'Glo SME Data',
      logo: glo,
      identifier: 'glo_sme'
    },

    //9moble
    {
      name: '9mobile Data',
      logo: etisalat,
      identifier: 'etisalat_data'
    },
  ]



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
      serviceId: selectedNetwork.identifier,
      plan: selectedPlan.plan,
      phone: phoneNumber,
      requestId: uuidv4()
    }

    try {
      const response = await axios.post("api/v1/data/purchase", payload);

      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        console.log(response.data);

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
        <VtuPaymentStage
          selectedProvider={selectedNetwork}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          isSubmitting={isSubmitting}
          onConfirmPayment={handlePaymentConfirmation}
          onCancel={resetProcess}
          serviceType="data"
        />
      )}

      {stage === "confirmation" && (
        <VtuConfirmationStage
          selectedNetwork={selectedNetwork}
          selectedPlan={selectedPlan}
          phoneNumber={phoneNumber}
          transaction={transaction}
          onReset={resetProcess}
          serviceType="data"
        />
      )}
    </div>
  );
};

export default BuyData;
