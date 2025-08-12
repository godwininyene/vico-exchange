import { FiUsers, FiDollarSign, FiCreditCard, FiActivity, FiTrendingUp, FiPackage, FiShield, FiSettings, FiCheck, FiClock, FiX } from 'react-icons/fi';
import { BsCurrencyExchange, BsGraphUp } from 'react-icons/bs';
import { RiExchangeLine } from 'react-icons/ri';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const stats = [
    { title: "Total Users", value: "1,248", change: "+12.5%", icon: <FiUsers size={24} /> },
    { title: "Total Transactions", value: "₦48,750,320", change: "+8.2%", icon: <FiActivity size={24} /> },
    { title: "Gift Card Volume", value: "₦12,450,500", change: "+5.7%", icon: <FiCreditCard size={24} /> },
    { title: "Crypto Volume", value: "₦36,299,820", change: "+14.3%", icon: <BsCurrencyExchange size={24} /> },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "Sold Amazon Gift Card", amount: "₦24,000", time: "2 mins ago", status: "completed" },
    { id: 2, user: "Jane Smith", action: "BTC Purchase", amount: "₦450,000", time: "15 mins ago", status: "pending" },
    { id: 3, user: "Mike Johnson", action: "ETH Sale", amount: "₦320,500", time: "32 mins ago", status: "completed" },
    { id: 4, user: "Sarah Williams", action: "Added Bank Account", amount: "", time: "1 hour ago", status: "completed" },
    { id: 5, user: "David Brown", action: "Google Play Gift Card", amount: "₦15,750", time: "2 hours ago", status: "failed" },
  ];

  const pendingActions = [
    { id: 1, type: "Gift Card", user: "Jane Smith", amount: "₦24,000", time: "15 mins ago" },
    { id: 2, type: "Withdrawal", user: "Robert Taylor", amount: "₦150,000", time: "42 mins ago" },
    { id: 3, type: "KYC Verification", user: "Emily Davis", amount: "", time: "1 hour ago" },
  ];

  // Chart data for transaction volume
  const transactionVolumeOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#4F46E5'], // Using primary color
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        },
        formatter: (value) => { return `₦${(value / 1000).toFixed(0)}k` }
      }
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      y: {
        formatter: (value) => { return `₦${value.toLocaleString()}` }
      }
    }
  };

  const transactionVolumeSeries = [{
    name: 'Transaction Volume',
    data: [1500000, 1800000, 2100000, 1750000, 2200000, 2500000, 2800000, 3000000, 2700000, 3200000, 3500000, 4000000]
  }];

  // Chart data for user growth
  const userGrowthOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#10B981'], // Using success color
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  const userGrowthSeries = [{
    name: 'New Users',
    data: [120, 150, 180, 200, 220, 250, 280, 300, 280, 320, 350, 400]
  }];

  // Chart data for transaction types
  const transactionTypeOptions = {
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Gift Cards', 'Crypto Purchases', 'Crypto Sales', 'Withdrawals'],
    colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
    legend: {
      position: 'bottom'
    },
    plotOptions: {
    
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Transactions',
              formatter: () => '₦48.7M'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const transactionTypeSeries = [12450, 18300, 12500, 5500];

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900  py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Overview of platform activities and metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto  mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</h3>
                </div>
                <div className="bg-primary-dark/10 text-primary-dark dark:bg-primary-light/10 dark:text-primary-light rounded-full p-3">
                  {stat.icon}
                </div>
              </div>
              <p className={`mt-3 text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto  mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activities</h2>
              <button className="text-sm text-primary-dark dark:text-primary-light hover:underline">
                View All
              </button>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {activity.status === 'completed' ? (
                          <FiCheck size={16} />
                        ) : activity.status === 'pending' ? (
                          <FiClock size={16} />
                        ) : (
                          <FiX size={16} />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{activity.user}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <p className="font-medium text-gray-800 dark:text-white">{activity.amount}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Pending Actions</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {pendingActions.map((action) => (
                <div key={action.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{action.type}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{action.user}</p>
                    </div>
                    <div className="text-right">
                      {action.amount && (
                        <p className="font-medium text-gray-800 dark:text-white">{action.amount}</p>
                      )}
                      <button className="text-xs bg-primary-dark hover:bg-primary-light text-white px-3 py-1 rounded-full">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mt-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-6">
              <button className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 p-4 rounded-xl flex flex-col items-center transition-colors">
                <FiUsers className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
              
              <button className="bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400 p-4 rounded-xl flex flex-col items-center transition-colors">
                <FiCreditCard className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Gift Cards</span>
              </button>
              
              <button className="bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-600 dark:text-purple-400 p-4 rounded-xl flex flex-col items-center transition-colors">
                <BsCurrencyExchange className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Crypto</span>
              </button>
              
              <button className="bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 p-4 rounded-xl flex flex-col items-center transition-colors">
                <RiExchangeLine className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Transactions</span>
              </button>
              
              <button className="bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 p-4 rounded-xl flex flex-col items-center transition-colors">
                <FiShield className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Security</span>
              </button>
              
              <button className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-4 rounded-xl flex flex-col items-center transition-colors">
                <FiSettings className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className=" mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Platform Metrics</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">Daily</button>
              <button className="px-3 py-1 text-sm bg-primary-dark dark:bg-primary-light text-white rounded-full">Weekly</button>
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">Monthly</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Transaction Volume (₦)</h3>
              <Chart
                options={transactionVolumeOptions}
                series={transactionVolumeSeries}
                type="area"
                height={350}
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">User Growth</h3>
              <Chart
                options={userGrowthOptions}
                series={userGrowthSeries}
                type="line"
                height={350}
              />
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Transaction Types</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <Chart
                  options={transactionTypeOptions}
                  series={transactionTypeSeries}
                  type="donut"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;