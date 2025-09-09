const InputField = ({
  onChange,
  onKeyDown,
  name,
  classNames = "",
  type = "text",
  placeholder,
  value,
  isRequired = true,
  variant = "default",
  label,
  icon,
  id,
  error,
  as = "input",
  multiple = false,
  accept,
}) => {
  const baseStyles =
    "w-full py-2 px-4 transition-all duration-200 focus:outline-none dark:text-gray-100";

  const variants = {
    default:
      "border-1 border-solid border-[#D9E1EC] rounded-lg placeholder-[#A1A7C4] text-gray-900 dark:bg-gray-700 dark:border-gray-600 focus:border-primary-light",
    outline: 
      "border-b-2 border-gray-300 bg-transparent dark:bg-transparent focus:border-blue-500 dark:border-gray-600",
    filled:
      "bg-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:focus:bg-gray-700",
    floating:
      "border border-gray-300 rounded-lg peer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600",
  };

  const inputClasses = `${baseStyles} ${
    variants[variant] || variants.default
  } ${classNames}`;

  const InputComponent = as === "textarea" ? "textarea" : "input";

  const inputProps = {
    type,
    id,
    name,
    placeholder,
    className: inputClasses,
    required: isRequired,
    onChange,
    onKeyDown,
    rows: as === "textarea" ? 3 : undefined,
    ...(type === "file"
      ? { multiple, accept } // file-specific props
      : { defaultValue: value }),
  };

  return (
    <div className="relative mb-3">
      {label && (
        <label htmlFor={name} className="block text-md text-[#5A607F] dark:text-gray-300 mb-1">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <InputComponent {...inputProps} />
        {icon && <div className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-300">{icon}</div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default InputField;