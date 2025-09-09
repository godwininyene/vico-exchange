import { FiSearch } from 'react-icons/fi'
import InputField from './InputField'

const Search = ({ filter, onSearchSubmit }) => {
    
    return (
        <div className="relative w-full sm:w-64 mt-10">
            <form onSubmit={onSearchSubmit}>
                <InputField
                    type="text"
                    placeholder={filter.placeholder || "Search..."}
                    value={filter.value}
                    onChange={filter.onChange}
                    icon={<FiSearch className="h-5 w-5" />}
                    classNames="pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                />
            </form>
        </div>
    )
}

export default Search