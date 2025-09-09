import { useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

const FileUpload = ({label, file, filePreview, onFileChange, onRemoveFile, accept = "image/*,.pdf" }) => {
  const fileInputRef = useRef(null);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
       {label ? label : 'Upload Payment Proof'} 
      </label>

      {filePreview ? (
        <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <img
            src={filePreview}
            alt="Payment proof"
            className="max-h-64 mx-auto rounded"
          />
          <button
            onClick={onRemoveFile}
            className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FiX className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      ) : file ? (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <p className="text-gray-800 dark:text-gray-200">{file.name}</p>
          <button
            onClick={onRemoveFile}
            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Remove file
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex flex-col items-center justify-center">
            <FiUpload className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              PNG, JPG, or JPEG
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept={accept}
            ref={fileInputRef}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;