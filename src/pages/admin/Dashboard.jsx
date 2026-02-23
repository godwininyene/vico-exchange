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
import VtuTransaction from "../../components/VtuTransaction";
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

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentVtuTransactions, setRecentVtuTransactions] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [activePeriod, setActivePeriod] = useState("Monthly");

  const periods = ["Daily", "Weekly", "Monthly"];

  const [transactionVolumeData, setTransactionVolumeData] = useState({
    options: {
      chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: { categories: [] },
      tooltip: { y: { formatter: (v) => `₦${v.toLocaleString()}` } },
    },
    series: [{ name: "Transaction Volume", data: [] }],
  });

  const [userGrowthData, setUserGrowthData] = useState({
    options: {
      chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: { categories: [] },
    },
    series: [{ name: "New Users", data: [] }],
  });

  const [transactionTypeData, setTransactionTypeData] = useState({
    options: {
      chart: { type: "donut" },
      labels: [],
      legend: { position: "bottom" },
      dataLabels: { enabled: false },
    },
    series: [],
  });

  const fetchRecentTransactions = async () => {
    setLoadingRecent(true);
    try {
      const res = await axios.get("api/v1/transactions/recent");
      if (res.data.status === "success") {
        setRecentTransactions(res.data.data.transactions);
      }
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
    } finally {
      setLoadingPending(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/v1/stats/admin");
      if (res.data.status === "success") {
        setStats(res.data.data.stats);
        setRecentVtuTransactions(res.data.data.recentVtuTransactions || []);
      }
    } catch {
      toast.error("Failed to fetch admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (period = "monthly") => {
    setChartLoading(true);
    try {
      const res = await axios.get(`api/v1/stats/admin/charts?period=${period}`);
      if (res.data.status === "success") {
        const data = res.data.data;

        setTransactionVolumeData((prev) => ({
          ...prev,
          options: {
            ...prev.options,
            xaxis: { categories: data.transactionVolume.map((i) => i.date) },
          },
          series: [{ name: "Transaction Volume", data: data.transactionVolume.map((i) => Number(i.totalAmount)) }],
        }));

        setUserGrowthData((prev) => ({
          ...prev,
          options: {
            ...prev.options,
            xaxis: { categories: data.userGrowth.map((i) => i.date) },
          },
          series: [{ name: "New Users", data: data.userGrowth.map((i) => Number(i.newUsers)) }],
        }));

        setTransactionTypeData({
          options: { ...transactionTypeData.options, labels: data.transactionTypes.map((i) => `${i.assetType} ${i.transactionType}`) },
          series: data.transactionTypes.map((i) => Number(i.count)),
        });
      }
    } catch {
      toast.error("Failed to fetch charts");
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

  return (
    <div className="pb-10">
      <PageHeader
        primaryHeader="Admin Dashboard"
        secondaryHeader="Overview of platform activities and metrics"
      />

      {/* Stats */}
      <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} loading={loading} />
        ))}
      </div>

      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* VTU Transactions */}
          <SectionContainer
            title="Recent VTU Transactions"
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
            title="Recent Trading Transactions"
            actionButton={<Link to="/admin/transactions" className="text-sm text-primary-dark hover:underline">View All</Link>}
          >
            {loadingRecent ? <Loader size={8} /> : recentTransactions.length ? (
              recentTransactions.map((tx) => (
                <Transaction key={tx.id} transaction={tx} variant="dashboard" context="admin" />
              ))
            ) : <EmptyMessage message="No recent transactions found" />}
          </SectionContainer>


        </div>

        <SectionContainer title="Pending Actions">
          {loadingPending ? <Loader size={8} /> : pendingTransactions.length ? (
            pendingTransactions.map((tx) => (
              <PendingActionCard key={tx.id} transaction={tx} />
            ))
          ) : <EmptyMessage message="No pending transactions found" />}
        </SectionContainer>
      </div>

      {/* Platform Metrics (RESTORED) */}
      <div className="container mx-auto mt-10">
        <SectionContainer title="Platform Metrics">
          <MetricsHeader
            periods={periods}
            activePeriod={activePeriod}
            onPeriodChange={(p) => {
              setActivePeriod(p);
              fetchChartData(p.toLowerCase());
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ChartContainer title="Transaction Volume" loading={chartLoading} className="lg:col-span-2">
              <Chart options={transactionVolumeData.options} series={transactionVolumeData.series} type="area" height={320} />
            </ChartContainer>

            <ChartContainer title="User Growth" loading={chartLoading}>
              <Chart options={userGrowthData.options} series={userGrowthData.series} type="line" height={320} />
            </ChartContainer>
          </div>

          <div className="mt-8">
            <ChartContainer title="Transaction Types" loading={chartLoading}>
              <Chart options={transactionTypeData.options} series={transactionTypeData.series} type="donut" height={320} />
            </ChartContainer>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Dashboard;