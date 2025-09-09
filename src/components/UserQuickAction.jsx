import { Link } from "react-router-dom";
const UserQuickAction = ({ Icon, label, url = '/', color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
  };

  return (
    <Link to={url} className="cursor-pointer block">
      <button className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center w-full">
        <div className={`p-3 rounded-full mb-2 ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </button>
    </Link>
  );
};


export default UserQuickAction