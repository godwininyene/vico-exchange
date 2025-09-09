import { useState } from "react";
import Pagination from "./Pagination";
import AdminCoin from "./AdminCoin";
import EmptyMessage from "./EmptyMessage";
const AdminCoinsList = ({coins, onOpenEditModal, onDeleteCoin, pagination, onPageChange}) => {
    const startItem = (pagination.currentPage - 1) * pagination.perPage + 1;
    const endItem = Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems);
  return (
    <div className="mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Supported Cryptocurrencies
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startItem}-{endItem} of {pagination.totalItems} Coins
          </p>
        </div>

        {coins.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {coins.map((coin) => (
              <AdminCoin
                coin={coin}
                onOpenEditModal={onOpenEditModal}
                onDeleteCoin={onDeleteCoin}
                key={coin.id}
              />
            ))}
          </div>
        ) : (
          <EmptyMessage
            message={"No cryptocurrencies found matching your criteria"}
          />
        )}

        {/* Pagination */}
        {pagination.totalItems > pagination.perPage && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCoinsList;
