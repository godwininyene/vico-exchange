import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "./../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";
import { useBankAccounts } from "../../hooks/useBankAccounts";

// Import stage components
import CryptoSelectionStage from "../../components/stages/CryptoSelectionStage";
import SellCryptoFormStage from "../../components/stages/SellCryptoFormStage";
import SellCryptoPaymentStage from "../../components/stages/SellCryptoPaymentStage";
import SellCryptoConfirmationStage from "../../components/stages/SellCryptoConfirmationStage";

const SellCrypto = () => {
  const { userBanks, loadingAccounts} = useBankAccounts();
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedCoinRate, setSelectedCoinRate] = useState(null);
  const [amount, setAmount] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [stage, setStage] = useState("select"); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [loadingCryptoRate, setLoadingCryptoRate] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [coins, setCoins] = useState([]);
  const [transaction, setTransaction] = useState(null);

  // Progress steps
  const steps = [
    { id: "select", name: "Select Crypto" },
    { id: "form", name: "Enter Details" },
    { id: "payment", name: "Send Coin" },
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

  // Fetch crypto rate when a cryptocurrency is selected
  useEffect(() => {
    const fetchCryptoRate = async () => {
      if (!selectedCrypto) return;

      setLoadingCryptoRate(true);
      const id = selectedCrypto.coinName.toLowerCase();

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
        );

        if (!res.ok) throw new Error("Failed to fetch from CoinGecko");

        const data = await res.json();
        if (!data || !data[id]) {
          toast.error("No pricing data found for this cryptocurrency.");
          return;
        }

        const priceInUSD = data[id].usd;
        setSelectedCoinRate(priceInUSD);
      } catch (err) {
        console.error("Failed to fetch crypto price", err);
        toast.error("Failed to fetch current cryptocurrency rate");
        // Fallback to the mock rate if API fails
        setSelectedCoinRate(selectedCrypto.coinRate);
      } finally {
        setLoadingCryptoRate(false);
      }
    };

    fetchCryptoRate();
  }, [selectedCrypto]);

  useEffect(() => {
    fetchCoins();
  }, []);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCrypto) return 0;
    return parseFloat(amount) * selectedCrypto.coinRate;
  };

  const calculateCoinAmount = () => {
    if (!amount || isNaN(amount) || !selectedCoinRate || selectedCoinRate === 0)
      return 0;
    return parseFloat(amount) / selectedCoinRate;
  };

  // Update coin amount when amount or rate changes
  useEffect(() => {
    setCoinAmount(calculateCoinAmount());
  }, [amount, selectedCoinRate]);

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
    setStage("form");
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      toast.error("Please select an account to receive payment");
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

    try {
      // Create form data for file upload
      const formData = new FormData();
      const account = userBanks.find(el=> el.number === selectedAccount);
      formData.append("assetType", "coin")
      formData.append("transactionType", "sell");
      formData.append("assetId", selectedCrypto.id);
      formData.append("usdAmount", amount);
      formData.append("coinAmount", coinAmount);
      formData.append("receivingAccount", JSON.stringify(account));
      if (file) {
        formData.append("paymentProof", file);
      }

      // Send data to backend
      const response = await axios.post("api/v1/transactions", formData);

      if (response.data.status === "success") {
        setStage("confirmation");
        setTransaction(response.data.data.transaction);
        toast.success("Transaction submitted successfully!");
      } else {
        toast.error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during submission"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedCrypto(null);
    setSelectedCoinRate(null);
    setAmount("");
    setCoinAmount("");
    setStage("select");
    setFile(null);
    setFilePreview(null);
    setSelectedAccount("");
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
            title="Sell Cryptocurrency"
            description="Select a cryptocurrency to sell"
          />
        )}

        {stage === "form" && selectedCrypto && (
          <SellCryptoFormStage
            selectedCrypto={selectedCrypto}
            amount={amount}
            onAmountChange={handleAmountChange}
            coinAmount={coinAmount}
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            userAccounts={userBanks}
            loadingCryptoRate={loadingCryptoRate}
            onSubmit={handleSubmit}
            calculateNairaAmount={calculateNairaAmount}
          />
        )}

        {stage === "payment" && selectedCrypto && (
          <SellCryptoPaymentStage
            selectedCrypto={selectedCrypto}
            coinAmount={coinAmount}
            nairaAmount={calculateNairaAmount()}
            selectedAccount={selectedAccount}
            userAccounts={userBanks}
            file={file}
            filePreview={filePreview}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onPaymentConfirmation={handlePaymentConfirmation}
            isSubmitting={isSubmitting}
          />
        )}

        {stage === "confirmation" && (
          <SellCryptoConfirmationStage
            selectedCrypto={selectedCrypto}
            coinAmount={coinAmount}
            nairaAmount={calculateNairaAmount()}
            selectedAccount={selectedAccount}
            userAccounts={userBanks}
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

export default SellCrypto;
