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
import Transaction from "../../components/Transaction";
import VtuTransaction from "../../components/VtuTransaction";
import SectionContainer from "../../components/SectionContainer";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import UserQuickAction from "../../components/UserQuickAction";
import { toast } from "react-toastify";
import EmptyMessage from "../../components/EmptyMessage";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentVtuTransactions, setRecentVtuTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [vtuBalance, setVtuBalance] = useState("₦0.00");
  const [loading, setLoading] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [fetched, setFetched] = useState(false);

  const [virtualAccount, setVirtualAccount] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(false);

  const [stats, setStats] = useState([
    { title: "Total Assets", value: "$0.00", change: "0%", icon: <FiDollarSign size={24} /> },
    { title: "Crypto Holdings", value: "$0.00", change: "0%", icon: <BsCurrencyExchange size={24} /> },
    { title: "Gift Card Balance", value: "$0.00", change: "0%", icon: <FiCreditCard size={24} /> },
    { title: "VTU Wallet Balance", value: "₦0.00", change: "0%", icon: <FiActivity size={24} /> },
    { title: "Monthly Growth", value: "$0.00", change: "0%", icon: <FiTrendingUp size={24} /> },
  ]);

  const fetchRecentTransactions = async () => {
    setLoadingRecent(true);
    try {
      const res = await axios.get("api/v1/transactions/recent");
      if (res.data.status === "success") {
        setRecentTransactions(res.data.data.transactions || []);
      }
    } catch (err) {
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
            case "Total Assets":
              icon = <FiDollarSign size={24} />;
              setAccountBalance(stat.value);
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

        setStats(formattedStats);
        setFetched(true);
        setRecentVtuTransactions(res.data.data.recentVtuTransactions || []);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard statistics");
      console.log('STATS ERROR:', error);
      
    } finally {
      setLoading(false);
    }
  };

  const fetchVirtualAccount = async () => {
    setLoadingAccount(true);
    try {
      const res = await axios.get("api/v1/wallet/virtual-account");
      if (res.data.status === "success") {
        setVirtualAccount(res.data.data.account);
      }
    } catch (error) {
      toast.error("Failed to load funding account");
    } finally {
      setLoadingAccount(false);
    }
  };

  const copyAccountNumber = () => {
    if (!virtualAccount?.accountNumber) return;
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    toast.success("Account number copied!");
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchStats();
    fetchVirtualAccount();
  }, []);


  return (
    <div className="pb-10">
      {/* Hero */}
      <div className="relative rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-primary-dark to-primary-light text-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-t-3xl bg-white dark:bg-gray-900 pt-6 pb-8 px-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-500 mb-6">Here's your financial overview</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
                <p className="text-emerald-100">VTU Wallet Balance</p>
                <h2 className="text-3xl font-bold text-white">{vtuBalance}</h2>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
                <p className="text-blue-100">Total Assets (Crypto & Gift cards)</p>
                <h2 className="text-3xl font-bold text-white">{accountBalance}</h2>
              </div>
            </div>

            {/* Virtual Account */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border">
              <h3 className="font-semibold mb-2">Fund Your VTU Wallet</h3>
              {loadingAccount ? (
                <Loader size={6} />
              ) : virtualAccount ? (
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bank</p>
                    <p className="font-medium">{virtualAccount.bankName}</p>

                    <p className="text-sm text-gray-500 mt-2">Account Number</p>
                    <p className="font-semibold text-lg">{virtualAccount.accountNumber}</p>

                    <p className="text-sm text-gray-500 mt-2">Account Name</p>
                    <p className="font-medium">{virtualAccount.accountName}</p>
                  </div>

                  <button
                    onClick={copyAccountNumber}
                    className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-lg"
                  >
                    <FiCopy /> Copy
                  </button>
                </div>
              ) : (
                <EmptyMessage message="No funding account available" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-5 relative z-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard stat={stat} key={index} loading={loading && !fetched} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
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
          <UserQuickAction Icon={FiDollarSign} label="Sell Gift Card" url="/user/sell-giftcard" color="blue" />
          <UserQuickAction Icon={BsCurrencyExchange} label="Buy Crypto" url="/user/buy-crypto" color="green" />
          <UserQuickAction Icon={FiCreditCard} label="Buy Gift Card" url="/user/buy-giftcard" color="purple" />
          <UserQuickAction Icon={FiTrendingUp} label="Sell Crypto" url="/user/sell-crypto" color="orange" />
        </div>
      </div>

      {/* VTU Transactions */}
      <div className="container mx-auto px-4 mt-10">
        <SectionContainer 
        title="Recent VTU Transactions"
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

      {/* Crypto & Gift Card Transactions */}
      <div className="container mx-auto px-4 mt-10">
        <SectionContainer
          title="Recent Crypto & Gift Card Transactions"
          actionButton={
            <Link to="/user/transactions" className="text-sm text-primary-dark hover:underline">
              View All
            </Link>
          }
        >
          {loadingRecent ? (
            <Loader size={8} />
          ) : recentTransactions.length ? (
            recentTransactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                variant="dashboard"
                context="user"
              />
            ))
          ) : (
            <EmptyMessage message="No recent transactions found" />
          )}
        </SectionContainer>
      </div>


    </div>
  );
};

export default Dashboard;