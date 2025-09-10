import {
  FiActivity,
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { BsCurrencyExchange } from "react-icons/bs";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import Transaction from "../../components/Transaction";
import SectionContainer from "../../components/SectionContainer";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import UserQuickAction from "../../components/UserQuickAction";
import { toast } from "react-toastify";
import EmptyMessage from "../../components/EmptyMessage";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [fetched, setFetched] = useState(false);

  // Initialize stats as an array, not an object
  const [stats, setStats] = useState([
    {
      title: "Total Assets",
      value: "$0.00",
      change: "0%",
      icon: <FiDollarSign size={24} />,
    },
    {
      title: "Crypto Holdings",
      value: "$0.00",
      change: "0%",
      icon: <BsCurrencyExchange size={24} />,
    },
    {
      title: "Gift Card Balance",
      value: "$0.00",
      change: "0%",
      icon: <FiCreditCard size={24} />,
    },
    {
      title: "Monthly Growth",
      value: "$0.00",
      change: "0%",
      icon: <FiTrendingUp size={24} />,
    }
  ]);

  const fetchRecentTransactions = async () => {
    setLoadingRecent(true);
    try {
      const res = await axios.get("api/v1/transactions/recent");
      if (res.data.status === "success") {
        setRecentTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.log(err);
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
        const backendStats = res.data.data.stats;

        const formattedStats = backendStats.map((stat) => {
          let icon;
          switch (stat.title) {
            case "Total Assets":
              icon = <FiDollarSign size={24} />;
              setAccountBalance(stat.value);
              break;
            case "Crypto Holdings":
              icon = <BsCurrencyExchange size={24} />;
              break;
            case "Gift Card Balance":
              icon = <FiCreditCard size={24} />;
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
            icon: icon,
          };
        });

        setStats(formattedStats);
        setFetched(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchStats();
  }, []);

  return (
    <div className="pb-10">
      {/* Hero Section with Curved Design */}
      <div className="relative rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-primary-dark  to-primary-light text-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-t-3xl bg-white dark:bg-gray-900 pt-6 pb-8 px-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Here's your financial overview
            </p>

            {/* Account Balance Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100">Total Balance</p>
                  <h2 className="text-3xl font-bold text-white mt-1">
                    {accountBalance.toLocaleString()}
                  </h2>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <FiActivity className="text-white" size={24} />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Link to='/user/sell-crypto' className="cursor-pointer bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Quick Trade
                </Link>
                <Link to='/user/transactions' className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-gray-900 rounded-t-3xl"></div>
      </div>

      {/* Stats Cards */}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserQuickAction
            Icon={FiDollarSign}
            label="Sell Gift Card"
            url="/user/sell-giftcard"
            color="blue"
          />
          <UserQuickAction
            Icon={BsCurrencyExchange}
            label="Buy Crypto"
            url="/user/buy-crypto"
            color="green"
          />

          <UserQuickAction
            Icon={FiCreditCard}
            label="Buy Gift Card"
            url="/user/buy-giftcard"
            color="purple"
          />

          <UserQuickAction
            Icon={FiTrendingUp}
            label="Sell Crypto"
            url="/user/sell-crypto"
            color="yellow"
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="container mx-auto px-4 mt-10">
        <SectionContainer
          title="Recent Activities"
          actionButton={
            <Link
              to="/user/transactions"
              className="text-sm text-primary-dark dark:text-primary-light hover:underline"
            >
              View All
            </Link>
          }
        >
          {loadingRecent ? (
            <Loader size={8} />
          ) : recentTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentTransactions.map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  variant="dashboard"
                  context="user"
                />
              ))}
            </div>
          ) : (
            <EmptyMessage message="No recent transactions found" />
          )}
        </SectionContainer>
      </div>
    </div>
  );
};

export default Dashboard;