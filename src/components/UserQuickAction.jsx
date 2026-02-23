import { Link } from "react-router-dom";

const UserQuickAction = ({ Icon, label, url = "/", color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",

    // ✅ New colors for VTU actions
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;

  return (
    <Link to={url} className="cursor-pointer block">
      <button
        type="button"
        className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center w-full"
      >
        <div className={`p-3 rounded-full mb-2 ${selectedColor}`}>
          <Icon size={20} />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      </button>
    </Link>
  );
};

export default UserQuickAction;
