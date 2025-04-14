import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let data;
            if (isLogin) {
                data = await loginUser({ email, password });
                login(data.token, data.user);
                navigate(data.user.role === 'admin' ? '/admin/dashboard' : data.user.role === 'owner' ? '/owner/dashboard' : '/');
            } else {
                await signupUser({ name, email, password });
                alert('Signup successful! Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAuth}>
                {!isLogin && (
                    <div>
                        <label>Name (2-60 characters):</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} minLength="2" maxLength="60" required />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password (6-16 characters):</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" maxLength="16" required />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </p>
        </div>
    );
}

export default Auth;