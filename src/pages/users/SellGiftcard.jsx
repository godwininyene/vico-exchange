import { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "./../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";
import { useBankAccounts } from "../../hooks/useBankAccounts";

// Import stage components
import CardSelectionStage from "../../components/stages/CardSelectionStage";
import SellFormStage from "../../components/stages/SellFormStage";
import SellConfirmationStage from "../../components/stages/SellConfirmationStage";

// Mock user bank accounts - replace with actual user accounts
const userAccounts = [
  { id: 1, bank: "Zenith Bank", number: "1234567890", name: "Mike Uche" },
  { id: 2, bank: "GTBank", number: "0987654321", name: "Mike Uche" },
  { id: 3, bank: "Access Bank", number: "5678901234", name: "Mike Uche" },
];

const SellGiftcard = () => {
  const { userBanks, loadingAccounts } = useBankAccounts();
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const [stage, setStage] = useState("select"); // 'select', 'form', 'confirmation'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cards, setCards] = useState([]);
  const [transaction, setTransaction] = useState(null)
  const topRef = useRef(null);

  // Scroll to top when stage changes to confirmation
  useEffect(() => {
    if (stage === "confirmation" && topRef.current) {
      // Using setTimeout to ensure smooth scrolling after the component renders
      setTimeout(() => {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [stage]);

  // Progress steps
  const steps = [
    { id: "select", name: "Select Card" },
    { id: "form", name: "Enter Details" },
    { id: "confirmation", name: "Confirmation" },
  ];

  // Fetch giftcards
  const fetchGiftcards = async () => {
    setProcessing(true);
    try {
      const res = await axios.get(`api/v1/giftcards`);
      if (res.data.status === "success") {
        setCards(res.data.data.cards);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch gift cards");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchGiftcards();
  }, []);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCard) return 0;
    return (parseFloat(amount) * selectedCard.cardRate);
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setStage("form");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCardImage(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setCardImagePreview(reader.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setCardImagePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setCardImage(null);
    setCardImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for file upload
      const formData = new FormData();
      const account = userBanks.find(el => el.number === selectedAccount);


      formData.append('assetType', 'giftcard');
      formData.append("assetId", selectedCard.id);
      formData.append('transactionType', 'sell');
      formData.append("usdAmount", amount);
      formData.append("cardNum", cardNumber);
      formData.append("receivingAccount", JSON.stringify(account));
      if (cardImage) {
        formData.append("cardImage", cardImage);
      }

      // Send data to backend
      const response = await axios.post("api/v1/transactions", formData);

      if (response.data.status === "success") {
        setStage("confirmation");
        setTransaction(response.data.data.transaction);
        toast.success("Gift card submitted successfully!");
      } else {
        toast.error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedCard(null);
    setAmount("");
    setCardNumber("");
    setSelectedAccount("");
    setCardImage(null);
    setCardImagePreview(null);
    setStage("select");
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      {/* Top reference element for scrolling */}
      <div ref={topRef} className="absolute top-0"></div>
      <div className="">
        <ProgressStepper steps={steps} currentStep={stage} />

        {/* Back button for stages after select */}
        {stage !== "select" && (
          <button
            onClick={resetProcess}
            className="flex items-center text-primary-dark dark:text-primary-light mb-6 hover:underline transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Gift Cards
          </button>
        )}

        {/* Render the appropriate stage component */}
        {stage === "select" && (
          <CardSelectionStage
            cards={cards}
            processing={processing}
            onCardSelect={handleCardSelect}
            title="Sell Gift Card"
            description="Select the gift card you want to sell"
          />
        )}

        {stage === "form" && selectedCard && (
          <SellFormStage
            selectedCard={selectedCard}
            amount={amount}
            onAmountChange={setAmount}
            cardNumber={cardNumber}
            onCardNumberChange={setCardNumber}
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            userAccounts={userBanks}
            cardImage={cardImage}
            cardImagePreview={cardImagePreview}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onSubmit={handleSubmit}
            calculateNairaAmount={calculateNairaAmount}
            isSubmitting={isSubmitting}
          />
        )}

        {stage === "confirmation" && (
          <SellConfirmationStage
            selectedCard={selectedCard}
            amount={amount}
            nairaAmount={calculateNairaAmount()}
            selectedAccount={selectedAccount}
            userAccounts={userBanks}
            cardImagePreview={cardImagePreview}
            onReset={resetProcess}
            transaction={transaction}
          />
        )}
      </div>
    </div>
  );
};

export default SellGiftcard;