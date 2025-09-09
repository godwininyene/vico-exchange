import React from 'react';
import { FiFilter } from "react-icons/fi";
import Search from './Search';
import Filter from './Filter';
const DataFilters = ({filterHeader = '', filters = [], onSearchSubmit}) => {
    return (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FiFilter className="mr-2" /> {filterHeader} Filters
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                    {filters.map((filter, index) => (
                        <React.Fragment key={index}>
                            {filter.type === 'input' ? (
                                <Search filter={filter} onSearchSubmit={onSearchSubmit}/>
                            ) : filter.type === 'select' ? (
                                // Dynamic Filters
                               <Filter filter={filter} index={index} />
                            ) : null}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataFilters;