const SectionContainer = ({ 
  title, 
  children, 
  actionButton, 
  className = "" 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        {actionButton}
      </div>
      {children}
    </div>
  );
};

export default SectionContainer;