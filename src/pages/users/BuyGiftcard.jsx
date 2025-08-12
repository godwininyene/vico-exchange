import { useState, useRef } from 'react';
import { FiArrowLeft, FiUpload, FiCheckCircle, FiX, FiClock } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

// Mock data - replace with your actual gift cards
const giftCards = [
  { id: 1, name: 'Amazon', image: 'data:image/png;base64,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', rate: 500 },
  { id: 2, name: 'Apple', image: 'https://i5.walmartimages.com/asr/7598c92b-4c69-4753-b8d6-2043ebc2ac65.25f87118ef54f92f46416da5ba49d11c.png', rate: 480 },
  { id: 3, name: 'Google Play', image: 'https://d13ms5efar3wc5.cloudfront.net/eyJidWNrZXQiOiJpbWFnZXMtY2Fycnkxc3QtcHJvZHVjdHMiLCJrZXkiOiI3NWY5MjdkYi1iMmFhLTQ5MzctOTBjMi0wZDVmNDEwYzA4MGQucG5nLndlYnAiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDB9fSwid2VicCI6eyJxdWFsaXR5Ijo3NX19', rate: 1000 },
  { id: 4, name: 'Steam', image: 'https://giftnix-product-images.s3.us-west-2.amazonaws.com/scd/200-100x2-steam-digital-gift-card-email-delivery-2x2', rate: 490 },
  { id: 5, name: 'iTunes', image: 'data:image/jpeg;base64,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', rate: 475 },
  { id: 6, name: 'Sephora', image: 'data:image/jpeg;base64,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', rate: 460 },
];


// Mock bank account - replace with your actual account
const bankAccount = {
  name: 'VICO EXCHANGE LTD',
  number: '1234567890',
  bank: 'Zenith Bank',
};

const BuyGiftcard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('select'); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCard) return 0;
    return (parseFloat(amount) * selectedCard.rate).toFixed(2);
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setStage('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStage('payment');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaymentConfirmation = () => {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    console.log({
      card: selectedCard,
      amount,
      nairaAmount: calculateNairaAmount(),
      paymentProof: file
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStage('confirmation');
    }, 2000);
  };

  const resetProcess = () => {
    setSelectedCard(null);
    setAmount('');
    setStage('select');
    setFile(null);
    setFilePreview(null);
  };

  // Progress steps
  const steps = [
    { id: 'select', name: 'Select Card' },
    { id: 'form', name: 'Enter Amount' },
    { id: 'payment', name: 'Make Payment' },
    { id: 'confirmation', name: 'Confirmation' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === stage);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="">
        {/* Progress Indicator */}
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-4 w-full">
              {steps.map((step, index) => (
                <li key={step.id} className="flex-1">
                  {index < currentStepIndex ? (
                    <div className="group flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-dark dark:bg-primary-light text-white">
                        <FaCheck className="w-4 h-4" />
                      </span>
                      <span className="mt-2 text-sm font-medium text-primary-dark dark:text-primary-light">
                        {step.name}
                      </span>
                    </div>
                  ) : index === currentStepIndex ? (
                    <div className="flex flex-col items-center" aria-current="step">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary-dark dark:border-primary-light bg-white dark:bg-gray-800">
                        <span className="text-primary-dark dark:text-primary-light">{index + 1}</span>
                      </span>
                      <span className="mt-2 text-sm font-medium text-primary-dark dark:text-primary-light">
                        {step.name}
                      </span>
                    </div>
                  ) : (
                    <div className="group flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        <span>{index + 1}</span>
                      </span>
                      <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {step.name}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Back button for stages after select */}
        {(stage !== 'select') && (
          <button 
            onClick={resetProcess}
            className="flex items-center text-primary-dark dark:text-primary-light mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Back to Gift Cards
          </button>
        )}

        {/* Stage 1: Select Gift Card */}
        {stage === 'select' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Buy Gift Card</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Select a gift card to purchase</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {giftCards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => handleCardSelect(card)}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col items-center"
                >
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <h3 className="font-medium text-gray-800 dark:text-white text-center">{card.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rate: ₦{card.rate}/$</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2: Enter Amount */}
        {stage === 'form' && selectedCard && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.name} 
                className="w-12 h-12 object-contain mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Buy {selectedCard.name} Gift Card</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount in USD
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{selectedCard.rate} per $1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">You'll pay:</span>
                  <span className="font-bold text-lg text-primary-dark dark:text-primary-light">
                    ₦{calculateNairaAmount()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                disabled={!amount || isNaN(amount)}
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {/* Stage 3: Payment Instructions */}
        {stage === 'payment' && selectedCard && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.name} 
                className="w-12 h-12 object-contain mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Complete Your Purchase</h1>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Please send only the sum of <span className="font-bold">₦{calculateNairaAmount()}</span> to the account below.
                  Do not send more or less than this amount.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Bank Account Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Account Name:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{bankAccount.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Account Number:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{bankAccount.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Bank Name:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{bankAccount.bank}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Ensure to take a screenshot/snapshot of the transfer confirmation page and upload it below for verification.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Payment Proof
                </label>
                
                {filePreview ? (
                  <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <img 
                      src={filePreview} 
                      alt="Payment proof" 
                      className="max-h-64 mx-auto rounded"
                    />
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <FiX className="text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                ) : file ? (
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200">{file.name}</p>
                    <button
                      onClick={handleRemoveFile}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <FiUpload className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        PNG, JPG, or JPEG
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      ref={fileInputRef}
                    />
                  </label>
                )}
              </div>

              <button
                onClick={handlePaymentConfirmation}
                className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                disabled={!file || isSubmitting}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <FiCheckCircle className="mr-2" />
                    I Have Sent the Money
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stage 4: Confirmation Screen */}
        {stage === 'confirmation' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
              <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">Payment Received!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We've received your payment of <span className="font-bold">₦{calculateNairaAmount()}</span> and we're processing your order.
            </p>

            <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Gift Card:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{selectedCard?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                  <span className="font-medium text-gray-800 dark:text-white">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Paid:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{calculateNairaAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transaction Reference:</span>
                  <span className="font-medium text-gray-800 dark:text-white">VICO-{Math.floor(Math.random() * 1000000)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <FiClock className="text-yellow-600 dark:text-yellow-400 mr-2" />
              <p className="text-yellow-700 dark:text-yellow-300">
                Your gift card will be delivered within 1-2 hours after verification.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Payment Proof</h3>
              {filePreview ? (
                <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                  <img 
                    src={filePreview} 
                    alt="Payment proof" 
                    className="w-full h-auto rounded"
                  />
                </div>
              ) : (
                <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-300">{file?.name}</p>
                </div>
              )}
            </div>

            <button
              onClick={resetProcess}
              className="mt-8 w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyGiftcard;