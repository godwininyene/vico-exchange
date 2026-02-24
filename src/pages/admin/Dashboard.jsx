import {
  FiUsers,
  FiCreditCard,
  FiActivity,
  FiSettings,
} from "react-icons/fi";
import { BsCurrencyExchange } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import AdminQuickAction from "../../components/AdminQuickAction";
import Transaction from "../../components/Transaction";
import PendingActionCard from "../../components/PendingActionCard";
import ChartContainer from "../../components/ChartContainer";
import MetricsHeader from "../../components/MetricsHeader";
import SectionContainer from "../../components/SectionContainer";
import { useState, useEffect } from "react";
import axios from "./../../lib/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EmptyMessage from "../../components/EmptyMessage";
import Loader from "../../components/Loader";
import VtuTransaction from "../../components/VtuTransaction";

const Dashboard = () => {
  // State for stats data
  const [stats, setStats] = useState([
    {
      title: "Total Users",
      value: "0",
      change: "0%",
      icon: <FiUsers size={24} />,
    },
    {
      title: "Total Transactions",
      value: "₦0",
      change: "0%",
      icon: <FiActivity size={24} />,
    },
    {
      title: "VTU Volume",
      value: "₦0",
      change: "0%",
      icon: <BsCurrencyExchange size={24} />,
    },

    {
      title: "VTU Profit",
      value: "₦0",
      change: "0%",
      icon: <BsCurrencyExchange size={24} />,
    },
    {
      title: "Gift Card Volume",
      value: "₦0",
      change: "0%",
      icon: <FiCreditCard size={24} />,
    },
    {
      title: "Crypto Volume",
      value: "₦0",
      change: "0%",
      icon: <BsCurrencyExchange size={24} />,
    },
  ]);

  // Chart states
  const [transactionVolumeData, setTransactionVolumeData] = useState({
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#4F46E5"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
          formatter: (value) => `₦${(value / 1000).toFixed(0)}k`,
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
      tooltip: {
        y: { formatter: (value) => `₦${value.toLocaleString()}` },
      },
    },
    series: [{ name: "Transaction Volume", data: [] }],
  });

  const [userGrowthData, setUserGrowthData] = useState({
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#10B981"],
      markers: { size: 5, hover: { size: 7 } },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    },
    series: [{ name: "New Users", data: [] }],
  });

  const [transactionTypeData, setTransactionTypeData] = useState({
    options: {
      chart: {
        type: "donut",
        height: 350,
        foreColor: "#fff",
      },
      labels: [],
      colors: [
        "#4F46E5",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
      ],
      legend: {
        position: "bottom",
        labels: {
          colors: "#6B7280",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Transactions",
                formatter: () => "₦0",
                color: "#6B7280",
              },
              value: {
                color: "#6B7280",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" },
          },
        },
      ],
    },
    series: [],
  });

  const [activePeriod, setActivePeriod] = useState("Monthly");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentVtuTransactions, setRecentVtuTransactions] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const periods = ["Daily", "Weekly", "Monthly"];

  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);

  const fetchRecentTransactions = async () => {
    setLoadingRecent(true);
    try {
      const res = await axios.get("api/v1/transactions/recent");
      if (res.data.status === "success") {
        setRecentTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRecent(false);
    }
  };

  const fetchPendingTransactions = async () => {
    setLoadingPending(true);
    try {
      const res = await axios.get("api/v1/transactions/pending");
      if (res.data.status === "success") {
        setPendingTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPending(false);
    }
  };
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/v1/stats/admin");
      if (res.data.status === "success") {
        const backendStats = res.data.data.stats;

        const formattedStats = backendStats.map((stat) => {
          let icon;
          switch (stat.title) {
            case "Total Users":
              icon = <FiUsers size={24} />;
              break;
            case "Total Transactions":
              icon = <FiActivity size={24} />;
              break;
            case "VTU Volume":
              icon = <FiActivity size={24} />;
              break;
            case "VTU Profit":
              icon = <BsCurrencyExchange size={24} />;
              break;
            case "Crypto Volume":
              icon = <BsCurrencyExchange size={24} />;
              break;
            default:
              icon = <FiActivity size={24} />;
          }

          return {
            title: stat.title,
            total: stat.total,
            currentValue: stat.currentValue,
            preValue: stat.preValue,
            change: stat.change,
            icon: icon
          };
        });

        setStats(formattedStats);
        setFetched(true);
        setRecentVtuTransactions(res.data.data.recentVtuTransactions || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  // Fetch chart data
  const fetchChartData = async (period = "monthly") => {
    setChartLoading(true);
    try {
      const res = await axios.get(`api/v1/stats/admin/charts?period=${period}`);

      if (res.data.status === "success") {
        const data = res.data.data;

        // Transform transaction volume data
        const volumeSeries = [
          {
            name: "Transaction Volume",
            data: data.transactionVolume.map(
              (item) => parseInt(item.totalAmount) || 0
            ),
          },
        ];

        const volumeCategories = data.transactionVolume.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });
        });

        // Transform user growth data
        const growthSeries = [
          {
            name: "New Users",
            data: data.userGrowth.map((item) => parseInt(item.newUsers) || 0),
          },
        ];

        const growthCategories = data.userGrowth.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });
        });

        // Transform transaction type data
        const typeSeries = data.transactionTypes.map(
          (item) => parseInt(item.count) || 0
        );
        const typeLabels = data.transactionTypes.map(
          (item) => `${item.assetType} ${item.transactionType}`
        );

        // Calculate total for donut chart
        const totalTransactions = data.transactionTypes.reduce(
          (sum, item) => sum + (parseInt(item.count) || 0),
          0
        );

        // Update transaction volume chart
        setTransactionVolumeData({
          options: {
            ...transactionVolumeData.options,
            xaxis: {
              ...transactionVolumeData.options.xaxis,
              categories: volumeCategories,
            },
          },
          series: volumeSeries,
        });

        // Update user growth chart
        setUserGrowthData({
          options: {
            ...userGrowthData.options,
            xaxis: {
              ...userGrowthData.options.xaxis,
              categories: growthCategories,
            },
          },
          series: growthSeries,
        });

        // Update transaction types chart
        setTransactionTypeData({
          options: {
            ...transactionTypeData.options,
            labels: typeLabels,
            plotOptions: {
              pie: {
                donut: {
                  size: "65%",
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: "Total Transactions",
                      formatter: () => `${totalTransactions}`,
                      color: "#6B7280",
                    },
                    value: {
                      color: "#6B7280",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  },
                },
              },
            },
          },
          series: typeSeries,
        });
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      toast.error("Failed to fetch chart data");
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchPendingTransactions();
    fetchStats();
    fetchChartData("monthly");
  }, []);

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
    const backendPeriod = period.toLowerCase();
    fetchChartData(backendPeriod);
  };

  const handleReviewAction = (action) => {
    console.log("Review action:", action);
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <PageHeader
        primaryHeader={"Admin Dashboard"}
        secondaryHeader={"Overview of platform activities and metrics"}
      />

      {/* Stats Cards */}
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard stat={stat} key={index} loading={loading && !fetched} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-2">
            {/* Quick Admin Actions */}
          <div className="mb-8">
            <SectionContainer title="Quick Actions">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                <AdminQuickAction
                  Icon={FiUsers}
                  label="Manage Users"
                  url="/admin/users"
                  color="blue"
                />
                <AdminQuickAction
                  Icon={FiCreditCard}
                  label="Gift Cards"
                  url="/admin/giftcards"
                  color="green"
                />
                <AdminQuickAction
                  Icon={BsCurrencyExchange}
                  label="Crypto"
                  url="/admin/coins"
                  color="purple"
                />
                <AdminQuickAction
                  Icon={RiExchangeLine}
                  label="Transactions"
                  url="/admin/transactions"
                  color="yellow"
                />
                <AdminQuickAction
                  Icon={FiSettings}
                  label="Settings"
                  url="/admin/settings"
                  color="gray"
                />
              </div>
            </SectionContainer>
          </div>
           {/* VTU Transactions */}
          <SectionContainer
            title="Recent VTU Transactions"
            className="mb-4"
            actionButton={<Link to="/admin/vtu-transactions" className="text-sm text-primary-dark hover:underline">View All</Link>}
          >
            
            {loading ? <Loader size={8} /> : recentVtuTransactions.length ? (
              recentVtuTransactions.map((tx, i) => (
                <VtuTransaction key={tx.providerRef || i} transaction={tx} variant="dashboard" context="admin" />
              ))
            ) : <EmptyMessage message="No recent VTU transactions found" />}
          </SectionContainer>
          {/* Crypto & Gift Card Transactions */}
          <SectionContainer
            title="Recent Activities"
            actionButton={
              <Link
                to="/admin/transactions"
                className="text-sm text-primary-dark dark:text-primary-light hover:underline"
              >
                View All
              </Link>
            }
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loadingRecent ? (
                <Loader size={8} />
              ) : recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <Transaction
                    key={transaction.id}
                    transaction={transaction}
                    variant="dashboard"
                    context="admin"
                  />
                ))
              ) : (
                <EmptyMessage message="No recent transactions found" />
              )}

            </div>
          </SectionContainer>

        
        </div>

        {/* Pending Actions */}
        <div>
          <SectionContainer
            title="Pending Actions"
            actionButton={
              <Link
                to="/admin/transactions"
                className="text-sm text-primary-dark dark:text-primary-light hover:underline"
              >
                View All
              </Link>
            }
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">

              {loadingPending ? (
                <Loader size={8} />
              ) : recentTransactions.length > 0 ? (
                pendingTransactions.map((transaction) => (
                  <PendingActionCard
                    key={transaction.id}
                    transaction={transaction}
                    onReview={handleReviewAction}
                  />
                ))
              ) : (
                <EmptyMessage message="No pending transactions found" />
              )}

            </div>
          </SectionContainer>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="mt-8">
        <SectionContainer title="Platform Metrics" className="p-6">
          <MetricsHeader
            periods={periods}
            activePeriod={activePeriod}
            onPeriodChange={handlePeriodChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ChartContainer
              title="Transaction Volume (₦)"
              className="lg:col-span-2"
              loading={chartLoading}
            >
              <Chart
                options={transactionVolumeData.options}
                series={transactionVolumeData.series}
                type="area"
                height={350}
              />
            </ChartContainer>

            <ChartContainer title="User Growth" loading={chartLoading}>
              <Chart
                options={userGrowthData.options}
                series={userGrowthData.series}
                type="line"
                height={350}
              />
            </ChartContainer>
          </div>

          <div className="mt-8">
            <ChartContainer title="Transaction Types" loading={chartLoading}>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <Chart
                    options={transactionTypeData.options}
                    series={transactionTypeData.series}
                    type="donut"
                    height={350}
                  />
                </div>
              </div>
            </ChartContainer>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Dashboard;
