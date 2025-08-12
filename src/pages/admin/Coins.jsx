import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiX,
  FiCheck
} from 'react-icons/fi';
import { BsCurrencyBitcoin, BsWallet2 } from 'react-icons/bs';

const Coins = () => {
  // Mock data - replace with API calls
  const initialCoins = [
    {
      id: 'BTC-001',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      rate: 58000000,
      status: 'active'
    },
    {
      id: 'ETH-002',
      name: 'Ethereum',
      symbol: 'ETH',
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      rate: 2900000,
      status: 'active'
    },
    {
      id: 'USDT-003',
      name: 'Tether',
      symbol: 'USDT',
      image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      walletAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      rate: 1500,
      status: 'active'
    },
    {
      id: 'BNB-004',
      name: 'Binance Coin',
      symbol: 'BNB',
      image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      walletAddress: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23',
      rate: 350000,
      status: 'inactive'
    },
  ];

  // State management
  const [coins, setCoins] = useState(initialCoins);
  const [filteredCoins, setFilteredCoins] = useState(initialCoins);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCoin, setNewCoin] = useState({
    name: '',
    symbol: '',
    image: '',
    walletAddress: '',
    rate: '',
    status: 'active'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 4;

  // Apply filters
  useEffect(() => {
    let filtered = coins;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(coin => coin.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(coin => 
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query) ||
        coin.id.toLowerCase().includes(query))
    }
    
    setFilteredCoins(filtered);
    setCurrentPage(1);
  }, [coins, statusFilter, searchQuery]);

  // Pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open modal for adding new coin
  const openAddModal = () => {
    setCurrentCoin(null);
    setIsEditMode(false);
    setNewCoin({
      name: '',
      symbol: '',
      image: '',
      walletAddress: '',
      rate: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  // Open modal for editing coin
  const openEditModal = (coin) => {
    setCurrentCoin(coin);
    setIsEditMode(true);
    setNewCoin({...coin});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCoin(null);
    setIsEditMode(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoin({...newCoin, [name]: value});
  };

  // Save coin (add or edit)
  const saveCoin = () => {
    if (!newCoin.name || !newCoin.symbol || !newCoin.walletAddress || !newCoin.rate) {
      alert('Please fill all required fields');
      return;
    }

    if (isEditMode) {
      // Update existing coin
      const updatedCoins = coins.map(coin => 
        coin.id === currentCoin.id ? { ...newCoin, id: currentCoin.id } : coin
      );
      setCoins(updatedCoins);
    } else {
      // Add new coin
      const newId = `${newCoin.symbol.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setCoins([...coins, { ...newCoin, id: newId }]);
    }
    
    closeModal();
  };

  // Delete coin
  const deleteCoin = (id) => {
    if (window.confirm('Are you sure you want to delete this cryptocurrency?')) {
      setCoins(coins.filter(coin => coin.id !== id));
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
      }`}>
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Format large numbers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value).replace('NGN', '₦');
  };

  return (
    <div className="pb-10">
      {/* Add/Edit Coin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isEditMode ? 'Edit Cryptocurrency' : 'Add New Cryptocurrency'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Coin Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCoin.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="e.g. Bitcoin, Ethereum"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Symbol *
                </label>
                <input
                  type="text"
                  name="symbol"
                  value={newCoin.symbol}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="e.g. BTC, ETH"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Wallet Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsWallet2 className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="walletAddress"
                    value={newCoin.walletAddress}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    placeholder="Enter wallet address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rate (₦ per coin) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="rate"
                    value={newCoin.rate}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    placeholder="58000000"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={newCoin.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="https://example.com/coin-image.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newCoin.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveCoin}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center"
              >
                <FiCheck className="mr-2" /> {isEditMode ? 'Update' : 'Save'} Coin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Actions */}
      <div className="bg-white dark:bg-gray-900 py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Cryptocurrencies</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage supported cryptocurrencies</p>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center justify-center"
          >
            <FiPlus className="mr-2" /> Add New Coin
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cryptocurrencies Table */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Supported Cryptocurrencies</h2>
          </div>
          
          {currentCoins.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentCoins.map((coin) => (
                <div key={coin.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center">
                      {coin.image ? (
                        <img 
                          src={coin.image} 
                          alt={coin.name} 
                          className="w-10 h-10 object-contain rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <BsCurrencyBitcoin className="text-gray-500 dark:text-gray-400" size={20} />
                        </div>
                      )}
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{coin.name} ({coin.symbol})</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            {formatCurrency(coin.rate)}
                          </span>
                          <StatusBadge status={coin.status} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <BsWallet2 className="mr-1" />
                        <span className="truncate max-w-xs">{coin.walletAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(coin)}
                          className="p-2 text-primary-dark dark:text-primary-light hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 rounded-lg"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteCoin(coin.id)}
                          className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No cryptocurrencies found matching your criteria</p>
            </div>
          )}

          {/* Pagination */}
          {filteredCoins.length > coinsPerPage && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstCoin + 1} to {Math.min(indexOfLastCoin, filteredCoins.length)} of {filteredCoins.length} coins
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FiChevronLeft className="mr-1" /> Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === number 
                          ? 'bg-primary-dark text-white dark:bg-primary-light'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coins;