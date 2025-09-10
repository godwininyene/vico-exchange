import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import DataFilters from './../../components/DataFilters';
import { assetStatusFilterOptions } from '../../data';
import AdminGiftcardsList from '../../components/AdminGiftcardsList';
import usePagination from '../../hooks/usePagination';
import Modal from '../../components/Modal';
import EditCardContainer from './../../components/EditCardContainer';
import axios from './../../lib/axios';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../../components/Loader'; // Import Loader component

const Giftcards = () => {
  // State management
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCard, setNewCard] = useState({
    cardName: '',
    cardLogo: '',
    cardType: '',
    cardRate: '',
    status: 'active'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const { pagination, updatePagination } = usePagination();
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetch giftcards with filters
  const fetchGiftcards = async (page = 1, search = '', status = '') => {
    setLoading(true); // Set loading to true when fetching starts
    let url = `api/v1/giftcards?page=${page}&limit=${pagination.perPage}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    if (status && status !== 'all') {
      url += `&status=${status}`;
    }
    
    try {
      const res = await axios.get(url);
      if (res.data.status === 'success') {
        setCards(res.data.data.cards);
        updatePagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch gift cards');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    fetchGiftcards(
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
      setNewCard({...newCard, cardLogo: file});
    }
  };

  // Open modal for adding new card
  const openAddModal = () => {
    setCurrentCard(null);
    setIsEditMode(false);
    setNewCard({
      cardName: '',
      cardLogo: '',
      cardType: '',
      cardRate: '',
      status: 'active'
    });
    setImagePreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing card
  const openEditModal = (card) => {
    setCurrentCard(card);
    setIsEditMode(true);
    setNewCard({...card});
    // For edit mode, we might have an image URL from the backend
    // We need to handle this appropriately - either keep the existing image
    // or allow re-upload
    setImagePreview(card.cardLogo); // This could be a URL string from the backend
    setErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCard(null);
    setIsEditMode(false);
    setImagePreview(null);
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({...newCard, [name]: value});
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Save card (add or edit)
  const saveCard = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
    
      const formData = new FormData();
    
      // Append all form fields to FormData
      formData.append('cardName', newCard.cardName);
      formData.append('cardType', newCard.cardType);
      formData.append('cardRate', newCard.cardRate);
      formData.append('status', newCard.status);

      // Append image if it's a file
      if (newCard.cardLogo && typeof newCard.cardLogo !== 'string') {
        formData.append('cardLogo', newCard.cardLogo);
      } else if (newCard.cardLogo && isEditMode) {
        formData.append('cardLogo', newCard.cardLogo);
      }
      let response;
      
      if (isEditMode) {
        // Update existing card
        response = await axios.patch(`api/v1/giftcards/${currentCard.id}`, formData);
      } else {
        // Add new card
        response = await axios.post('api/v1/giftcards', formData);
      }

      if (response.data.status === 'success') {
        toast.success(isEditMode ? 'Gift card updated successfully!' : 'Gift card added successfully!');
        
        // Refresh the list after successful operation
        await fetchGiftcards(
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
      
      toast.error(err.response?.data?.message || 'Error saving gift card');
      console.log('Error:', err);
    } finally {
      setProcessing(false);
    }
  };

  // Delete card
  const handleDeleteCard = async (id) => {
    if (window.confirm('Are you sure you want to delete this gift card?')) {
      try {
        const response = await axios.delete(`api/v1/giftcards/${id}`);
        if (response.status === 204) {
          toast.success('Gift card deleted successfully!');
          setCards(cards.filter(card => card.id !== id));
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error deleting gift card');
        console.log('Error:', err);
      }
    }
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handlePageChange = (page) => {
    fetchGiftcards(
      page,
      searchQuery,
      statusFilter === 'all' ? '' : statusFilter,
    );
  };

  return (
    <div className="pb-10">
      {/* Add/Edit Card Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          header={isEditMode ? 'Edit Gift Card' : 'Add New Gift Card'}
          
        >
          <EditCardContainer
            newCard={newCard}
            isEditMode={isEditMode}
            imagePreview={imagePreview}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            setImagePreview={setImagePreview}
            setNewCard={setNewCard}
            closeModal={closeModal}
            saveCard={saveCard}
            errors={errors}
            processing={processing}
          />
        </Modal>
      )}
      <PageHeader
        primaryHeader={'Gift Cards'}
        secondaryHeader={'Manage available gift cards'}
      >
        <button 
          onClick={openAddModal}
          className="cursor-pointer px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center justify-center"
        >
          <FiPlus className="mr-2" /> Add New Card
        </button>
      </PageHeader>
      
      <DataFilters
        filterHeader={'Giftcard'}
        searchQuery={searchQuery}
        onSearchSubmit={(e) => e.preventDefault()}
        filters={[
          {
            type:'input',
            placeholder:'Search gift cards...',
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
   
      {/* Giftcards List with Loader */}
      {loading ? (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-96 flex items-center justify-center">
            <Loader size={8} />
          </div>
        </div>
      ) : (
        <AdminGiftcardsList 
          cards={cards}
          onDeleteCard={handleDeleteCard}
          onEditModal={openEditModal}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Giftcards;