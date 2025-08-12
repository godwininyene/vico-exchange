import { useState, useEffect } from 'react';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiTrendingUp, 
  FiArrowUp, 
  FiArrowDown,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiCheck,
  FiX,
  FiDownload
} from 'react-icons/fi';
import { BsCurrencyExchange } from 'react-icons/bs';

const Transactions = () => {
  // Enhanced transaction data with admin-specific fields
  const allTransactions = [
    { 
      id: 'TX-78901',
      user: 'John Doe',
      userEmail: 'john@example.com',
      type: 'deposit', 
      amount: 24500, 
      description: 'Amazon Gift Card Sale', 
      date: '2023-06-15 09:30:45',
      category: 'giftcard',
      status: 'completed',
      transactionType: 'sell',
      paymentProof: 'https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg',
      adminActions: []
    },
    { 
      id: 'TX-78902',
      user: 'Jane Smith',
      userEmail: 'jane@example.com',
      type: 'withdrawal', 
      amount: 0.05, 
      description: 'BTC Purchase', 
      date: '2023-06-15 10:15:22',
      category: 'crypto',
      status: 'pending',
      transactionType: 'buy',
      paymentProof: 'https://example.com/proof2.jpg',
      adminActions: []
    },
    { 
      id: 'TX-78903',
      user: 'Mike Johnson',
      userEmail: 'mike@example.com',
      type: 'deposit', 
      amount: 15000, 
      description: 'Google Play Gift Card Sale', 
      date: '2023-06-14 14:45:10',
      category: 'giftcard',
      status: 'pending',
      transactionType: 'sell',
      paymentProof: 'https://example.com/proof3.jpg',
      adminActions: []
    },
    { 
      id: 'TX-78904',
      user: 'Sarah Williams',
      userEmail: 'sarah@example.com',
      type: 'withdrawal', 
      amount: 1.2, 
      description: 'ETH Sale', 
      date: '2023-06-14 16:20:33',
      category: 'crypto',
      status: 'completed',
      transactionType: 'sell',
      paymentProof: 'https://example.com/proof4.jpg',
      adminActions: []
    },
    { 
      id: 'TX-78905',
      user: 'David Brown',
      userEmail: 'david@example.com',
      type: 'withdrawal', 
      amount: 50000, 
      description: 'Bank Withdrawal', 
      date: '2023-06-13 11:05:17',
      category: 'fiat',
      status: 'declined',
      transactionType: 'withdraw',
      paymentProof: null,
      adminActions: [
        { action: 'declined', admin: 'Admin1', date: '2023-06-13 11:30:00', reason: 'Insufficient balance' }
      ]
    },
    { 
      id: 'TX-78906',
      user: 'Emily Davis',
      userEmail: 'emily@example.com',
      type: 'deposit', 
      amount: 75000, 
      description: 'Bank Deposit', 
      date: '2023-06-12 13:30:45',
      category: 'fiat',
      status: 'completed',
      transactionType: 'deposit',
      paymentProof: null,
      adminActions: [
        { action: 'approved', admin: 'Admin2', date: '2023-06-12 14:00:00' }
      ]
    },
  ];

  // State for filters, pagination, and modal
  const [transactions, setTransactions] = useState(allTransactions);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
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
    setCurrentPage(1);
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
      case 'declined':
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
          : type === 'sell'
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>
        {type === 'buy' ? 'Buy' : type === 'sell' ? 'Sell' : type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Open transaction details modal
  const openTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setDeclineReason('');
  };

  // Approve transaction
  const approveTransaction = () => {
    // In a real app, you would make an API call here
    const updatedTransactions = allTransactions.map(tx => 
      tx.id === selectedTransaction.id 
        ? { 
            ...tx, 
            status: 'completed',
            adminActions: [...tx.adminActions, { action: 'approved', admin: 'Admin', date: new Date().toISOString() }]
          }
        : tx
    );
    
    setTransactions(updatedTransactions);
    setSelectedTransaction({ ...selectedTransaction, status: 'completed' });
    closeModal();
  };

  // Decline transaction
  const declineTransaction = () => {
    if (!declineReason) {
      alert('Please enter a reason for declining');
      return;
    }

    // In a real app, you would make an API call here
    const updatedTransactions = allTransactions.map(tx => 
      tx.id === selectedTransaction.id 
        ? { 
            ...tx, 
            status: 'declined',
            adminActions: [...tx.adminActions, { 
              action: 'declined', 
              admin: 'Admin', 
              date: new Date().toISOString(),
              reason: declineReason
            }]
          }
        : tx
    );
    
    setTransactions(updatedTransactions);
    setSelectedTransaction({ ...selectedTransaction, status: 'declined' });
    closeModal();
  };

  return (
    <div className="pb-10">
      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Transaction Details - {selectedTransaction.id}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Transaction Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">User</p>
                      <p className="text-gray-800 dark:text-white">{selectedTransaction.user} ({selectedTransaction.userEmail})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                      <p className="text-gray-800 dark:text-white">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                      <p className={`font-medium ${
                        selectedTransaction.type === 'deposit' 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {selectedTransaction.type === 'deposit' ? '+' : '-'}
                        {selectedTransaction.category === 'crypto' 
                          ? `${selectedTransaction.amount} ${selectedTransaction.description.split(' ')[0]}`
                          : `₦${selectedTransaction.amount.toLocaleString()}`
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="text-gray-800 dark:text-white">{formatDate(selectedTransaction.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <StatusBadge status={selectedTransaction.status} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Details</h3>
                  {selectedTransaction.paymentProof ? (
                    <>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Payment Proof</p>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <img 
                          src={selectedTransaction.paymentProof} 
                          alt="Payment proof" 
                          className="w-full h-auto rounded"
                        />
                        <div className="mt-4 flex justify-end">
                          <a 
                            href={selectedTransaction.paymentProof} 
                            download
                            className="flex items-center text-primary-dark dark:text-primary-light hover:underline"
                          >
                            <FiDownload className="mr-1" /> Download
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No payment proof required for this transaction</p>
                  )}
                </div>
              </div>

              {selectedTransaction.adminActions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Admin Actions</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    {selectedTransaction.adminActions.map((action, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-800 dark:text-white">
                            {action.action === 'approved' ? 'Approved' : 'Declined'}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(action.date)}
                          </span>
                        </div>
                        {action.admin && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">By {action.admin}</p>
                        )}
                        {action.reason && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            <span className="font-medium">Reason:</span> {action.reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
                {selectedTransaction.status === 'pending' && (
                  <>
                    <button
                      onClick={approveTransaction}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center"
                    >
                      <FiCheck className="mr-2" /> Approve Transaction
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        placeholder="Reason for declining..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <button
                      onClick={declineTransaction}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center"
                    >
                      <FiX className="mr-2" /> Decline Transaction
                    </button>
                  </>
                )}
                {selectedTransaction.status === 'completed' && (
                  <button
                    onClick={declineTransaction}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center"
                  >
                    <FiX className="mr-2" /> Reverse Transaction
                  </button>
                )}
                {selectedTransaction.status === 'declined' && (
                  <button
                    onClick={approveTransaction}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center"
                  >
                    <FiCheck className="mr-2" /> Approve Transaction
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


       {/* Header and Actions */}
        <div className="bg-white dark:bg-gray-900 py-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transaction Management</h1>
                    <p className="text-gray-600 dark:text-gray-300">View and manage all transactions</p>
                </div>
            </div>
        </div>

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
                <option value="fiat">Fiat Transactions</option>
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
                <option value="all">All Types</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
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
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
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
                        ) : transaction.category === 'crypto' ? (
                          <BsCurrencyExchange size={20} />
                        ) : (
                          <FiDollarSign size={20} />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{transaction.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</p>
                          <TransactionTypeBadge type={transaction.transactionType} />
                          <StatusBadge status={transaction.status} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-right ${
                        transaction.type === 'deposit' 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        <p className="font-medium">
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {transaction.category === 'crypto' 
                            ? `${transaction.amount} ${transaction.description.split(' ')[0]}`
                            : `₦${transaction.amount.toLocaleString()}`
                          }
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {transaction.user}
                        </p>
                      </div>
                      <button
                        onClick={() => openTransactionDetails(transaction)}
                        className="p-2 text-primary-dark dark:text-primary-light hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 rounded-full"
                        title="View details"
                      >
                        <FiEye size={20} />
                      </button>
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