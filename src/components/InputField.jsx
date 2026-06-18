import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

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
  iconPosition = "left", // "left" or "right"
  id,
  error,
  helperText,
  as = "input",
  multiple = false,
  accept,
  ...props // Captures any other HTML attributes (e.g., disabled)
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isTextarea = as === "textarea";
  
  // Determine actual HTML tag and dynamic password visibility input type
  const InputComponent = isTextarea ? "textarea" : "input";
  const inputType = isPassword && showPassword ? "text" : type;

  // Layout states for padding adjustments
  const hasLeftIcon = icon && iconPosition === "left" && !isTextarea;
  const hasRightIcon = (icon && iconPosition === "right" && !isTextarea) || (isPassword && !isTextarea);

  const baseStyles =
    "w-full py-2 transition-all duration-200 focus:outline-none dark:text-gray-100";

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

  // Dynamically attach error rings or styling changes based on state
  const stateStyles = error 
    ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500" 
    : "";

  const inputClasses = `
    ${baseStyles} 
    ${variants[variant] || variants.default} 
    ${stateStyles}
    ${hasLeftIcon ? "pl-11" : "pl-4"} 
    ${hasRightIcon ? "pr-11" : "pr-4"}
    ${props.disabled ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : ""}
    ${classNames}
  `;

  const inputProps = {
    type: !isTextarea ? inputType : undefined,
    id: id || name,
    name,
    placeholder,
    className: inputClasses,
    required: isRequired,
    onChange,
    onKeyDown,
    rows: isTextarea ? 3 : undefined,
    ...props,
    ...(type === "file"
      ? { multiple, accept }
      : { value }), // Controlled component usage updated from 'defaultValue'
  };

  return (
    <div className="w-full mb-4 group">
      {/* Label */}
      {label && (
        <label htmlFor={id || name} className="block text-md text-[#5A607F] dark:text-gray-300 mb-1 select-none">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input wrapper stack */}
      <div className="relative flex items-center">
        {/* Left Icon Placement */}
        {hasLeftIcon && (
          <div className="absolute left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}

        <InputComponent {...inputProps} />

        {/* Right Layout Stack (Custom Right Icon OR Password Toggle Switch) */}
        {hasRightIcon && (
          <div className="absolute right-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200 flex items-center justify-center">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            ) : (
              iconPosition === "right" && icon
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Helper Text (Only renders if there isn't an active error) */}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 italic flex items-center gap-1">
          ⓘ {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;