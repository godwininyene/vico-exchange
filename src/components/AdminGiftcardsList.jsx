import EmptyMessage from "./EmptyMessage"
import { useState } from "react";
import AdminGiftcard from "./AdminGiftcard";
import Pagination from "./Pagination";
const AdminGiftcardsList = ({cards, onDeleteCard, onEditModal, pagination, onPageChange})=>{
    const startItem = (pagination.currentPage - 1) * pagination.perPage + 1;
    const endItem = Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems);

    return(
        <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Available Gift Cards</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {startItem}-{endItem} of {pagination.totalItems} Gift Cards
                    </p>
                </div>
          
                {cards.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cards.map((card) => (
                        <AdminGiftcard 
                            card={card}
                            onDeleteCard={onDeleteCard}
                            onEditModal={onEditModal}
                            key={card.id}
                        />
                    
                    ))}
                    </div>
                ) : (
                    <EmptyMessage message={'No gift cards found matching your criteria'}/>
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
    )
}

export default AdminGiftcardsList