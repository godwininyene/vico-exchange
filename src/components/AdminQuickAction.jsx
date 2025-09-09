// import { FiUsers, FiCreditCard, FiShield, FiSettings, FiDollarSign, FiTrendingUp } from "react-icons/fi";
// import { BsCurrencyExchange } from "react-icons/bs";
// import { RiExchangeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const AdminQuickAction = ({ Icon, label, url = '/', color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400',
    gray: 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
  };
  return (
    <Link to={url} className="cursor-pointer">
      <button className={`cursor-pointer p-4 rounded-xl flex flex-col items-center transition-colors w-full ${colorClasses[color]}`}>
        <Icon className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </Link>
  );
};

export default AdminQuickAction



// Main Demo Component
// export default function QuickActionsDemo() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
//           Quick Actions Components
//         </h1>
        
//         {/* Admin Quick Actions */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mt-8">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Quick Actions</h2>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4 p-6">
//             <AdminQuickAction 
//               Icon={FiUsers}
//               label="Manage Users" 
//               url="/admin/users"
//               color="blue"
//             />
            
//             <AdminQuickAction 
//               Icon={FiCreditCard}
//               label="Gift Cards" 
//               url="/admin/gift-cards"
//               color="green"
//             />
            
//             <AdminQuickAction 
//               Icon={BsCurrencyExchange}
//               label="Crypto" 
//               url="/admin/crypto"
//               color="purple"
//             />
            
//             <AdminQuickAction 
//               Icon={RiExchangeLine}
//               label="Transactions" 
//               url="/admin/transactions"
//               color="yellow"
//             />
            
//             <AdminQuickAction 
//               Icon={FiShield}
//               label="Security" 
//               url="/admin/security"
//               color="red"
//             />
            
//             <AdminQuickAction 
//               Icon={FiSettings}
//               label="Settings" 
//               url="/admin/settings"
//               color="gray"
//             />
//           </div>
//         </div>

//         {/* User Quick Actions */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mt-8">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Quick Actions</h2>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
//             <UserQuickAction 
//               Icon={FiDollarSign}
//               label="Sell Gift Card" 
//               url="/sell-gift-card"
//               color="blue"
//             />
            
//             <UserQuickAction 
//               Icon={BsCurrencyExchange}
//               label="Buy Crypto" 
//               url="/buy-crypto"
//               color="green"
//             />
            
//             <UserQuickAction 
//               Icon={FiCreditCard}
//               label="Buy Gift Card" 
//               url="/buy-gift-card"
//               color="purple"
//             />
            
//             <UserQuickAction 
//               Icon={FiTrendingUp}
//               label="Sell Crypto" 
//               url="/sell-crypto"
//               color="yellow"
//             />
//           </div>
//         </div>
        
//         <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
//           <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Implementation Notes</h3>
//           <p className="text-blue-700 dark:text-blue-300 text-sm">
//             These components are now properly implemented. The AdminQuickAction and UserQuickAction components 
//             accept Icon as a component (not JSX), and color as a string to determine the styling.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }