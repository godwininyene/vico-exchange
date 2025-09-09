const ChartContainer = ({
  title,
  children,
  className = "",
  loading = false,
}) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ChartContainer;
