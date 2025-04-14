
import React, { useState } from 'react';
import { updatePassword } from '../../services/api';

function UserDashboard() {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            await updatePassword(newPassword);
            setNewPassword('');
            setSuccessMessage('Password updated successfully!');
        } catch (err) {
            setError(err.message || 'Failed to update password');
        }
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <div>
                <h3>Update Password</h3>
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

            {/* Display user-specific information or actions */}
        </div>
    );
}

export default UserDashboard;