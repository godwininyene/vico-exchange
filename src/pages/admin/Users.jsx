import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DataFilters from "../../components/DataFilters";
import { userStatusFilterOptions } from "../../data";
import UsersList from "../../components/UsersList";
import Modal from "../../components/Modal";
import UserDetail from "../../components/UserDetail";
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import axios from './../../lib/axios';
import { toast } from 'react-toastify';
import Loader from "../../components/Loader";

const Users = () => {
  // State for filters, pagination, and selected user
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { pagination, updatePagination } = usePagination();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [updating, setUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetch users with filters
  const fetchUsers = async (page = 1, search = '', status = '') => {
    setLoading(true); // Set loading to true when fetching starts
    let url = `api/v1/users?page=${page}&limit=${pagination.perPage}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    if (status && status !== 'all') {
      url += `&status=${status}`;
    }
    
    try {
      const res = await axios.get(url);
      if (res.data.status === 'success') {
        setUsers(res.data.data.users);
        updatePagination({
          currentPage: res.data.pagination.currentPage,
          totalPages: res.data.pagination.totalPages,
          totalItems: res.data.pagination.totalItems
        });
      }
      
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Apply filters and search
  useEffect(() => {
    fetchUsers(
      1,
      debouncedSearchQuery,
      statusFilter === 'all' ? '' : statusFilter,
    );
  }, [statusFilter, debouncedSearchQuery]);

  // Open user details modal
  const openUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // Close modal
  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  // Update user's status
  const updateAccountStatus = async (status, user) => {
    if (!window.confirm(`Are you sure you want to ${status} this account?`)) return;
    try {
      setUpdating(true);
      const res = await axios.patch(`api/v1/users/${user.id}/status`, { status });
      if (res.data.status === 'success') {
        // Refresh the list after successful operation
        await fetchUsers(
          1,
          searchQuery,
          statusFilter === 'all' ? '' : statusFilter,
        );
        toast.success(`User's status changed successfully!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
      console.error(error);
    } finally {
      setUpdating(false);
      closeUserModal();
    }
  };

  // Delete user function
  const deleteUser = async () => {
    if (!selectedUser) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedUser.firstName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await axios.delete(`api/v1/users/${selectedUser.id}`);
      
      if (res.status === 204) {
        toast.success('User deleted successfully!');
        // Refresh the users list
        await fetchUsers(
          1,
          searchQuery,
          statusFilter === 'all' ? '' : statusFilter,
        );
        
        closeUserModal();
      }
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error(
        error.response?.data?.message || 
        error.response?.data?.error || 
        'Failed to delete user. Please try again.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="pb-10">
      {/* User Details Modal */}
      {isUserModalOpen && selectedUser && (
        <Modal
          isOpen={isUserModalOpen}
          closeModal={closeUserModal}
          header={`User Details - ${selectedUser.id}`}
        >
          <UserDetail
            user={selectedUser}
            onDeleteUser={deleteUser}
            onStatusChange={updateAccountStatus}
            updating={updating}
            isDeleting={isDeleting}
          />
        </Modal>
      )}

      {/* Header and Actions */}
      <PageHeader
        primaryHeader={"User Management"}
        secondaryHeader={"View and manage all registered users"}
      />

      {/* Filters and Search */}
      <DataFilters
        filterHeader={"Users"}
        searchQuery={searchQuery}
        onSearchSubmit={(e) => e.preventDefault()}
        filters={[
          {
            type: "input",
            placeholder: "Search users...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
          },
          {
            type: "select",
            label: "Status",
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            options: userStatusFilterOptions,
          },
        ]}
      />

      {/* Users Table with Loader */}
      {loading ? (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-96 flex items-center justify-center">
            <Loader size={8} />
          </div>
        </div>
      ) : (
        <UsersList
          users={users}
          onOpenUserDetails={openUserDetails}
        />
      )}
    </div>
  );
};

export default Users;