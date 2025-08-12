import { useState, useRef } from 'react';
import { FiArrowLeft, FiUpload, FiCheckCircle, FiX, FiClock, FiDollarSign } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

// Mock data - replace with your actual gift cards
const giftCards = [
  { id: 1, name: 'Amazon', image: 'https://via.placeholder.com/150/FF9900/FFFFFF?text=Amazon', rate: 480 },
  { id: 2, name: 'Apple', image: 'https://via.placeholder.com/150/999999/FFFFFF?text=Apple', rate: 470 },
  { id: 3, name: 'Google Play', image: 'https://via.placeholder.com/150/4285F4/FFFFFF?text=Google', rate: 460 },
  { id: 4, name: 'Steam', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Steam', rate: 475 },
  { id: 5, name: 'iTunes', image: 'https://via.placeholder.com/150/FF5E50/FFFFFF?text=iTunes', rate: 465 },
  { id: 6, name: 'Sephora', image: 'https://via.placeholder.com/150/FF5695/FFFFFF?text=Sephora', rate: 450 },
];

// Mock user bank accounts - replace with actual user accounts
const userAccounts = [
  { id: 1, bank: 'Zenith Bank', number: '1234567890' },
  { id: 2, bank: 'GTBank', number: '0987654321' },
  { id: 3, bank: 'Access Bank', number: '5678901234' },
];

const SellGiftcard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [cardImage, setCardImage] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const [stage, setStage] = useState('select'); // 'select', 'form', 'confirmation'
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCardImage(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    console.log({
      card: selectedCard,
      amount,
      cardNumber,
      account: selectedAccount,
      cardImage,
      nairaAmount: calculateNairaAmount()
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
    setCardNumber('');
    setSelectedAccount('');
    setCardImage(null);
    setCardImagePreview(null);
    setStage('select');
  };

  // Progress steps
  const steps = [
    { id: 'select', name: 'Select Card' },
    { id: 'form', name: 'Enter Details' },
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Sell Gift Card</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Select the gift card you want to sell</p>
            
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

        {/* Stage 2: Enter Details */}
        {stage === 'form' && selectedCard && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.name} 
                className="w-12 h-12 object-contain mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sell {selectedCard.name} Gift Card</h1>
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

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gift Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="Enter gift card number"
                  required
                />
              </div>

              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Receive Payment To
                </label>
                <select
                  id="account"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  required
                >
                  <option value="">Select Account</option>
                  {userAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.bank} - {account.number}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload Gift Card Image
                </label>
                {cardImagePreview ? (
                  <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <img 
                      src={cardImagePreview} 
                      alt="Gift card" 
                      className="max-h-64 mx-auto rounded"
                    />
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <FiX className="text-gray-700 dark:text-gray-300" />
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
                        PNG or JPG (MAX. 5MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*"
                      ref={fileInputRef}
                    />
                  </label>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Current Rate:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{selectedCard.rate} per $1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">You'll receive:</span>
                  <span className="font-bold text-lg text-primary-dark dark:text-primary-light">
                    ₦{calculateNairaAmount()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                disabled={!amount || !cardNumber || !selectedAccount || !cardImage || isSubmitting}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <FiDollarSign className="mr-2" />
                    Sell Gift Card
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Stage 3: Confirmation Screen */}
        {stage === 'confirmation' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
              <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">Gift Card Submitted!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We've received your {selectedCard?.name} gift card worth <span className="font-bold">${amount}</span>.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You'll receive <span className="font-bold text-primary-dark dark:text-primary-light">₦{calculateNairaAmount()}</span> after verification.
            </p>

            <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">Transaction Details</h3>
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
                  <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{selectedCard?.rate}/$1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">You'll Receive:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{calculateNairaAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Payment Account:</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {userAccounts.find(a => a.id === selectedAccount)?.bank} - {userAccounts.find(a => a.id === selectedAccount)?.number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transaction Reference:</span>
                  <span className="font-medium text-gray-800 dark:text-white">VICO-{Math.floor(Math.random() * 1000000)}</span>
                </div>
              </div>
            </div>

            {cardImagePreview && (
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Gift Card Image</h3>
                <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                  <img 
                    src={cardImagePreview} 
                    alt="Gift card" 
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <FiClock className="text-yellow-600 dark:text-yellow-400 mr-2" />
              <p className="text-yellow-700 dark:text-yellow-300">
                Your payment will be processed within 1-2 hours after verification.
              </p>
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

export default SellGiftcard;