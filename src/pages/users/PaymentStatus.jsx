import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../lib/axios";
import Loader from "../../components/Loader";
import { FiCheckCircle, FiClock, FiXCircle, FiArrowRight } from "react-icons/fi";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentReference = searchParams.get("paymentReference");

  const [checking, setChecking] = useState(false);
  const [state, setState] = useState("initial"); // "initial" | "success" | "failed"
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    if (!paymentReference) {
      setState("failed");
      setMessage("Invalid payment reference");
      return;
    }

    setChecking(true);
    setMessage("Verifying with payment network...");

    try {
      const res = await axios.get(`/api/v1/payments/verify/${paymentReference}`);
      const backendStatus = res.data.status;
      const backendMessage = res.data.message;

      if (backendStatus === "success") {
        setState("success");
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2500);
        return;
      }

      // If backend says failed or pending (meaning Monnify hasn't received it yet)
      setState("failed");
      setMessage(backendMessage || "We couldn't confirm this payment yet. If you have been debited, your wallet will update automatically via background channels shortly.");

    } catch (err) {
      setState("failed");
      setMessage("Network validation timeout. Please try verifying again shortly.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8 text-center border border-gray-100 dark:border-gray-700/50">
        
        {/* STATE 1: INITIAL LANDING SCREEN */}
        {state === "initial" && (
          <>
            <FiClock className="mx-auto w-16 h-16 text-amber-500 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
              Confirm Your Action
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              Have you completed the payment processing authorization inside your financial portal?
            </p>

            <button
              onClick={handleVerify}
              disabled={checking}
              className="w-full flex items-center justify-center gap-2 cursor-pointer bg-primary-dark hover:bg-opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md disabled:opacity-50"
            >
              {checking ? (
                <>
                  <Loader size={4} /> Checking...
                </>
              ) : (
                <>
                  Yes, I have paid <FiArrowRight />
                </>
              )}
            </button>

            <button
              onClick={() => navigate("/user/dashboard")}
              disabled={checking}
              className="w-full mt-3 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-4 rounded-xl transition disabled:opacity-50 text-sm"
            >
              No, Cancel and Return
            </button>
          </>
        )}

        {/* STATE 2: SUCCESS */}
        {state === "success" && (
          <>
            <FiCheckCircle className="mx-auto w-16 h-16 text-emerald-500 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Payment Successful</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Your wallet balance has updated successfully.</p>
            <p className="text-xs font-semibold text-primary-light mt-5 animate-pulse">Redirecting to dashboard...</p>
          </>
        )}

        {/* STATE 3: FAILED / UNCONFIRMED */}
        {state === "failed" && (
          <>
            <FiXCircle className="mx-auto w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Payment Unconfirmed</h2>
            {message && (
              <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-left mt-2">
                {message}
              </p>
            )}
            
            <button
              onClick={handleVerify}
              className="w-full mt-4 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl transition text-sm shadow-sm"
            >
              Re-check Status
            </button>

            <button
              onClick={() => navigate("/user/dashboard")}
              className="w-full cursor-pointer mt-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-xl transition text-sm"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;