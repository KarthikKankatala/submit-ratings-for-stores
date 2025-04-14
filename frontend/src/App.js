
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StoreOwnerDashboardPage from './pages/StoreOwnerDashboardPage';
import StoreListPage from './pages/StoreListPage';
import StoreDetailPage from './pages/StoreDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout/Layout';
import { AuthProvider, useAuth } from './hooks/useAuth';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/stores" element={<Layout><StoreListPage /></Layout>} /> {/* Changed path to /stores */}
                    <Route path="/stores/:id" element={<Layout><StoreDetailPage /></Layout>} />
                    <Route path="/user/dashboard" element={<ProtectedRoute><Layout><UserDashboardPage /></Layout></ProtectedRoute>} />
                    <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><Layout><AdminDashboardPage /></Layout></ProtectedRoute>} />
                    <Route path="/owner/dashboard" element={<ProtectedRoute roles={['owner']}><Layout><StoreOwnerDashboardPage /></Layout></ProtectedRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

function ProtectedRoute({ children, roles }) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />; // Or a dedicated unauthorized page
    }
    return children;
}

export default App;