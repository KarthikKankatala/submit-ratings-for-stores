import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Layout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Stores</Link>
                    </li>
                    {user && user.role === 'user' && (
                        <li>
                            <Link to="/user/dashboard">Dashboard</Link>
                        </li>
                    )}
                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/dashboard">Admin</Link>
                        </li>
                    )}
                    {user && user.role === 'owner' && (
                        <li>
                            <Link to="/owner/dashboard">Owner Dashboard</Link>
                        </li>
                    )}
                    {user ? (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/auth">Login/Signup</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Store Rating App</p>
            </footer>
        </div>
    );
}

export default Layout;