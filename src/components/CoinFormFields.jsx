import { FiX, FiImage, FiDollarSign } from "react-icons/fi";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { BsWallet2 } from "react-icons/bs";

const CoinFormFields = ({
  formData,
  imagePreview,
  isEditMode,
  onInputChange,
  onImageChange,
  onRemoveImage,
  errors = {},
}) => {
  return (
    <div className="p-6 space-y-4">
      <InputField
        label="Coin Name"
        name="coinName"
        value={formData.coinName}
        onChange={onInputChange}
        placeholder="e.g. Bitcoin"
        error={errors.coinName}
      />

      <InputField
        label="Coin Address"
        name="coinAddress"
        value={formData.coinAddress}
        onChange={onInputChange}
        placeholder="e.g. xxxxxxxx"
        icon={<BsWallet2 className="text-gray-400" />}
        error={errors.coinAddress}
      />

      <InputField
        type="number"
        label="Rate (₦ per $)"
        name="coinRate"
        value={formData.coinRate}
        onChange={onInputChange}
        placeholder="eg ₦1500"
        min="0"
        step="0.01"
        icon={<FiDollarSign className="text-gray-400" />}
        error={errors.coinRate}
      />

      {isEditMode && (
        <SelectField
          name="status"
          label="Status"
          value={formData.status}
          onChange={onInputChange}
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          error={errors.status}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Coin Logo {!isEditMode && "*"}
        </label>
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Card preview"
              className="w-32 h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <button
              onClick={onRemoveImage}
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
              onChange={onImageChange}
              accept="image/*"
            />
          </label>
        )}
        {errors.coinImage && (
          <p className="mt-1 text-sm text-red-500">{errors.coinImage}</p>
        )}
      </div>
    </div>
  );
};

export default CoinFormFields;
