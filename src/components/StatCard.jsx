const StatCard = ({ stat, loading = false }) => {  
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3 h-12 w-12 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Determine if change is positive or negative
  const isIncrease = stat.change && !stat.change.startsWith("-");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {stat.title}
          </p>
          <h3 className="text-[19px] font-bold text-gray-800 dark:text-white mt-1">
            {stat.total || stat.value }
          </h3>
          {stat.preValue !== undefined && (
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              Last Month: {stat.preValue}
            </p>
          )}
          {stat.currentValue !== undefined && (
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              This Month: {stat.currentValue}
            </p>
          )}
        </div>
       
        <div className="flex items-center justify-center h-12 w-12 bg-primary-dark/10 text-primary-dark dark:bg-primary-light/10 dark:text-primary-light rounded-full">
          {stat.icon}
        </div>
      </div>
      {stat.change && (
        <p
          className={`mt-1 text-sm ${
            isIncrease ? "text-green-500" : "text-red-500"
          }`}
        >
          {stat.change}
        </p>
      )}
    </div>
  );
};

export default StatCard;