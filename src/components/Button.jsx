const Button = ({
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText = "Processing...",
  children,
  className = "",
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses = "py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-medium";
  const gradientClasses = "bg-gradient-to-r from-primary-light to-primary-dark text-white";
  const hoverClasses = "hover:from-primary-dark hover:to-primary-light transition-all duration-300";
  const disabledClasses = "disabled:opacity-70 disabled:cursor-not-allowed";
  
  // Special styling for disabled state
  const disabledGradientClasses = disabled ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500" : gradientClasses;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${disabledGradientClasses} ${hoverClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;