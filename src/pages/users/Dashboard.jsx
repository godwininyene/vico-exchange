import { useRef } from "react";
import {
  FiActivity,
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
  FiPhoneCall,
  FiWifi,
  FiCopy,
  FiTv,
  FiZap,
  FiBookOpen,
} from "react-icons/fi";

import { BsCurrencyExchange } from "react-icons/bs";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import VtuTransaction from "../../components/VtuTransaction";
import SectionContainer from "../../components/SectionContainer";
import { Link } from "react-router-dom";
import UserQuickAction from "../../components/UserQuickAction";
import { toast } from "react-toastify";
import EmptyMessage from "../../components/EmptyMessage";
import Loader from "../../components/Loader";
import { BiCopy } from "react-icons/bi";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import OneSignal from "react-onesignal";

const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentVtuTransactions, setRecentVtuTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [vtuBalance, setVtuBalance] = useState("₦0.00");
  const [referralBalance, setReferralBalance] = useState("₦0.00");
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);

  const [virtualAccount, setVirtualAccount] = useState(null);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [generatingAccount, setGeneratingAccount] = useState(false);

  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [backendError, setBackendError] = useState("");

  const reffid = useRef();

  const copyReffLink = () => {
    reffid.current.select();
    navigator.clipboard.writeText(reffid.current.value);
    toast.success("Copied to clipboard!");
  };

  const copyAccountNumber = () => {
    if (!virtualAccount?.accountNumber) return;
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    toast.success("Account number copied!");
  };

  const fetchRecentTransactions = async () => {
    setLoadingRecent(true);
    try {
      const res = await axios.get("api/v1/transactions/recent");
      if (res.data.status === "success") {
        setRecentTransactions(res.data.data.transactions || []);
      }
    } catch {
      toast.error("Failed to fetch recent transactions");
    } finally {
      setLoadingRecent(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/v1/stats/users");

      if (res.data.status === "success") {
        const backendStats = res.data.data.stats || [];

        const formattedStats = backendStats.map((stat) => {
          let icon;

          switch (stat.title) {
            case "Crypto Holdings":
              icon = <BsCurrencyExchange size={24} />;
              break;
            case "Gift Card Balance":
              icon = <FiCreditCard size={24} />;
              break;
            case "VTU Wallet Balance":
              icon = <FiActivity size={24} />;
              setVtuBalance(stat.value);
              break;
            case "Referral Earnings":
              icon = <FiDollarSign size={24} />;
              setReferralBalance(stat.value);
              break;
            case "Monthly Growth":
              icon = <FiTrendingUp size={24} />;
              break;
            default:
              icon = <FiActivity size={24} />;
          }

          return {
            title: stat.title,
            value: stat.value,
            change: stat.change,
            icon,
          };
        });

        setRecentVtuTransactions(res.data.data.recentVtuTransactions || []);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const fetchVirtualAccount = async () => {
    setLoadingAccount(true);

    try {
      const res = await axios.get("api/v1/virtual-accounts");

      if (res.data.status === "success") {
        setVirtualAccount(res.data.data.account);
      }
    } catch {
      console.log("No virtual account yet");
    } finally {
      setLoadingAccount(false);
    }
  };

  const generateVirtualAccount = async () => {

    setBackendError("");

    if (!bvn && !nin) {
      setBackendError("Please enter either your BVN or NIN");
      return;
    }

    setGeneratingAccount(true);

    try {

      const payload = {};

      if (bvn) payload.bvn = bvn.trim();
      if (nin) payload.nin = nin.trim();

      const res = await axios.post("api/v1/virtual-accounts", payload);

      if (res.data.status === "success") {

        setVirtualAccount(res.data.data);

        toast.success("Funding account generated successfully");

        setShowAccountModal(false);

        setBvn("");
        setNin("");
      }

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Failed to generate funding account";

      setBackendError(message);
      toast.error(message)

    } finally {
      setGeneratingAccount(false);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchStats();
    fetchVirtualAccount();
  }, []);

  useEffect(() => {
    const showPrompt = async () => {
      // 1. Check if the SDK is available
      if (!OneSignal) return;

      // 2. Access the property (Getter) - no 'await' or '()' needed here
      const currentPermission = OneSignal.Notifications.permission;

      // 3. If they haven't granted permission yet, show the prompt
      if (currentPermission !== "granted") {
        try {
          // 4. THE METHOD: promptPush IS a method and it IS asynchronous
          await OneSignal.Slidedown.promptPush();
        } catch (e) {
          console.error("Slidedown failed to load", e);
        }
      }
    };

    const timer = setTimeout(showPrompt, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="pb-10">

      <div className="relative rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-primary-dark to-primary-light text-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-t-3xl bg-white dark:bg-gray-900 pt-6 pb-8 px-6 shadow-lg">

            <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              Welcome Back, {user.firstName}!
            </h1>

            <p className="text-gray-500 mb-6">
              Here's your financial overview
            </p>

            <div className="my-4">
              <label className="block text-sm text-gray-600 dark:text-gray-400">
                Referral Link
              </label>

              <div className="flex items-center mt-1">
                <input
                  type="text"
                  ref={reffid}
                  readOnly
                  value={`${import.meta.env.VITE_APP_URL}/signup?refid=${user.accountId}`}
                  className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-700 text-gray-800 dark:text-white"
                />

                <button
                  onClick={copyReffLink}
                  className="p-2 bg-primary-light text-white rounded-r-lg flex items-center"
                >
                  <BiCopy className="w-6 h-6" />Copy
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
                <p className="text-emerald-100">VTU Wallet Balance</p>
                <h2 className="text-3xl font-bold text-white">{vtuBalance}</h2>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
                <p className="text-blue-100">Referral Balance</p>
                <h2 className="text-3xl font-bold text-white">{referralBalance}</h2>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border">

              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Fund Your VTU Wallet
              </h3>

              {loadingAccount ? (
                <Loader size={6} />
              ) : virtualAccount ? (
                <>
                  {/* Show funding notice with VTU charge */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Transfer to this account to fund your wallet instantly (₦50 charge applies).
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                    Your wallet will be funded automatically once the payment is confirmed.
                  </p>

                  <div className="space-y-3">

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Bank</p>
                      <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                        {virtualAccount.bankName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Account Number
                      </p>

                      <div className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2">
                        <p className="font-semibold tracking-wide text-gray-900 dark:text-gray-100">
                          {virtualAccount.accountNumber}
                        </p>

                        <button
                          onClick={copyAccountNumber}
                          className="flex items-center gap-1 text-primary-dark text-sm font-medium"
                        >
                          <FiCopy size={16} />
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Account Name</p>
                      <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                        {virtualAccount.accountName}
                      </p>
                    </div>

                  </div>
                </>
              ) : (
                <div className="text-center py-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    You don't have a funding account yet
                  </p>

                  <button
                    onClick={() => setShowAccountModal(true)}
                    className="bg-primary-dark text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Generate Funding Account
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAccountModal}
        closeModal={() => setShowAccountModal(false)}
        header="Generate Funding Account"
      >
        <div className="p-6">

          <p className="text-gray-600 mb-2">
            To generate your dedicated bank account for funding your wallet,
            we are required by banking regulations to verify your identity.
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Please provide <span className="font-semibold">BVN OR NIN</span>.
            You only need to enter <span className="font-semibold">one</span> of them.
          </p>

          <InputField
            label="BVN"
            name="bvn"
            placeholder="Enter your BVN"
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
          />

          <p className="text-center text-gray-400 my-3 font-medium">OR</p>

          <InputField
            label="NIN"
            name="nin"
            placeholder="Enter your NIN"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
          />

          <p className="text-xs text-gray-400 mt-2 mb-4">
            Your information is securely encrypted and used only for identity verification.
          </p>

          {backendError && (
            <p className="text-red-500 text-sm mb-3">
              {backendError}
            </p>
          )}

          <button
            onClick={generateVirtualAccount}
            disabled={generatingAccount}
            className="w-full bg-primary-dark text-white py-3 rounded-lg"
          >
            {generatingAccount ? "Generating..." : "Generate Account"}
          </button>

        </div>
      </Modal>

      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <UserQuickAction Icon={FiWifi} label="Buy Data" url="/user/buy-data" color="indigo" />
          <UserQuickAction Icon={FiPhoneCall} label="Buy Airtime" url="/user/buy-airtime" color="red" />
          <UserQuickAction Icon={FiZap} label="Electricity" url="/user/buy-electricity-token" color="yellow" />
          <UserQuickAction Icon={FiTv} label="Cable TV" url="/user/buy-cable-tv" color="purple" />
          <UserQuickAction Icon={FiBookOpen} label="Education Pins" url="/user/education" color="green" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <SectionContainer
          title="Recent Transactions"
          actionButton={
            <Link to="/user/vtu-transactions" className="text-sm text-primary-dark hover:underline">
              View All
            </Link>
          }
        >
          {loadingRecent ? (
            <Loader size={8} />
          ) : recentVtuTransactions.length ? (
            recentVtuTransactions.map((tx, index) => (
              <VtuTransaction key={index} transaction={tx} variant="dashboard" />
            ))
          ) : (
            <EmptyMessage message="No recent VTU transactions found" />
          )}
        </SectionContainer>
      </div>

    </div>
  );
};

export default Dashboard;