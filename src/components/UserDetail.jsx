import { FiTrash2 } from "react-icons/fi";
import { FaUserTimes, FaUserCheck } from 'react-icons/fa';
import StatusBadge from "./StatusBadge";
import formatDate from "../utils/formatDate";
import ActionButton from "./ActionButton";

const UserDetail = ({ 
  user, 
  onDeleteUser, 
  isDeleting,
  onStatusChange,
  updating
}) => {
  return (
    <div className="space-y-6 p-6">
      {/* Profile Header with Photo */}
      <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
            {user.photo ? (
              <img 
                src={user.photo} 
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-gray-500 dark:text-gray-300">
                {user.firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.firstName} {" "} {user.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {user.email}
          </p>
          <div className="flex items-center gap-2">
            <StatusBadge status={user.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>
              <div className="flex items-center gap-2">
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Account Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join Date
              </p>
              <p className="text-gray-800 dark:text-white">
                {formatDate(user.createdAt)}
              </p>
            </div>
           
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Transactions
              </p>
              <p className="text-gray-800 dark:text-white">
                {user.transactionCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Volume
              </p>
              <p className="text-gray-800 dark:text-white">
                ₦{user.transactionVolume.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-3">
          <ActionButton
            onClick={onDeleteUser}
            loading={isDeleting}
            disabled={isDeleting || updating}
            icon={FiTrash2}
            variant="danger"
          >
            Delete User
          </ActionButton>
          
          {user.status === 'active' ? (
            <ActionButton
              onClick={() => onStatusChange('deactivate', user)}
              loading={updating}
              disabled={updating || isDeleting}
              icon={FaUserTimes}
              variant="warning"
            >
              Deactivate User
            </ActionButton>
          ) : (
            <ActionButton
              onClick={() => onStatusChange('approve', user)}
              loading={updating}
              disabled={updating || isDeleting}
              icon={FaUserCheck}
              variant="success"
            >
              Activate User
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;