import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiDollarSign,
  FiCreditCard,
  FiX,
  FiCheck
} from 'react-icons/fi';

const Giftcards = () => {
  // Mock data - replace with API calls
  const initialCards = [
    {
      id: 'GC-1001',
      name: 'Amazon',
      image: 'https://via.placeholder.com/150/FF9900/FFFFFF?text=Amazon',
      type: 'e-code',
      rate: 480,
      status: 'active'
    },
    {
      id: 'GC-1002',
      name: 'Apple',
      image: 'https://via.placeholder.com/150/999999/FFFFFF?text=Apple',
      type: 'physical',
      rate: 470,
      status: 'active'
    },
    {
      id: 'GC-1003',
      name: 'Google Play',
      image: 'https://via.placeholder.com/150/4285F4/FFFFFF?text=Google',
      type: 'e-code',
      rate: 460,
      status: 'active'
    },
    {
      id: 'GC-1004',
      name: 'Steam',
      image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Steam',
      type: 'e-code',
      rate: 475,
      status: 'inactive'
    },
  ];

  // State management
  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    image: '',
    type: 'e-code',
    rate: '',
    status: 'active'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Apply filters
  useEffect(() => {
    let filtered = cards;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(card => card.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(card => card.type === typeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(query) ||
        card.id.toLowerCase().includes(query))
    }
    
    setFilteredCards(filtered);
    setCurrentPage(1);
  }, [cards, statusFilter, typeFilter, searchQuery]);

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewCard({...newCard, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for adding new card
  const openAddModal = () => {
    setCurrentCard(null);
    setIsEditMode(false);
    setNewCard({
      name: '',
      image: '',
      type: 'e-code',
      rate: '',
      status: 'active'
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Open modal for editing card
  const openEditModal = (card) => {
    setCurrentCard(card);
    setIsEditMode(true);
    setNewCard({...card});
    setImagePreview(card.image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCard(null);
    setIsEditMode(false);
    setImagePreview(null);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({...newCard, [name]: value});
  };

  // Save card (add or edit)
  const saveCard = () => {
    if (!newCard.name || !newCard.rate || (!newCard.image && !isEditMode)) {
      alert('Please fill all required fields');
      return;
    }

    if (isEditMode) {
      // Update existing card
      const updatedCards = cards.map(card => 
        card.id === currentCard.id ? { ...newCard, id: currentCard.id } : card
      );
      setCards(updatedCards);
    } else {
      // Add new card
      const newId = `GC-${Math.floor(1000 + Math.random() * 9000)}`;
      setCards([...cards, { ...newCard, id: newId }]);
    }
    
    closeModal();
  };

  // Delete card
  const deleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this gift card?')) {
      setCards(cards.filter(card => card.id !== id));
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

  return (
    <div className="pb-10">
      {/* Add/Edit Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isEditMode ? 'Edit Gift Card' : 'Add New Gift Card'}
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
                  Card Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCard.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="e.g. Amazon, Apple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Image {!isEditMode && '*'}
                </label>
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Card preview" 
                      className="w-32 h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setNewCard({...newCard, image: ''});
                      }}
                      className="absolute top-0 right-0 bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <FiX className="text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <FiImage className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        PNG or JPG (MAX. 2MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Type *
                </label>
                <select
                  name="type"
                  value={newCard.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="e-code">E-Code</option>
                  <option value="physical">Physical Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rate (₦ per $) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="rate"
                    value={newCard.rate}
                    onChange={handleInputChange}
                    className="w-full pl-8 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    placeholder="480"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newCard.status}
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
                onClick={saveCard}
                className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center"
              >
                <FiCheck className="mr-2" /> {isEditMode ? 'Update' : 'Save'} Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header and Actions */}
      <div className="bg-white dark:bg-gray-900  py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gift Cards</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage available gift cards</p>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center justify-center"
          >
            <FiPlus className="mr-2" /> Add New Card
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
                placeholder="Search gift cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
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

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Type
                </label>
                <select
                  id="type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="e-code">E-Code</option>
                  <option value="physical">Physical Card</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards Table */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Available Gift Cards</h2>
          </div>
          
          {currentCards.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentCards.map((card) => (
                <div key={card.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-16 h-16 object-contain border border-gray-200 dark:border-gray-700 rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{card.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{card.type}</span>
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            ₦{card.rate}/$
                          </span>
                          <StatusBadge status={card.status} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(card)}
                        className="p-2 text-primary-dark dark:text-primary-light hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 rounded-lg"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No gift cards found matching your criteria</p>
            </div>
          )}

          {/* Pagination */}
          {filteredCards.length > cardsPerPage && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstCard + 1} to {Math.min(indexOfLastCard, filteredCards.length)} of {filteredCards.length} cards
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

export default Giftcards;