import InputField from "../InputField";
import SelectField from "../SelectField";

const CableFormStage = ({
    selectedProvider,
    decoderNumber,
    phoneNumber,
    plans = [],
    selectedPlan,
    onDecoderNumberChange,
    onPhoneNumberChange,
    onPlanSelect,
    onSubmit,
}) => {
    const isDisabled =
        !decoderNumber ||
        !phoneNumber ||
        phoneNumber.length < 11 ||
        !selectedPlan;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
                <img
                    src={selectedProvider.logo}
                    alt={selectedProvider.name}
                    className="w-12 h-12 object-contain mr-4 rounded-lg"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Buy {selectedProvider.name} Subscription
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enter decoder details and select a plan
                    </p>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Plan Selection */}
                <SelectField
                    label="Subscription Plan"
                    value={selectedPlan?.value || ""}
                    onChange={(e) => {
                        const plan = plans.find((p) => p.value === e.target.value);
                        onPlanSelect(plan);
                    }}
                    options={[
                        { label: "Select a plan", value: "" },
                        ...plans.map((plan) => ({
                            label: `${plan.display_name} - ₦${Number(plan.price).toLocaleString()}` ,
                            value: plan.value,
                        })),
                    ]}
                />

                {/* Decoder Number */}
                <InputField
                    label="Decoder / Smart Card Number"
                    placeholder="1234567890"
                    value={decoderNumber}
                    onChange={(e) => onDecoderNumberChange(e.target.value)}
                />

                {/* Phone Number */}
                <InputField
                    label="Phone Number"
                    placeholder="08012345678"
                    value={phoneNumber}
                    onChange={(e) => onPhoneNumberChange(e.target.value)}
                />



                <button
                    type="submit"
                    disabled={isDisabled}
                    className={`w-full font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${isDisabled
                            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                            : "bg-primary-dark hover:bg-primary-light text-white"
                        }`}
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default CableFormStage;