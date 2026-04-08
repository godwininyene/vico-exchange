import { useState, useRef, useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import InputField from "../../components/InputField";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import formatDate from "../../utils/formatDate";
import Loader from "../../components/Loader";

// Helper: get initials
const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

// Helper: simple avatar colors
const avatarColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-emerald-500",
];
const getAvatarColor = (name) => {
  if (!name) return "bg-gray-400";
  const charCode = name.charCodeAt(0);
  return avatarColors[charCode % avatarColors.length];
};

const Referrals = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalRefferals, setTotalRefferals] = useState(0);
  const [referralBalance, setReferralBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingReferrals, setLoadingReferrals] = useState(true);

  const reffid = useRef();

  // Copy link
  const copyReffLink = () => {
    reffid.current.select();
    navigator.clipboard.writeText(reffid.current.value);
    toast.success("Copied to clipboard!");
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const link = `${import.meta.env.VITE_APP_URL}/signup?refid=${user.accountId}`;
    const message = `Join Winsubz and enjoy cheap data & airtime 💸\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  // Withdraw referral earnings
  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return toast.error("Enter a valid amount");
    }

    if (numericAmount > referralBalance) {
      return toast.error("Insufficient referral balance");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/v1/users/withdraw-referral", {
        amount: numericAmount,
      });

      if (res.data.status === "success") {
        toast.success("Withdrawal successful!");
        setReferralBalance(res.data.data.referralBalance);
        setAmount("");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch referrals & stats
  const fetchReferrals = async () => {
    try {
      setLoadingStats(true);
      setLoadingReferrals(true);

      const res = await axios.get("/api/v1/users/my-referrals");

      if (res.data.status === "success") {
        const data = res.data.data;

        setReferrals(data.referrals || []);
        setTotalRefferals(data.total || 0);
        setReferralBalance(Number(data.referralBalance) || 0);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load referrals");
    } finally {
      setLoadingStats(false);
      setLoadingReferrals(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">My Referrals</h1>

      {/* Referral Link */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <label className="block text-sm text-gray-600 dark:text-gray-400 font-bold mb-2">
          Your referral link
        </label>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Share this link and earn when people sign up
        </p>

        <div className="flex items-center mt-1">
          <input
            type="text"
            ref={reffid}
            readOnly
            value={`${import.meta.env.VITE_APP_URL}/signup?refid=${user.accountId}`}
            className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          <button
            onClick={copyReffLink}
            className="p-2 bg-primary-light text-white rounded-r-lg flex items-center"
          >
            <BiCopy className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={shareOnWhatsApp}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Share on WhatsApp
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
          <p className="text-emerald-100">Total Referrals</p>
          {loadingStats ? (
            <Loader size={6} />
          ) : (
            <h2 className="text-3xl font-bold text-white">{totalRefferals}</h2>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
          <p className="text-blue-100">Referral Earnings</p>
          {loadingStats ? (
            <Loader size={6} />
          ) : (
            <h2 className="text-3xl font-bold text-white">
              ₦{referralBalance.toLocaleString()}
            </h2>
          )}
        </div>
      </div>

      {/* Withdraw Form */}
      <form
        className="my-7 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white">Withdraw to Wallet</h3>

        <InputField
          label="Amount (₦)"
          name="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-3 bg-primary-dark text-white px-4 py-2 rounded-lg text-sm disabled:opacity-70"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>

      {/* Referrals List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Your Referrals</h3>

        {loadingReferrals ? (
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-96 flex items-center justify-center">
              <Loader size={8} />
            </div>
          </div>
        ) : referrals.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No referrals yet.
          </p>
        ) : (
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                {ref.photo ? (
                  <img
                    src={ref.photo}
                    alt={ref.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-semibold ${getAvatarColor(
                      ref.firstName
                    )}`}
                  >
                    {getInitials(ref.firstName, ref.lastName)}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {ref.firstName} {ref.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(ref.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Referrals;