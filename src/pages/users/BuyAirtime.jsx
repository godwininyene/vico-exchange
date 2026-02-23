import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

import mtn_2 from './../../assets/images/networks/mtn-2.webp';
import airtel from './../../assets/images/networks/airtel.png';
import glo from './../../assets/images/networks/glo.jpg';
import etisalat from './../../assets/images/networks/9mobile.jpg';
import { detectNetworkFromPhone } from "../../utils/networkDetector";

// Stages
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import AirtimeFormStage from "../../components/stages/AirtimeFormStage";
import VtuPaymentStage from "../../components/stages/VtuPaymentStage";
import VtuConfirmationStage from "../../components/stages/VtuConfirmationStage";

const BuyAirtime = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const steps = [
    { id: "select", name: "Select Network" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  const networks = [
    { name: "MTN Airtime", logo: mtn_2, identifier: "mtn" },
    { name: "Airtel Airtime", logo: airtel, identifier: "airtel" },
    { name: "Glo Airtime", logo: glo, identifier: "glo" },
    { name: "9mobile Airtime", logo: etisalat, identifier: "etisalat" },
  ];

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 11) {
      toast.error("Enter a valid phone number");
      return;
    }

    if (!amount || Number(amount) < 100) {
      toast.error("Minimum airtime purchase is ₦100");
      return;
    }

    setStage("payment");
  };


  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    const payload = {
      serviceID: selectedNetwork.identifier,
      phone: phoneNumber,
      amount: Number(amount),
      requestId: uuidv4()
    };

    try {
      const response = await axios.post("api/v1/airtime/purchase", payload);

      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        setStage("confirmation");
        toast.success("Airtime purchase successful!");
      } else {
        toast.error(response.data.message || "Airtime purchase failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedNetwork(null);
    setPhoneNumber("");
    setAmount("");
    setStage("select");
    setTransaction(null);
  };

  useEffect(() => {
    if (phoneNumber.length >= 4) {
      const detected = detectNetworkFromPhone(phoneNumber);
      if (detected) {
        const matched = networks.find((n) => n.identifier === detected);
        if (matched) {
          setSelectedNetwork(matched);
        }
      }
    }
  }, [phoneNumber]);


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
          onNetworkSelect={handleNetworkSelect}
          title="Select Network"
          description="Choose your mobile network"
        />
      )}

      {stage === "form" && selectedNetwork && (
        <AirtimeFormStage
          selectedNetwork={selectedNetwork}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          amount={amount}
          onAmountChange={setAmount}
          onSubmit={handleSubmit}
        />
      )}

      {stage === "payment" && (
        <VtuPaymentStage
          selectedProvider={selectedNetwork}
          selectedPlan={{ amount: Number(amount) }}
          phoneNumber={phoneNumber}
          isSubmitting={isSubmitting}
          onConfirmPayment={handlePaymentConfirmation}
          onCancel={resetProcess}
          serviceType="airtime"
        />
      )}

      {stage === "confirmation" && (
        <VtuConfirmationStage
          selectedNetwork={selectedNetwork}
          selectedPlan={{ amount: Number(amount), name: "Airtime" }}
          phoneNumber={phoneNumber}
          transaction={transaction}
          onReset={resetProcess}
          serviceType="airtime"
        />
      )}
    </div>
  );
};

export default BuyAirtime;
