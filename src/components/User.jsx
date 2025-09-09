import {
  FiUser,
  FiEye,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const User = ({user, onOpenUserDetails}) => {
  return (
    <div
      key={user.id}
      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          {/* Profile Photo */}
          <div className="relative">
            {user.photo ? (
              <img 
                src={user.photo} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="bg-primary-dark/10 text-primary-dark dark:bg-primary-light/10 dark:text-primary-light rounded-full p-3">
                <FiUser size={20} />
              </div>
            )}
          </div>
          
          <div className="ml-4">
            <h3 className="font-medium text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <FiMail className="mr-1" /> {user.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <FiPhone className="mr-1" /> {user.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <StatusBadge status={user.status} usage='user'/>
          </div>
          <button
            onClick={() => onOpenUserDetails(user)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center"
          >
            <FiEye className="mr-2" /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;