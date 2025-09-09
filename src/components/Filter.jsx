import SelectField from './SelectField' 

const Filter = ({ filter, index }) => {
    return (
        <div className="w-full sm:w-auto">
            <SelectField
                name={filter.id || `filter-${index}`}
                label={filter.label}
                value={filter.value}
                onChange={filter.onChange}
                options={filter.options}
                classNames="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                variant="default"
                isRequired={false}
            />
        </div>
    )
}

export default Filter