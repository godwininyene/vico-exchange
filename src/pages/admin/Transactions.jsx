import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataFilters from '../../components/DataFilters';
import TransactionDetails from '../../components/TransactionDetails';
import Modal from '../../components/Modal';
import {assetTypeFilterOptions, transactionStatusFilterOptions, transactionFilterOptions} from './../../data'
import TransactionsList from '../../components/TransactionsList';
import axios from './../../lib/axios'
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isApproving, setIsApproving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  // State for filters
  const [assetFilter, setAssetFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {pagination, updatePagination} = usePagination();

  // Fetch transactions with filters
  const fetchTransactions = async(page = 1, search = '', status = '', assetFilter = '', transactionType = '') => {
    let url = `api/v1/transactions?page=${page}&limit=${pagination.perPage}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    if (status && status !== 'all') {
      url += `&status=${status}`;
    }
    if (assetFilter && assetFilter !== 'all') {
      url += `&assetType=${assetFilter}`;
    }
    if (transactionType && transactionType !== 'all') {
      url += `&transactionType=${transactionType}`;
    }

    try {
      const res = await axios.get(url);
     
      if(res.data.status === 'success'){
        setTransactions(res.data.data.transactions)
        updatePagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  // Initial fetch and when filters change
  useEffect(() => {
    fetchTransactions(
      1, 
      searchQuery, 
      statusFilter === 'all' ? '' : statusFilter,
      assetFilter === 'all' ? '' : assetFilter,
      transactionTypeFilter === 'all' ? '' : transactionTypeFilter
    );
  }, [debouncedSearchQuery,assetFilter, statusFilter, transactionTypeFilter]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleAssetTypeChange = (assetFilter) => {
    setAssetFilter(assetFilter);
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

  // Approve transaction
  const approveTransaction = async () => {
    const transactionId = selectedTransaction.id;
    if (!window.confirm(`Are you sure you want to approve this transaction?`)) return;
    setIsApproving(true);
    try {
      const res = await axios.patch(`api/v1/transactions/${transactionId}/action/approve`);
      if (res.data.status === 'success') {
        setTransactions(prev => 
          prev.map(tx => tx.id === transactionId ? res.data.data.transaction : tx)
        );
        setSelectedTransaction(res.data.data.transaction);
        closeModal();
        toast.success('Transaction approved successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve transaction");
    } finally {
      setIsApproving(false);
    }
  };

  // Decline transaction
  const declineTransaction = async () => {
    const transactionId = selectedTransaction.id
    if (!window.confirm(`Are you sure you want to decline this transaction?`)) return;
    setIsDeclining(true);
    try {
      const res = await axios.patch(`api/v1/transactions/${transactionId}/action/decline`);
      if (res.data.status === 'success') {
        setTransactions(prev => 
          prev.map(tx => tx.id === transactionId ? res.data.data.transaction : tx)
        );
        setSelectedTransaction(res.data.data.transaction);
        closeModal();
        toast.success('Transaction declined successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to decline transaction");
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="pb-10">
      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <Modal
        
          isOpen={isModalOpen}
          closeModal={closeModal}
          header={`Transaction Details - ${selectedTransaction.ref}`}
        >
          <TransactionDetails 
            transaction={selectedTransaction}
            onApproveTransaction={approveTransaction}
            onDeclineTransaction={declineTransaction}
            isApproving={isApproving}
            isDeclining={isDeclining}
          />
        </Modal>
      )}

      {/* Header and Actions */}
      <PageHeader 
        primaryHeader={'Transaction Management'}
        secondaryHeader={'View and manage all transactions'}
      />

      {/* Filters */}
      <DataFilters
        filterHeader={'Transaction'}
        searchQuery={searchQuery}
         onSearchSubmit={(e) => e.preventDefault()} 
        filters={
          [
            {
              type:'input',
              placeholder:'Search transactions...',
              value:searchQuery,
              onChange:(e)=>setSearchQuery(e.target.value)
            },
            {
              type:'select',
              label:'Asset Type',
              value: assetFilter,
              onChange: (e) => handleAssetTypeChange(e.target.value),
              options:assetTypeFilterOptions
            },
            {
              type:'select',
              label:'Transaction Type',
              value: transactionTypeFilter,
              onChange: (e) => handleTransactionTypeChange(e.target.value),
              options:transactionFilterOptions
            },
            {
              type:'select',
              label:'Status',
              value: statusFilter,
              onChange: (e) => handleStatusChange(e.target.value),
              options:transactionStatusFilterOptions
            }
          ]
        }
      />
     
      {/* Transactions List */}
      <TransactionsList
        transactions={transactions}
        openTransactionDetails={openTransactionDetails}
        pagination={pagination}
        onPageChange={handlePageChange}
        context='admin'
      />
    </div>
  );
};

export default Transactions;