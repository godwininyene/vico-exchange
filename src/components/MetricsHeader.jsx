const MetricsHeader = ({ title, periods, activePeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
      <div className="flex space-x-2">
        {periods.map((period) => (
          <button
            key={period}
            className={`px-3 py-1 text-sm rounded-full ${
              activePeriod === period
                ? 'bg-primary-dark dark:bg-primary-light text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onPeriodChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MetricsHeader;