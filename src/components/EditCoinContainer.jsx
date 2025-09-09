import { FiCheck } from 'react-icons/fi';
import CoinFormFields from './CoinFormFields';

const EditCoinContainer = ({
  newCoin,
  isEditMode,
  imagePreview,
  handleInputChange,
  handleImageChange,
  setImagePreview,
  setNewCard,
  closeModal,
  saveCoin,
  errors = {},
  processing = false
}) => {
  const handleRemoveImage = () => {
    setImagePreview(null);
    setNewCard({ ...newCard, cardImage: null });
    // Also revoke the object URL to avoid memory leaks
    if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
    }
  };

  return (
    <form onSubmit={saveCoin}>
      <CoinFormFields
        formData={newCoin}
        imagePreview={imagePreview}
        isEditMode={isEditMode}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        errors={errors}
      />

      {errors.general && (
        <div className="px-6 pb-4">
          <p className="text-sm text-red-500">{errors.general}</p>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <button
          onClick={closeModal}
          disabled={processing}
          className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          disabled={processing}
          className="cursor-pointer px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              {isEditMode ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>
              <FiCheck className="mr-2" /> 
              {isEditMode ? "Update" : "Save"} Coin
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditCoinContainer;