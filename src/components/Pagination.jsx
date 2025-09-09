import { FiChevronLeft, FiChevronRight} from 'react-icons/fi';
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
})=>{
    return(
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-2">
            <button
                onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                <FiChevronLeft className="mr-1" /> Previous
            </button>
                      
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === number 
                            ? 'bg-primary-dark text-white dark:bg-primary-light'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        >
                        {number}
                    </button>
                ))}
            </div>
                      
            <button
                onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                Next <FiChevronRight className="ml-1" />
            </button>
        </div>
    )
}

        
        
export default Pagination