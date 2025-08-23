import { useState, useRef, useEffect } from 'react';
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

// Mock user bank accounts
const userAccounts = [
  { id: 1, bank: 'Zenith Bank', number: '1234567890' },
  { id: 2, bank: 'GTBank', number: '0987654321' },
  { id: 3, bank: 'Access Bank', number: '5678901234' },
];

// Mock wallet details
const companyWallet = {
  btc: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
  eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  bnb: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23',
  sol: 'HN5XQ7K7XZKU5KXJ7XKXJ7XKXJ7XKXJ7XKXJ',
  xrp: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh',
  ada: 'Ae2tdPwUPEZ6RUCnjAHFfn97U2VgLKvqL3zT6KknDCH6qR7TajxJ8k3hF2'
};

const SellCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedCoinRate, setSelectedCoinRate] = useState(null);
  const [amount, setAmount] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [stage, setStage] = useState('select'); // 'select', 'form', 'payment', 'confirmation'
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loadingCryptoRate, setLoadingCryptoRate] = useState(false);

  // Fetch crypto rate when a cryptocurrency is selected
  useEffect(() => {
    const fetchCryptoRate = async () => {
      if (!selectedCrypto) return;
      
      setLoadingCryptoRate(true);
      const id = selectedCrypto.name.toLowerCase();
      
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
        );

        if (!res.ok) throw new Error('Failed to fetch from CoinGecko');

        const data = await res.json();
        if (!data || !data[id]) {
          alert("No pricing data found for this cryptocurrency.");
          return;
        }

        const priceInUSD = data[id].usd;
        setSelectedCoinRate(priceInUSD);
      } catch (err) {
        console.error('Failed to fetch crypto price', err);
        alert('Failed to fetch current cryptocurrency rate');
        // Fallback to the mock rate if API fails
        setSelectedCoinRate(selectedCrypto.rate);
      } finally {
        setLoadingCryptoRate(false);
      }
    };

    fetchCryptoRate();
  }, [selectedCrypto]);

  const calculateNairaAmount = () => {
    if (!amount || isNaN(amount) || !selectedCrypto) return 0;
    return (parseFloat(amount) * selectedCrypto.rate);
  };

  const calculateCoinAmount = () => {
    if (!amount || isNaN(amount) || !selectedCoinRate || selectedCoinRate === 0) return 0;
    return parseFloat(amount) / selectedCoinRate;
  };

  // Update coin amount when amount or rate changes
  useEffect(() => {
    setCoinAmount(calculateCoinAmount());
  }, [amount, selectedCoinRate]);

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
    setStage('form');
    // Set wallet address based on selected crypto
    setWalletAddress(companyWallet[crypto.symbol.toLowerCase()]);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      alert('Please select an account to receive payment');
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
      coinAmount: calculateCoinAmount(),
      account: userAccounts.find(acc => acc.id === parseInt(selectedAccount)),
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
    setSelectedCoinRate(null);
    setAmount('');
    setCoinAmount('');
    setStage('select');
    setFile(null);
    setFilePreview(null);
    setSelectedAccount('');
  };

  // Progress steps
  const steps = [
    { id: 'select', name: 'Select Crypto' },
    { id: 'form', name: 'Enter Details' },
    { id: 'payment', name: 'Send Coin' },
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Sell Cryptocurrency</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Select a cryptocurrency to sell</p>
            
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

        {/* Stage 2: Enter Amount and Account */}
        {stage === 'form' && selectedCrypto && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img 
                src={selectedCrypto.image} 
                alt={selectedCrypto.name} 
                className="w-12 h-12 object-contain mr-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sell {selectedCrypto.name}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount in USDT
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₦</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-8 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="coinAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount in {selectedCrypto.symbol}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="coinAmount"
                    value={loadingCryptoRate ? "Loading..." : coinAmount.toFixed(8)}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {selectedCrypto.symbol}
                  </span>
                </div>
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

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                   <span className="font-medium text-gray-800 dark:text-white">₦{selectedCrypto.rate.toLocaleString()} per {selectedCrypto.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">You'll receive:</span>
                  <span className="font-bold text-lg text-primary-dark dark:text-primary-light">
                    ₦{calculateNairaAmount().toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                disabled={!amount || isNaN(amount) || !selectedAccount || loadingCryptoRate}
              >
                {loadingCryptoRate ? 'Loading rates...' : 'Continue to Payment'}
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Complete Your Sale</h1>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Please send exactly <span className="font-bold">{coinAmount.toFixed(8)} {selectedCrypto.symbol}</span> to the wallet below.
                  Do not send more or less than this amount.
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  Warning: Ensure you're sending {selectedCrypto.name} ({selectedCrypto.symbol}) to this address only.
                  Sending other cryptocurrencies will result in permanent loss.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Wallet Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Cryptocurrency:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{selectedCrypto.name} ({selectedCrypto.symbol})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Amount to send:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{coinAmount.toFixed(8)} {selectedCrypto.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Network:</span>
                    <span className="font-medium text-gray-800 dark:text-white">{selectedCrypto.name} Network</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Wallet Address:</span>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800 dark:text-white break-all mr-2">{walletAddress}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(walletAddress);
                          alert('Address copied to clipboard!');
                        }}
                        className="text-primary-dark dark:text-primary-light hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Receiving Account:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {userAccounts.find(acc => acc.id === parseInt(selectedAccount))?.bank} - 
                      {userAccounts.find(acc => acc.id === parseInt(selectedAccount))?.number}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Amount to receive:</span>
                    <span className="font-medium text-gray-800 dark:text-white">₦{calculateNairaAmount().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  After sending, upload proof of transaction below for verification.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Transaction Proof
                </label>
                
                {filePreview ? (
                  <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <img 
                      src={filePreview} 
                      alt="Transaction proof" 
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
                        PNG, JPG, or PDF (screenshot of transaction)
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
                    I Have Sent the Crypto
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
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">Transaction Received!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We've received your transaction of <span className="font-bold">{coinAmount.toFixed(8)} {selectedCrypto?.symbol}</span> and we're processing your payment.
            </p>

            <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">Transaction Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cryptocurrency:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{selectedCrypto?.name} ({selectedCrypto?.symbol})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount sent:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{coinAmount.toFixed(8)} {selectedCrypto?.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Amount to receive:</span>
                  <span className="font-medium text-gray-800 dark:text-white">₦{calculateNairaAmount().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Receiving Account:</span>
                  <span className="font-medium text-gray-800 dark:text-white break-all">
                    {userAccounts.find(acc => acc.id === parseInt(selectedAccount))?.bank} - 
                    {userAccounts.find(acc => acc.id === parseInt(selectedAccount))?.number}
                  </span>
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
                Your payment will be sent to your account within 1-2 hours after verification.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Transaction Proof</h3>
              {filePreview ? (
                <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                  <img 
                    src={filePreview} 
                    alt="Transaction proof" 
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

export default SellCrypto;