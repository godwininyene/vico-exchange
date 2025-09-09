import formatCurrency from "../utils/formatCurrency";
import StatusBadge from "./StatusBadge";
import { FiEdit2, FiTrash2, FiLoader} from 'react-icons/fi';
import { BsCurrencyBitcoin, BsWallet2 } from 'react-icons/bs';
import { useState } from "react";
const AdminCoin = ({coin, onOpenEditModal, onDeleteCoin}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDeleteCoin(coin.id);
      } catch (error) {
        // Error handling is done in the parent component
      } finally {
        setIsDeleting(false);
      }
    };
  return (
    <div
      key={coin.id}
      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          {coin.coinImage ? (
            <img
              src={coin.coinImage}
              alt={coin.coinName}
              className="w-10 h-10 object-contain rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <BsCurrencyBitcoin
                className="text-gray-500 dark:text-gray-400"
                size={20}
              />
            </div>
          )}
          <div className="ml-4">
            <h3 className="font-medium text-gray-800 dark:text-white">
              {coin.coinName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {formatCurrency(coin.coinRate)}
              </span>
              <StatusBadge status={coin.status} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <BsWallet2 className="mr-1" />
            <span className="truncate max-w-xs">{coin.coinAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenEditModal(coin)}
              className="cursor-pointer p-2 text-primary-dark dark:text-primary-light hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 rounded-lg"
              title="Edit"
            >
              <FiEdit2 size={18} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="cursor-pointer p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
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
    </div>
  );
};

export default AdminCoin;
