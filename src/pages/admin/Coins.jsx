import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import DataFilters from '../../components/DataFilters';
import { assetStatusFilterOptions } from '../../data';
import AdminCoinsList from '../../components/AdminCoinsList';
import usePagination from '../../hooks/usePagination';
import axios from './../../lib/axios';
import { toast } from 'react-toastify';
import useDebounce from '../../hooks/useDebounce';
import Modal from '../../components/Modal';
import EditCoinContainer from '../../components/EditCoinContainer';

const Coins = () => {
  // State management
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCoin, setNewCoin] = useState({
    coinName: '',
    coinImage: '',
    coinAddress: '',
    coinRate: '',
    status: 'active'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const { pagination, updatePagination } = usePagination();

  // Fetch coins with filters
  const fetchCoins = async (page = 1, search = '', status = '') => {
    let url = `api/v1/coins?page=${page}&limit=${pagination.perPage}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    if (status && status !== 'all') {
      url += `&status=${status}`;
    }
    
    try {
      const res = await axios.get(url);
      if (res.data.status === 'success') {
        setCoins(res.data.data.coins);
        updatePagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch coins');
    }
  };
  
  useEffect(() => {
    fetchCoins(
      1,
      debouncedSearchQuery,
      statusFilter === 'all' ? '' : statusFilter,
    );
  }, [statusFilter, debouncedSearchQuery]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Store the file object for FormData submission
      setNewCoin({...newCoin, coinImage: file});
    }
  };

  // Open modal for adding new coin
  const openAddModal = () => {
    setCurrentCoin(null);
    setIsEditMode(false);
    setNewCoin({
      coinName: '',
      coinImage: '',
      coinAddress: '',
      coinRate: '',
      status: 'active'
    });
    setImagePreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing coin
  const openEditModal = (coin) => {
    setCurrentCoin(coin);
    setIsEditMode(true);
    setNewCoin({...coin});
    setImagePreview(coin.coinImage);
    setErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCoin(null);
    setIsEditMode(false);
    setImagePreview(null);
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoin({...newCoin, [name]: value});
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Save coin (add or edit) with API calls
  const saveCoin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
      const formData = new FormData();
      // Append all form fields to FormData
      formData.append('coinName', newCoin.coinName);
      formData.append('coinAddress', newCoin.coinAddress);
      formData.append('coinRate', newCoin.coinRate);
      formData.append('status', newCoin.status);
      
      // Append image if it's a file
      if (newCoin.coinImage && typeof newCoin.coinImage !== 'string') {
        formData.append('coinImage', newCoin.coinImage);
      } else if (newCoin.coinImage && isEditMode) {
        formData.append('coinImage', newCoin.coinImage);
      }

      let response;
      
      if (isEditMode) {
        // Update existing coin
        response = await axios.patch(`api/v1/coins/${currentCoin.id}`, formData);
      } else {
        // Add new coin
        response = await axios.post('api/v1/coins', formData);
      }

      if (response.data.status === 'success') {
        toast.success(isEditMode ? 'Coin updated successfully!' : 'Coin added successfully!');
        
        // Refresh the list after successful operation
        await fetchCoins(
          1,
          searchQuery,
          statusFilter === 'all' ? '' : statusFilter,
        );
        
        closeModal();
      }
    } catch (err) {
      // Extract errors from the backend response
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: 'An unexpected error occurred' });
      }
      
      toast.error(err.response?.data?.message || 'Error saving coin');
      console.log('Error:', err);
    } finally {
      setProcessing(false);
    }
  };

  // Delete coin with API call
  const deleteCoin = async (id) => {
    if (window.confirm('Are you sure you want to delete this coin?')) {
      try {
        const response = await axios.delete(`api/v1/coins/${id}`);
        if (response.status === 204) {
          toast.success('Coin deleted successfully!');
          setCoins(coins.filter(coin => coin.id !== id));
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error deleting coin');
        console.log('Error:', err);
      }
    }
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handlePageChange = (page) => {
    fetchCoins(
      page,
      searchQuery,
      statusFilter === 'all' ? '' : statusFilter,
    );
  };

  return (
    <div className="pb-10">
      {/* Add/Edit Coin Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          header={isEditMode ? 'Edit Coin' : 'Add New Coin'}
        >
          <EditCoinContainer
            newCoin={newCoin}
            isEditMode={isEditMode}
            imagePreview={imagePreview}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            setImagePreview={setImagePreview}
            setNewCoin={setNewCoin}
            closeModal={closeModal}
            saveCoin={saveCoin}
            errors={errors}
            processing={processing}
          />
        </Modal>
      )}

      {/* Header and Actions */}
      <PageHeader
        primaryHeader={'Cryptocurrencies'}
        secondaryHeader={'Manage supported cryptocurrencies'}
      >
        <button 
          onClick={openAddModal}
          className="cursor-pointer px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center justify-center"
        >
          <FiPlus className="mr-2" /> Add New Coin
        </button>
      </PageHeader>
     
      {/* Filters and Search */}
      <DataFilters
        filterHeader={'Cryptocurrencies'}
        searchQuery={searchQuery}
        onSearchSubmit={(e) => e.preventDefault()}
        filters={[
          {
            type:'input',
            placeholder:'Search cryptocurrencies...',
            value:searchQuery,
            onChange:(e)=>setSearchQuery(e.target.value)
          },
          {
            type:'select',
            label:'Status',
            value: statusFilter,
            onChange: (e) => handleStatusChange(e.target.value),
            options:assetStatusFilterOptions
          },
        ]}
      />
   
      {/* Cryptocurrencies Table */}
      <AdminCoinsList
        coins={coins}
        onDeleteCoin={deleteCoin}
        onOpenEditModal={openEditModal}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Coins;