import { useState, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "./../../lib/axios";
import { toast } from "react-toastify";
import ProgressStepper from "../../components/ProgressStepper";

// Import stage components
import CardSelectionStage from "../../components/stages/CardSelectionStage";
import AmountFormStage from "../../components/stages/AmountFormStage";
import PaymentStage from "../../components/stages/PaymentStage";
import ConfirmationStage from "../../components/stages/ConfirmationStage";


const BuyGiftcard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState(null);
  const [stage, setStage] = useState("select"); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [transaction, setTransaction] = useState(null); 
  const topRef = useRef(null); // Ref for scrolling to top

  // Progress steps
  const steps = [
    { id: "select", name: "Select Card" },
    { id: "form", name: "Enter Amount" },
    { id: "payment", name: "Make Payment" },
    { id: "confirmation", name: "Confirmation" },
  ];

  // Scroll to top when stage changes to confirmation
  useEffect(() => {
    if (stage === "confirmation" && topRef.current) {
      // Using smooth scroll for better UX
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stage]);

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
    return Number((parseFloat(amount) * selectedCard.cardRate).toFixed(2));
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setStage("form");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStage("payment");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create preview for images
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
      formData.append('assetType', 'giftcard')
      formData.append("assetId", selectedCard.id);
      formData.append("transactionType", "buy");
      formData.append("usdAmount", amount);
      if (file) {
        formData.append("paymentProof", file);
      }

      // Send data to backend
      const response = await axios.post("api/v1/transactions", formData);
      if (response.data.status === "success") {
        setTransaction(response.data.data.transaction);
        setStage("confirmation");
        toast.success("Purchase successful! Your gift card is being processed.");
      } else {
        toast.error(response.data.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(error.response?.data?.message || "An error occurred during purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetProcess = () => {
    setSelectedCard(null);
    setAmount("");
    setStage("select");
    setFile(null);
    setFilePreview(null);
    setTransaction(null); // Reset transaction data
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      {/* Invisible element at the top for scrolling to */}
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
          />
        )}

        {stage === "form" && selectedCard && (
          <AmountFormStage
            selectedCard={selectedCard}
            amount={amount}
            onAmountChange={setAmount}
            onSubmit={handleSubmit}
            calculateNairaAmount={calculateNairaAmount}
          />
        )}

        {stage === "payment" && selectedCard && (
          <PaymentStage
            selectedCard={selectedCard}
            nairaAmount={calculateNairaAmount()}
            file={file}
            filePreview={filePreview}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onPaymentConfirmation={handlePaymentConfirmation}
            isSubmitting={isSubmitting}
          />
        )}

        {stage === "confirmation" && (
          <ConfirmationStage
            selectedCard={selectedCard}
            amount={amount}
            nairaAmount={calculateNairaAmount()}
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

export default BuyGiftcard;