import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataFilters from '../../components/DataFilters';
import VtuTransactionDetails from '../../components/VtuTransactionDetails';
import Modal from '../../components/Modal';
import { vtuTransactionStatusFilterOptions, vtTransactionFilterOptions } from '../../data';
import axios from '../../lib/axios'
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import VtuTransactionsList from '../../components/VtuTransactionsList';

const VtuTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isApproving, setIsApproving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [loading, setLoading] = useState(false); 
  // State for filters
  const [assetFilter, setAssetFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {pagination, updatePagination} = usePagination();

   // Fetch VTU transactions
  const fetchTransactions = async (
    page = 1,
    search = '',
    status = '',
    transactionType = ''
  ) => {
    setLoading(true);

    let url = `api/v1/transactions/vtu?page=${page}&limit=${pagination.perPage}`;

    if (search) url += `&search=${search}`;
    if (status) url += `&status=${status}`;
    if (transactionType) url += `&type=${transactionType}`;

    try {
      const res = await axios.get(url);

      if (res.data.status === 'success') {
        setTransactions(res.data.data.transactions);

        updatePagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch VTU transactions');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when filters change
   useEffect(() => {
    fetchTransactions(
      1,
      debouncedSearchQuery,
      statusFilter === 'all' ? '' : statusFilter,
      transactionTypeFilter === 'all' ? '' : transactionTypeFilter
    );
  }, [debouncedSearchQuery, statusFilter, transactionTypeFilter]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleTransactionTypeChange = (transactionType) => {
    setTransactionTypeFilter(transactionType);
  };

  const handlePageChange = (page) => {
    fetchTransactions(
      page, 
      searchQuery, 
      statusFilter === 'all' ? '' : statusFilter,
      assetFilter === 'all' ? '' : assetFilter,
      transactionTypeFilter === 'all' ? '' : transactionTypeFilter
    );
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
  };

  

  return (
    <div className="pb-10">
      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          header={`Transaction Details - ${selectedTransaction.providerRef || 'N/A'}`}
        >
          <VtuTransactionDetails transaction={selectedTransaction} />
        </Modal>
      )}

      {/* Header and Actions */}
      <PageHeader 
        primaryHeader={'Transaction Management'}
        secondaryHeader={'View and manage all vtu transactions'}
      />

      {/* Filters */}
      {/* Filters */}
      <DataFilters
        filterHeader={'VTU Transactions'}
        searchQuery={searchQuery}
        onSearchSubmit={(e) => e.preventDefault()}
        filters={[
          {
            type: 'input',
            placeholder: 'Search transactions...',
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
          },
          {
            type: 'select',
            label: 'Transaction Type',
            value: transactionTypeFilter,
            onChange: (e) => handleTransactionTypeChange(e.target.value),
            options: vtTransactionFilterOptions, // airtime, data, electricity, cable, exam
          },
          {
            type: 'select',
            label: 'Status',
            value: statusFilter,
            onChange: (e) => handleStatusChange(e.target.value),
            options: vtuTransactionStatusFilterOptions,
          },
        ]}
      />
     
     
      {loading ? (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-96 flex items-center justify-center">
            <Loader size={8} />
          </div>
        </div>
      ) : (
        <VtuTransactionsList
          transactions={transactions}
          openTransactionDetails={openTransactionDetails}
          pagination={pagination}
          onPageChange={handlePageChange}
          context='admin'
        />
       
      )}
    </div>
  );
};

export default VtuTransactions;