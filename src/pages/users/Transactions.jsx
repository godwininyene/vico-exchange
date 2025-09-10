import { useState, useEffect } from 'react';
import axios from './../../lib/axios'
import DataFilters from '../../components/DataFilters';
import {assetTypeFilterOptions, transactionStatusFilterOptions, transactionFilterOptions} from './../../data'
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';
import TransactionsList from '../../components/TransactionsList';
import Loader from '../../components/Loader';

const Transactions = () => {
  // State for filters and pagination
  const [transactions, setTransactions] = useState([]);
  const [assetFilter, setAssetFilter] = useState('all');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
  const [loading, setLoading] = useState(false);

  const {pagination, updatePagination} = usePagination();

  const handleAssetTypeChange = (assetFilter) => {
    setAssetFilter(assetFilter);
  };

  const handleTransactionTypeChange = (transactionType) => {
    setTransactionTypeFilter(transactionType);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
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

  
  // Fetch transactions with filters
  const fetchTransactions = async(page = 1, search = '', status = '', assetFilter = '', transactionType = '') => {
    setLoading(true);
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
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch and when filters change
  useEffect(() => {
    fetchTransactions(
      1, 
      debouncedSearchQuery, 
      statusFilter === 'all' ? '' : statusFilter,
      assetFilter === 'all' ? '' : assetFilter,
      transactionTypeFilter === 'all' ? '' : transactionTypeFilter
    );
  }, [debouncedSearchQuery, assetFilter, statusFilter, transactionTypeFilter]);


  return (
    <div className="pb-10">
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
     
      {/* Transactions List with Loader */}
      {loading ? (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-96 flex items-center justify-center">
            <Loader size={8} />
          </div>
        </div>
      ) : (
        <TransactionsList
          transactions={transactions}
          pagination={pagination}
          onPageChange={handlePageChange}
          context='user'
        />
      )}
    </div>
  );
};

export default Transactions;