  const TransactionTypeBadge = ({ type }) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'buy' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
          : type === 'sell'
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>
        {type === 'buy' ? 'Buy' : type === 'sell' ? 'Sell' : type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };
export default TransactionTypeBadge