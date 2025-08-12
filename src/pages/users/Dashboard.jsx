import { FiActivity, FiCreditCard, FiDollarSign, FiTrendingUp, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { BsCurrencyExchange } from 'react-icons/bs';

const Dashboard = () => {
  // Mock data - replace with your actual data
  const accountBalance = 12500.75;
  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 500, description: 'Gift Card Sale', date: '2023-05-15' },
    { id: 2, type: 'withdrawal', amount: 120, description: 'BTC Purchase', date: '2023-05-14' },
    { id: 3, type: 'deposit', amount: 750, description: 'ETH Sale', date: '2023-05-12' },
    { id: 4, type: 'withdrawal', amount: 300, description: 'Amazon Gift Card', date: '2023-05-10' },
  ];

  const stats = [
    { title: "Total Assets", value: "$12,500.75", change: "+5.2%", icon: <FiDollarSign size={24} /> },
    { title: "Crypto Holdings", value: "$8,200.00", change: "+12.1%", icon: <BsCurrencyExchange size={24} /> },
    { title: "Gift Card Balance", value: "$4,300.75", change: "-2.3%", icon: <FiCreditCard size={24} /> },
    { title: "Monthly Growth", value: "+$1,250.50", change: "+8.7%", icon: <FiTrendingUp size={24} /> },
  ];

  return (
    <div className="pb-10">
      {/* Hero Section with Curved Design */}
      <div className="relative rounded-tl-2xl rounded-tr-2xl bg-gradient-to-r from-primary-dark  to-primary-light text-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-t-3xl bg-white dark:bg-gray-900 pt-6 pb-8 px-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Here's your financial overview</p>
            
            {/* Account Balance Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100">Total Balance</p>
                  <h2 className="text-3xl font-bold text-white mt-1">${accountBalance.toLocaleString()}</h2>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <FiActivity className="text-white" size={24} />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Quick Trade
                </button>
                <button className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  View Details
                </button>
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
              <p className={`mt-3 text-sm flex items-center ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change.startsWith('+') ? (
                  <FiArrowUp className="mr-1" />
                ) : (
                  <FiArrowDown className="mr-1" />
                )}
                {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
       <div className="container mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-full mb-2">
              <FiDollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sell Gift Card</span>
          </button>
          
          <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full mb-2">
              <BsCurrencyExchange size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Buy Crypto</span>
          </button>
          
          <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-full mb-2">
              <FiCreditCard size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Buy Gift Card</span>
          </button>
          
          <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-xl shadow-sm transition-colors flex flex-col items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 p-3 rounded-full mb-2">
              <FiTrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sell Crypto</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="container mx-auto px-4 mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Transactions</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${
                      transaction.type === 'deposit' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <FiArrowDown size={20} />
                      ) : (
                        <FiArrowUp size={20} />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-800 dark:text-white">{transaction.description}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-right ${
                    transaction.type === 'deposit' 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    <p className="font-medium">
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.type === 'deposit' ? 'Credit' : 'Debit'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <button className="text-primary-dark dark:text-primary-light hover:underline font-medium">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;