import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "./../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

// Import stage components
import CryptoSelectionStage from "../../components/stages/CryptoSelectionStage";
import CryptoFormStage from "../../components/stages/CryptoFormStage";
import CryptoPaymentStage from "../../components/stages/CryptoPaymentStage";
import CryptoConfirmationStage from "../../components/stages/CryptoConfirmationStage";


const BuyCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [stage, setStage] = useState("select"); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [coins, setCoins] = useState([]);
  const [transaction, setTransaction] = useState(null);

  // Progress steps
  const steps = [
    { id: "select", name: "Select Crypto" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  // Fetch coins
  const fetchCoins = async () => {
    setProcessing(true);
    try {
      const res = await axios.get(`api/v1/coins`);
      if (res.data.status === "success") {
        setCoins(res.data.data.coins);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch cryptocurrencies");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCrypto) return 0;
    return parseFloat(amount) * selectedCrypto.coinRate;
  };

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      toast.error("Please enter a valid wallet address");
      return;
    }
    setStage("payment");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setFilePreview(reader.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    const walletAddressData = {
      network: selectedCrypto.coinName,
      address: walletAddress,
    };
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append("assetType", "coin");
      formData.append("assetId", selectedCrypto.id);
      formData.append("transactionType", "buy");
      formData.append("usdAmount", amount);
      formData.append(
        "receivingWalletAddress",
        JSON.stringify(walletAddressData)
      );
      if (file) {
        formData.append("paymentProof", file);
      }

      // Send data to backend
      const response = await axios.post("api/v1/transactions", formData);

      if (response.data.status === "success") {
        setStage("confirmation");
        setTransaction(response.data.data.transaction);
        toast.success("Purchase successful! Your crypto is being processed.");
      } else {
        toast.error(response.data.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during purchase"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedCrypto(null);
    setAmount("");
    setWalletAddress("");
    setStage("select");
    setFile(null);
    setFilePreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="">
        <ProgressStepper steps={steps} currentStep={stage} />

        {/* Back button for stages after select */}
        {stage !== "select" && (
          <button
            onClick={resetProcess}
            className="flex items-center text-primary-dark dark:text-primary-light mb-6 hover:underline transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Cryptocurrencies
          </button>
        )}

        {/* Render the appropriate stage component */}
        {stage === "select" && (
          <CryptoSelectionStage
            coins={coins}
            processing={processing}
            onCryptoSelect={handleCryptoSelect}
          />
        )}

        {stage === "form" && selectedCrypto && (
          <CryptoFormStage
            selectedCrypto={selectedCrypto}
            amount={amount}
            onAmountChange={setAmount}
            walletAddress={walletAddress}
            onWalletAddressChange={setWalletAddress}
            onSubmit={handleSubmit}
            calculateNairaAmount={calculateNairaAmount}
          />
        )}

        {stage === "payment" && selectedCrypto && (
          <CryptoPaymentStage
            selectedCrypto={selectedCrypto}
            nairaAmount={calculateNairaAmount()}
            amount={amount}
            walletAddress={walletAddress}
            file={file}
            filePreview={filePreview}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onPaymentConfirmation={handlePaymentConfirmation}
            isSubmitting={isSubmitting}
          />
        )}

        {stage === "confirmation" && (
          <CryptoConfirmationStage
            selectedCrypto={selectedCrypto}
            amount={amount}
            nairaAmount={calculateNairaAmount()}
            walletAddress={walletAddress}
            filePreview={filePreview}
            file={file}
            onReset={resetProcess}
            transaction={transaction}
          />
        )}
      </div>
    </div>
  );
};

export default BuyCrypto;
