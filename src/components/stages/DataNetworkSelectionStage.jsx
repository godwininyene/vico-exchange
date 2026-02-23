import AssetCard from "../AssetCard";

const NetworkSelectionStage = ({ networks, processing, onNetworkSelect, title, description }) => {
  if (processing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      {
        networks.length > 0 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {title || "Select Network"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {description || "Select a netowrk"}
            </p>
          </>
        )
      }

      {networks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No networks available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {networks.map((network) => (
            <AssetCard
              key={network.identifier}
              asset={network}
              assetType="network"
              onClick={onNetworkSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSelectionStage;