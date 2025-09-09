const ActionButton = ({
  onClick,
  loading = false,
  disabled = false,
  icon: Icon,
  children,
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  // Define button styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-primary-dark hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        px-4 py-2 text-white rounded-lg flex items-center justify-center
        transition-colors duration-200
        ${getVariantStyles()}
        ${(loading || disabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        <>
          {Icon && <Icon className="mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

export default ActionButton;