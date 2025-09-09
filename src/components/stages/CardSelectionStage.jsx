import AssetCard from "../../components/AssetCard";

const CardSelectionStage = ({ cards, processing, onCardSelect, title, description }) => {
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
        cards.length > 0 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {title || "Select Gift Card"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {description || "Select a gift card"}
            </p>
          </>
        )
      }

      {cards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No gift cards available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <AssetCard
              key={card.id}
              asset={card}
              assetType="giftcard"
              onClick={onCardSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSelectionStage;