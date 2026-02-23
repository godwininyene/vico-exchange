const AssetCard = ({ asset, assetType, onClick }) => {
  // Determine which properties to use based on asset type
  const getAssetDetails = () => {
    if (assetType === 'giftcard') {
      return {
        id: asset.id,
        name: asset.cardName,
        image: asset.cardLogo,
        rate: asset.cardRate,
        type: asset.cardType
      };
    } else if (assetType === 'coin') {
      return {
        id: asset.id,
        name: asset.coinName,
        image: asset.coinImage,
        rate: asset.coinRate,
        address: asset.coinAddress
      };
    } else if (assetType == 'network') {
      return {
        id: asset.identifier,
        name: asset.name,
        image: asset.logo,
      };
    }
    return {};
  };

  const assetDetails = getAssetDetails();

  const handleClick = () => {
    if (onClick) {
      onClick(asset);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="asset-card bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col items-center"
    >
      <img
        src={assetDetails.image}
        alt={assetDetails.name}
        className="w-16 h-16 object-contain mb-3 rounded-2xl"
      />
      <h3 className="font-medium text-gray-800 dark:text-white text-center">
        {assetDetails.name}
      </h3>
      {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Rate: ₦{assetDetails.rate.toLocaleString()}/$
      </p> */}

      {/* Show rate only for coin & giftcard */}
      {assetDetails.rate && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Rate: ₦{assetDetails.rate.toLocaleString()}/$
        </p>
      )}
      {assetType === 'giftcard' && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Type: {assetDetails.type}
        </p>
      )}
    </div>
  );
};

export default AssetCard;