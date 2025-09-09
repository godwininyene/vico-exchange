import Transaction from "./Transaction"
import Pagination from "./Pagination"
import EmptyMessage from "./EmptyMessage"

const TransactionsList = ({transactions,openTransactionDetails, pagination, onPageChange, context})=>{
    const startItem = (pagination.currentPage - 1) * pagination.perPage + 1;
    const endItem = Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems);
    return(
        <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Transaction History</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {startItem}-{endItem} of {pagination.totalItems} transactions
                    </p>
                </div>
          
                {transactions.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {transactions.map((transaction) => (
                            <Transaction 
                                transaction={transaction}
                                openTransactionDetails={openTransactionDetails}
                                key={transaction.id}
                                context={context}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyMessage message={'No transactions found matching your filters'} />
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
export default TransactionsList