import { useState, useRef } from 'react';
import { FiArrowLeft, FiUpload, FiCheckCircle, FiX, FiClock } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

// Mock crypto data
const cryptocurrencies = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', rate: 1700 },
  { id: 2, name: 'Ethereum', symbol: 'ETH', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', rate: 3000000 },
  { id: 3, name: 'BNB', symbol: 'BNB', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', rate: 40000 },
  { id: 4, name: 'Solana', symbol: 'SOL', image: 'https://cryptologos.cc/logos/solana-sol-logo.png', rate: 70000 },
  { id: 5, name: 'XRP', symbol: 'XRP', image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', rate: 500 },
  { id: 6, name: 'Cardano', symbol: 'ADA', image: 'https://cryptologos.cc/logos/cardano-ada-logo.png', rate: 450 },
];

// Mock bank account
const bankAccount = {
  name: 'VICO EXCHANGE LTD',
  number: '1234567890',
  bank: 'Zenith Bank',
};

const BuyCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [stage, setStage] = useState('select'); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCrypto) return 0;
    return (parseFloat(amount) * selectedCrypto.rate).toFixed(2);
  };

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
    setStage('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please enter a valid wallet address');
      return;
    }
    setStage('payment');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
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
      crypto: selectedCrypto,
      amount,
      nairaAmount: calculateNairaAmount(),
      walletAddress,
      paymentProof: file
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStage('confirmation');
    }, 2000);
  };

  const resetProcess = () => {
    setSelectedCrypto(null);
    setAmount('');
    setWalletAddress('');
    setStage('select');
    setFile(null);
    setFilePreview(null);
  };

  // Progress steps
  const steps = [
    { id: 'select', name: 'Select Crypto' },
    { id: 'form', name: 'Enter Details' },
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
            Back to Cryptocurrencies
          </button>
        )}

        {/* Stage 1: Select Crypto */}
        {stage === 'select' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Buy Cryptocurrency</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Select a cryptocurrency to purchase</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cryptocurrencies.map((crypto) => (
                <div 
                  key={crypto.id}
                  onClick={() => handleCryptoSelect(crypto)}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col items-center"
                >
                  <img 
                    src={crypto.image} 
                    alt={crypto.name} 
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <h3 className="font-medium text-gray-800 dark:text-white text-center">{crypto.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rate: ₦{crypto.rate.toLocaleString()}/{crypto.symbol}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2: Enter Amount and Wallet Address */}
        {stage === 'form' && selectedCrypto && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCrypto.image} 
                alt={selectedCrypto.name} 
                className="w-12 h-12 object-contain mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Buy {selectedCrypto.name}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount in USD
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">USD</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-12 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    placeholder="0.00"
                    step="0.00000001"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your {selectedCrypto.name} Wallet Address
                </label>
                <input
                  type="text"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder={`Paste your ${selectedCrypto.name} wallet address`}
                  required
                />
                <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                  Warning: Ensure this is a {selectedCrypto.name} wallet address to avoid loss of funds
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{selectedCrypto.rate.toLocaleString()} per 1$</span>
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
                disabled={!amount || isNaN(amount) || !walletAddress}
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {/* Stage 3: Payment Instructions */}
        {stage === 'payment' && selectedCrypto && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCrypto.image} 
                alt={selectedCrypto.name} 
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

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Crypto Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Cryptocurrency:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{selectedCrypto.name} ({selectedCrypto.symbol})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{amount}$</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Receiving Wallet:</span>
                    <span className="font-medium text-gray-800 dark:text-white break-all">{walletAddress}</span>
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
                  <span className="text-gray-600 dark:text-gray-300">Cryptocurrency:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{selectedCrypto?.name} ({selectedCrypto?.symbol})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{amount}$</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Paid:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{calculateNairaAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Receiving Wallet:</span>
                  <span className="font-medium text-gray-800 dark:text-white break-all">{walletAddress}</span>
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
                Your cryptocurrency will be sent to your wallet within 1-2 hours after verification.
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

export default BuyCrypto;