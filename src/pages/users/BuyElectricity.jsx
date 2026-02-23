import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

import abuja from "./../../assets/images/electricity/abuja.png";
import aba from "./../../assets/images/electricity/aba.png";
import benin from "./../../assets/images/electricity/benin.png";
import eko from "./../../assets/images/electricity/eko.png";
import enugu from "./../../assets/images/electricity/enugu.png";
import ibadan from "./../../assets/images/electricity/ibadan.png";
import ikeja from "./../../assets/images/electricity/ikeja.png";
import jos from "./../../assets/images/electricity/jos.jpg";
import kaduna from "./../../assets/images/electricity/kaduna.png";
import kano from "./../../assets/images/electricity/kano.png";
import portharcourt from "./../../assets/images/electricity/portharcourt.png";
import yola from "./../../assets/images/electricity/yola.png";

// Stages
import DataNetworkSelectionStage from "../../components/stages/DataNetworkSelectionStage";
import ElectricityFormStage from "../../components/stages/ElectricityFormStage";
import VtuPaymentStage from "../../components/stages/VtuPaymentStage";
import VtuConfirmationStage from "../../components/stages/VtuConfirmationStage";

const BuyElectricity = () => {
  const [selectedDisco, setSelectedDisco] = useState(null);
  const [meterType, setMeterType] = useState("prepaid");
  const [meterNumber, setMeterNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);


  const steps = [
    { id: "select", name: "Select Disco" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  const discos = [
    { name: "Aba (ABEDC/APL)", logo: aba, identifier: "aba-electric" },
    { name: "Abuja (AEDC)", logo: abuja, identifier: "abuja-electric" },
    { name: "Benin (BEDC)", logo: benin, identifier: "benin-electric" },
    { name: "Eko (EKEDC)", logo: eko, identifier: "eko-electric" },
    { name: "Enugu (EEDC)", logo: enugu, identifier: "enugu-electric" },
    { name: "Ibadan (IBEDC)", logo: ibadan, identifier: "ibadan-electric" },
    { name: "Ikeja (IKEDC)", logo: ikeja, identifier: "ikeja-electric" },
    { name: "Jos (JEDC)", logo: jos, identifier: "jos-electric" },
    { name: "Kaduna (KAEDCO)", logo: kaduna, identifier: "kaduna-electric" },
    { name: "Kano (KEDCO)", logo: kano, identifier: "kano-electric" },
    { name: "Port Harcourt (PHED)", logo: portharcourt, identifier: "portharcourt-electric" },
    { name: "Yola (YEDC)", logo: yola, identifier: "yola-electric" },
  ];


  const handleDiscoSelect = (disco) => {
    setSelectedDisco(disco);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meterNumber || meterNumber.length < 6) {
      toast.error("Enter a valid meter number");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 11) {
      toast.error("Enter a valid phone number");
      return;
    }

    if (!amount || Number(amount) < 100) {
      toast.error("Minimum electricity purchase is ₦100");
      return;
    }

    setStage("payment");
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    const payload = {
      serviceID: selectedDisco.identifier,
      phone: phoneNumber,
      customerID: meterNumber,
      amount: Number(amount),
      variation_code: meterType,
      requestId: uuidv4(),
    };

    try {
      const response = await axios.post("api/v1/electricity/purchase", payload);

      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        setStage("confirmation");
        toast.success("Electricity token purchased successfully!");
      } else {
        toast.error(response.data.message || "Electricity purchase failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedDisco(null);
    setMeterType("prepaid");
    setMeterNumber("");
    setPhoneNumber("");
    setAmount("");
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
          Back to Discos
        </button>
      )}

      {stage === "select" && (
        <DataNetworkSelectionStage
          networks={discos}
          onNetworkSelect={handleDiscoSelect}
          title="Buy Electricity Token"
          description="Choose your electricity distribution company"
        />
      )}

      {stage === "form" && selectedDisco && (
        <ElectricityFormStage
          selectedDisco={selectedDisco}
          meterType={meterType}
          onMeterTypeChange={setMeterType}
          meterNumber={meterNumber}
          onMeterNumberChange={setMeterNumber}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          amount={amount}
          onAmountChange={setAmount}
          onSubmit={handleSubmit}
        />
      )}

      {stage === "payment" && selectedDisco && (
        <VtuPaymentStage
          selectedProvider={selectedDisco}
          selectedPlan={{ amount: Number(amount) }}
          phoneNumber={phoneNumber}
          meterNumber={meterNumber}
          meterType={meterType}
          isSubmitting={isSubmitting}
          onConfirmPayment={handlePaymentConfirmation}
          onCancel={resetProcess}
          serviceType="electricity"
        />
      )}

      {stage === "confirmation" && (
        <VtuConfirmationStage
          serviceType="electricity"
          selectedNetwork={selectedDisco}
          selectedPlan={{ amount: Number(amount) }}
          phoneNumber={phoneNumber}
          meterNumber={meterNumber}
          meterType={meterType}
          transaction={transaction}
          onReset={resetProcess}
        />
      )}
    </div>
  );
};

export default BuyElectricity;