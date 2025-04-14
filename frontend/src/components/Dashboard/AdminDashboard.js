import React, { useState, useEffect } from 'react';
import { getAdminDashboardData, getUsersAdmin, getStoresAdminList, addUserAdmin, addStoreAdmin } from '../../services/api';

function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
    const [newStore, setNewStore] = useState({ name: '', address: '', ownerId: '' });

    useEffect(() => {
        fetchDashboardData();
        fetchUsers();
        fetchStores();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await getAdminDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch dashboard data');
        }
    };

    const fetchUsers = async (params = {}) => {
        try {
            const data = await getUsersAdmin(params);
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
        }
    };

    const fetchStores = async (params = {}) => {
        try {
            const data = await getStoresAdminList(params);
            setStores(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch stores');
        }
    };

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleNewStoreChange = (e) => {
        setNewStore({ ...newStore, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await addUserAdmin(newUser);
            setNewUser({ name: '', email: '', password: '', role: 'user' });
            fetchUsers();
            alert('User added successfully!');
        } catch (err) {
            setError(err.message || 'Failed to add user');
        }
    };

    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            await addStoreAdmin(newStore);
            setNewStore({ name: '', address: '', ownerId: '' });
            fetchStores();
            alert('Store added successfully!');
        } catch (err) {
            setError(err.message || 'Failed to add store');
        }
    };

    if (!dashboardData) {
        return <div>Loading admin dashboard data...</div>;
    }

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h3>Overview</h3>
                <p>Total Users: {dashboardData.userCount}</p>
                <p>Total Stores: {dashboardData.storeCount}</p>
                <p>Total Ratings: {dashboardData.ratingCount}</p>
            </div>

            <div>
                <h3>Users</h3>
                {users.map(user => (
                    <p key={user.id}>{user.name} ({user.email}) - {user.role}</p>
                ))}
                {/* Implement user management UI (edit, delete) */}
            </div>

            <div>
                <h3>Stores</h3>
                {stores.map(store => (
                    <p key={store.id}>{store.name} - {store.address} (Owner ID: {store.ownerId})</p>
                ))}
                {/* Implement store management UI (edit, delete) */}
            </div>

            <div>
                <h3>Add New User</h3>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleNewUserChange} required minLength="2" maxLength="60" />
                    <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleNewUserChange} required />
                    <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleNewUserChange} required minLength="6" maxLength="16" />
                    <select name="role" value={newUser.role} onChange={handleNewUserChange}>
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Add User</button>
                </form>
            </div>

            <div>
                <h3>Add New Store</h3>
                <form onSubmit={handleAddStore}>
                    <input type="text" name="name" placeholder="Name" value={newStore.name} onChange={handleNewStoreChange} required minLength="2" maxLength="100" />
                    <input type="text" name="address" placeholder="Address" value={newStore.address} onChange={handleNewStoreChange} maxLength="400" />
                    <input type="number" name="ownerId" placeholder="Owner ID" value={newStore.ownerId} onChange={handleNewStoreChange} required />
                    <button type="submit">Add Store</button>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;
