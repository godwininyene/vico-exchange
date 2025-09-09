import React from "react";

const SelectField = ({
  name,
  onChange,
  options = [],
  isRequired = true,
  classNames = "",
  value, 
  defaultValue, 
  variant = "default",
  label,
  icon,
  error,
  placeholder = "-- Select --",
}) => {
  // Base styles that all variants share
  const baseStyles = "w-full py-2 px-4 pr-10 transition-all duration-200 dark:bg-gray-700 focus:outline-none appearance-none";

  // Variant-specific styles
  const variants = {
    default: "border border-[#D9E1EC] rounded-lg placeholder-[#A1A7C4] text-gray-900 dark:text-gray-100 focus:border-primary-light dark:border-gray-600",
    outline: "border-b-2 border-gray-300 bg-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 dark:border-gray-600",
    filled: "bg-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 dark:bg-gray-800",
    floating: "border border-gray-300 rounded-lg peer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 dark:border-gray-600",
  };

  // Combine base + variant + custom classes
  const selectClasses = `${baseStyles} ${variants[variant] || variants.default} ${classNames}`;

  // Chevron icon for the select dropdown
  const ChevronIcon = () => (
    <svg 
      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  // Handle both string and object options
  const renderOptions = () => {
    return options.map((option, index) => {
      if (typeof option === 'string') {
        return (
          <option key={index} value={option} className="dark:bg-gray-700 dark:text-gray-100">
            {option}
          </option>
        );
      }
      if (option.value !== undefined) {
        return (
          <option key={index} value={option.value} className="dark:bg-gray-700 dark:text-gray-100">
            {option.label || option.value}
          </option>
        );
      }
      return (
        <option key={index} value={JSON.stringify(option)} className="dark:bg-gray-700 dark:text-gray-100">
          {option.name || option.title || JSON.stringify(option)}
        </option>
      );
    });
  };

  if (variant === "floating") {
    return (
      <div className="relative">
        <select
          name={name}
          value={onChange ? value : undefined}  // Only use value if onChange is provided
          defaultValue={!onChange ? (value || defaultValue) : undefined}  // Use defaultValue if no onChange
          onChange={onChange}
          className={`${selectClasses} ${defaultValue ? 'pt-5' : ''}`}
          required={isRequired}
        >
          <option value=""></option>
          {renderOptions()}
        </select>
        <label className={`absolute left-4 text-[#5A607F] dark:text-gray-400 pointer-events-none transition-all duration-200 
          ${defaultValue ? '-top-2 text-xs text-blue-500 dark:text-blue-400' : 'top-3 text-base'}`}>
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
        <ChevronIcon />
        {icon && <div className="absolute left-0 hidden top-3.5 text-gray-400 dark:text-gray-300">{icon}</div>}
        {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-md text-[#5A607F] dark:text-gray-300 mb-1">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={onChange ? value : undefined}  // Only use value if onChange is provided
          defaultValue={!onChange ? (value || defaultValue) : undefined}  // Use defaultValue if no onChange
          onChange={onChange}
          className={selectClasses}
          required={isRequired}
        >
          <option value="" className="dark:bg-gray-700 dark:text-gray-100">{placeholder}</option>
          {renderOptions()}
        </select>
        <ChevronIcon />
        {icon && <div className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-300">{icon}</div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default SelectField;