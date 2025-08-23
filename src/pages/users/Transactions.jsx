import { useState, useEffect } from 'react';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiTrendingUp, 
  FiArrowUp, 
  FiArrowDown,
  FiFilter,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { BsCurrencyExchange } from 'react-icons/bs';
import axios from './../../lib/axios'

const Transactions = () => {
  // Enhanced transaction data with buy/sell type
  const allTransactions = [
    { 
      id: 1, 
      type: 'deposit', 
      amount: 500, 
      description: 'Gift Card Sale', 
      date: '2023-05-15',
      category: 'giftcard',
      status: 'completed',
      transactionType: 'sell'
    },
    { 
      id: 2, 
      type: 'withdrawal', 
      amount: 120, 
      description: 'BTC Purchase', 
      date: '2023-05-14',
      category: 'crypto',
      status: 'completed',
      transactionType: 'buy'
    },
    { 
      id: 3, 
      type: 'deposit', 
      amount: 750, 
      description: 'ETH Sale', 
      date: '2023-05-12',
      category: 'crypto',
      status: 'pending',
      transactionType: 'sell'
    },
    { 
      id: 4, 
      type: 'withdrawal', 
      amount: 300, 
      description: 'Amazon Gift Card Purchase', 
      date: '2023-05-10',
      category: 'giftcard',
      status: 'failed',
      transactionType: 'buy'
    },
    { 
      id: 5, 
      type: 'deposit', 
      amount: 200, 
      description: 'BTC Sale', 
      date: '2023-05-08',
      category: 'crypto',
      status: 'completed',
      transactionType: 'sell'
    },
    { 
      id: 6, 
      type: 'withdrawal', 
      amount: 150, 
      description: 'Google Play Gift Card Purchase', 
      date: '2023-05-05',
      category: 'giftcard',
      status: 'completed',
      transactionType: 'buy'
    },
  ];

  const fetchTransactions = async()=>{
    try{
      const res = await axios.get('api/v1/transactions');
      console.log(res.data.data.transactions);
      

    }catch(err){
    
    }
  }

  // State for filters and pagination
  const [transactions, setTransactions] = useState(allTransactions);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 4;

  // Apply filters
  useEffect(() => {
    let filtered = allTransactions;
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (transactionTypeFilter !== 'all') {
      filtered = filtered.filter(t => t.transactionType === transactionTypeFilter);
    }
    
    setTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    fetchTransactions()
  }, [categoryFilter, statusFilter, transactionTypeFilter]);

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    
    switch(status) {
      case 'completed':
        bgColor = 'bg-green-100 dark:bg-green-900/30';
        textColor = 'text-green-800 dark:text-green-200';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
        textColor = 'text-yellow-800 dark:text-yellow-200';
        break;
      case 'failed':
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-800 dark:text-red-200';
        break;
      default:
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-200';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Transaction type badge component
  const TransactionTypeBadge = ({ type }) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'buy' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
      }`}>
        {type === 'buy' ? 'Buy' : 'Sell'}
      </span>
    );
  };

  return (
    <div className="pb-10">
      {/* Filters */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <FiFilter className="mr-2" /> Transaction Filters
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Asset Type
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="giftcard">Gift Cards</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transaction Type
              </label>
              <select
                id="transactionType"
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
              >
                <option value="all">Buy & Sell</option>
                <option value="buy">Buy Only</option>
                <option value="sell">Sell Only</option>
              </select>
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Transaction History</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, transactions.length)} of {transactions.length} transactions
            </p>
          </div>
          
          {currentTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {transaction.category === 'giftcard' ? (
                          <FiCreditCard size={20} />
                        ) : (
                          <BsCurrencyExchange size={20} />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{transaction.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                          <TransactionTypeBadge type={transaction.transactionType} />
                          <StatusBadge status={transaction.status} />
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${
                      transaction.type === 'deposit' 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      <p className="font-medium">
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {transaction.type === 'deposit' ? 'Credit' : 'Debit'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No transactions found matching your filters</p>
            </div>
          )}

          {/* Pagination */}
          {transactions.length > transactionsPerPage && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;