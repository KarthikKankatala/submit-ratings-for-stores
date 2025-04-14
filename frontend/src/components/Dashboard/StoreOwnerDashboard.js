
import React, { useState, useEffect } from 'react';
import { getOwnerDashboardData, updateOwnerPassword } from '../../services/api';

function StoreOwnerDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePasswordError, setUpdatePasswordError] = useState('');
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await getOwnerDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch dashboard data');
        }
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setUpdatePasswordError('');
        setUpdatePasswordSuccess('');
        try {
            await updateOwnerPassword(newPassword);
            setNewPassword('');
            setUpdatePasswordSuccess('Password updated successfully!');
        } catch (err) {
            setUpdatePasswordError(err.message || 'Failed to update password');
        }
    };

    if (!dashboardData) {
        return <div>Loading dashboard data...</div>;
    }

    return (
        <div>
            <h2>Store Owner Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {dashboardData.store && (
                <div>
                    <h3>Your Store: {dashboardData.store.name}</h3>
                    <p>Address: {dashboardData.store.address}</p>
                    <p>Average Rating: {dashboardData.averageRating ? dashboardData.averageRating.toFixed(2) : 'No ratings yet'}</p>

                    <h4>Recent Ratings:</h4>
                    {dashboardData.ratings && dashboardData.ratings.length > 0 ? (
                        <ul>
                            {dashboardData.ratings.map(rating => (
                                <li key={`${rating.userId}-${dashboardData.store.id}`}>
                                    {rating.userName}: {rating.rating}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ratings received yet.</p>
                    )}
                </div>
            )}

            <div>
                <h3>Update Password</h3>
                {updatePasswordError && <p style={{ color: 'red' }}>{updatePasswordError}</p>}
                {updatePasswordSuccess && <p style={{ color: 'green' }}>{updatePasswordSuccess}</p>}
                <form onSubmit={handleUpdatePassword}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength="6"
                        maxLength="16"
                    />
                    <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
}

export default StoreOwnerDashboard;