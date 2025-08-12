import { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiUser, 
  FiUserCheck, 
  FiUserX, 
  FiSearch, 
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheck,
  FiX,
  FiPlus,
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import { BsShieldLock } from 'react-icons/bs';

const Users = () => {
  // Mock user data - replace with API calls
  const allUsers = [
    {
      id: 'USR-1001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+2348012345678',
      status: 'active',
      kycStatus: 'verified',
      joinDate: '2023-05-15',
      lastLogin: '2023-06-15 09:30:45',
      transactions: 12,
      totalVolume: 2450000
    },
    {
      id: 'USR-1002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+2348098765432',
      status: 'active',
      kycStatus: 'pending',
      joinDate: '2023-05-10',
      lastLogin: '2023-06-14 14:20:10',
      transactions: 8,
      totalVolume: 1200000
    },
    {
      id: 'USR-1003',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+2348055512345',
      status: 'suspended',
      kycStatus: 'unverified',
      joinDate: '2023-04-22',
      lastLogin: '2023-06-10 11:15:30',
      transactions: 5,
      totalVolume: 750000
    },
    {
      id: 'USR-1004',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+2348033345678',
      status: 'active',
      kycStatus: 'verified',
      joinDate: '2023-06-01',
      lastLogin: '2023-06-15 16:45:22',
      transactions: 15,
      totalVolume: 3800000
    },
    {
      id: 'USR-1005',
      name: 'David Brown',
      email: 'david.b@example.com',
      phone: '+2348077788990',
      status: 'inactive',
      kycStatus: 'verified',
      joinDate: '2023-03-18',
      lastLogin: '2023-05-28 10:05:17',
      transactions: 3,
      totalVolume: 450000
    },
    {
      id: 'USR-1006',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+2348022298765',
      status: 'active',
      kycStatus: 'verified',
      joinDate: '2023-06-05',
      lastLogin: '2023-06-15 08:10:45',
      transactions: 20,
      totalVolume: 5200000
    },
  ];

  // State for filters, pagination, and selected user
  const [users, setUsers] = useState(allUsers);
  const [statusFilter, setStatusFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const usersPerPage = 5;

  // Apply filters and search
  useEffect(() => {
    let filtered = allUsers;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    if (kycFilter !== 'all') {
      filtered = filtered.filter(user => user.kycStatus === kycFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      )
    }
    
    setUsers(filtered);
    setCurrentPage(1);
  }, [statusFilter, kycFilter, searchQuery]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    let icon = null;
    
    switch(status) {
      case 'active':
        bgColor = 'bg-green-100 dark:bg-green-900/30';
        textColor = 'text-green-800 dark:text-green-200';
        icon = <FiUserCheck className="mr-1" />;
        break;
      case 'inactive':
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-200';
        icon = <FiUser className="mr-1" />;
        break;
      case 'suspended':
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-800 dark:text-red-200';
        icon = <FiUserX className="mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-200';
    }
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // KYC badge component
  const KYCBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';
    
    switch(status) {
      case 'verified':
        bgColor = 'bg-green-100 dark:bg-green-900/30';
        textColor = 'text-green-800 dark:text-green-200';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
        textColor = 'text-yellow-800 dark:text-yellow-200';
        break;
      case 'unverified':
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-800 dark:text-red-200';
        break;
      default:
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-200';
    }
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <BsShieldLock className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Format datetime to readable format
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Open user details modal
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditMode(false);
    setIsUserModalOpen(true);
  };

  // Close modal
  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle edit field changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Save user edits
  const saveUserEdits = () => {
    // In a real app, you would make an API call here
    const updatedUsers = allUsers.map(user => 
      user.id === editedUser.id ? editedUser : user
    );
    
    setUsers(updatedUsers);
    setSelectedUser(editedUser);
    setIsEditMode(false);
  };

  // Toggle user status
  const toggleUserStatus = () => {
    const newStatus = editedUser.status === 'active' ? 'suspended' : 'active';
    const updatedUser = { ...editedUser, status: newStatus };
    
    // In a real app, you would make an API call here
    const updatedUsers = allUsers.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    
    setUsers(updatedUsers);
    setEditedUser(updatedUser);
    setSelectedUser(updatedUser);
  };

  // Delete user
  const deleteUser = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedUser.name}?`)) {
      // In a real app, you would make an API call here
      const updatedUsers = allUsers.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      closeUserModal();
    }
  };

  return (
    <div className="pb-10">
      {/* User Details Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isEditMode ? 'Edit User' : 'User Details'} - {selectedUser.id}
              </h2>
              <button 
                onClick={closeUserModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-white">{selectedUser.name}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-white">{selectedUser.email}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      {isEditMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-white">{selectedUser.phone}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={selectedUser.status} />
                        {isEditMode && (
                          <button
                            onClick={toggleUserStatus}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              editedUser.status === 'active'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/40'
                                : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/40'
                            }`}
                          >
                            {editedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Account Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">KYC Status</p>
                      <div className="flex items-center gap-2">
                        <KYCBadge status={selectedUser.kycStatus} />
                        {selectedUser.kycStatus === 'pending' && (
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/40 rounded-lg text-sm">
                            Verify KYC
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                      <p className="text-gray-800 dark:text-white">{formatDate(selectedUser.joinDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                      <p className="text-gray-800 dark:text-white">
                        {selectedUser.lastLogin ? formatDateTime(selectedUser.lastLogin) : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
                      <p className="text-gray-800 dark:text-white">{selectedUser.transactions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
                      <p className="text-gray-800 dark:text-white">₦{selectedUser.totalVolume.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  {isEditMode ? (
                    <button
                      onClick={saveUserEdits}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
                    >
                      <FiCheck className="mr-2" /> Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={toggleEditMode}
                      className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center"
                    >
                      <FiEdit2 className="mr-2" /> Edit User
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  {isEditMode ? (
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={deleteUser}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                      >
                        <FiTrash2 className="mr-2" /> Delete User
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                        Send Message
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header and Actions */}
      <div className="bg-white dark:bg-gray-900  py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
            <p className="text-gray-600 dark:text-gray-300">View and manage all registered users</p>
          </div>
          <button className="px-4 py-2 bg-primary-dark hover:bg-primary-light text-white rounded-lg flex items-center justify-center">
            <FiPlus className="mr-2" /> Add New User
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label htmlFor="kyc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  KYC Status
                </label>
                <select
                  id="kyc"
                  value={kycFilter}
                  onChange={(e) => setKycFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="all">All KYC Statuses</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">All Users</h2>
          </div>
          
          {currentUsers.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary-dark/10 text-primary-dark dark:bg-primary-light/10 dark:text-primary-light rounded-full p-3">
                        <FiUser size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800 dark:text-white">{user.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FiMail className="mr-1" /> {user.email}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FiPhone className="mr-1" /> {user.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <StatusBadge status={user.status} />
                        <KYCBadge status={user.kycStatus} />
                      </div>
                      <button
                        onClick={() => openUserDetails(user)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center"
                      >
                        <FiEye className="mr-2" /> View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
            </div>
          )}

          {/* Pagination */}
          {users.length > usersPerPage && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FiChevronLeft className="mr-1" /> Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === number 
                          ? 'bg-primary-dark text-white dark:bg-primary-light'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;