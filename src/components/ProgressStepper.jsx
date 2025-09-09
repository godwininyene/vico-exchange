import { FaCheck } from "react-icons/fa";
const ProgressStepper = ({ steps, currentStep }) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="mb-8">
      <nav className="flex items-center justify-center">
        <ol className="flex items-center space-x-4 w-full">
          {steps.map((step, index) => (
            <li key={step.id} className="flex-1">
              {index < currentStepIndex ? (
                <div className="group flex flex-col items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-dark dark:bg-primary-light text-white">
                    <FaCheck className="w-4 h-4" />
                  </span>
                  <span className="mt-2 text-sm font-medium text-primary-dark dark:text-primary-light">
                    {step.name}
                  </span>
                </div>
              ) : index === currentStepIndex ? (
                <div className="flex flex-col items-center" aria-current="step">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary-dark dark:border-primary-light bg-white dark:bg-gray-800">
                    <span className="text-primary-dark dark:text-primary-light">
                      {index + 1}
                    </span>
                  </span>
                  <span className="mt-2 text-sm font-medium text-primary-dark dark:text-primary-light">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex flex-col items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <span>{index + 1}</span>
                  </span>
                  <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressStepper;
