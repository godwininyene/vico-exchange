const PageHeader = ({primaryHeader, secondaryHeader, children})=>{
    return(
        <div className="bg-white px-4 dark:px-0 dark:bg-gray-900 py-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className=''>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{primaryHeader}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{secondaryHeader}</p>
                </div>

              {children}
            </div>
        </div>
    )
}

export default PageHeader