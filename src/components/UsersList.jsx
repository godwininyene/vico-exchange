import { useState } from "react";
import User from "./User";
import EmptyMessage from "./EmptyMessage";
import Pagination from "./Pagination";
const UsersList = ({users, onOpenUserDetails}) => {
    // Pagination logic
    const usersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            All Users
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, users.length)} of {users.length} users
          </p>
        </div>

        {currentUsers.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.map((user) => (
              <User
                user={user}
                onOpenUserDetails={onOpenUserDetails}
                key={user.id}
              />
            ))}
          </div>
        ) : (
          <EmptyMessage message={"No users found matching your criteria"} />
        )}

        {/* Pagination */}
        {users.length > usersPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default UsersList;
