import StatusBadge from "./StatusBadge"
import { FiEdit2, FiTrash2, FiLoader } from 'react-icons/fi';
import { useState } from 'react';

const AdminGiftcard = ({ card, onDeleteCard, onEditModal }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteCard(card.id);
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div key={card.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <img 
            src={card.cardLogo} 
            alt={card.cardName} 
            className="w-16 h-16 object-contain border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          <div className="ml-4">
            <h3 className="font-medium text-gray-800 dark:text-white">{card.cardName}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{card.cardType}</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                ₦{card.cardRate.toLocaleString()}/$
              </span>
              <StatusBadge status={card.status} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEditModal(card)}
            disabled={isDeleting}
            className="cursor-pointer p-2 text-primary-dark dark:text-primary-light hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="cursor-pointer p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            title="Delete"
          >
            {isDeleting ? (
              <FiLoader size={18} className="animate-spin" />
            ) : (
              <FiTrash2 size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGiftcard;