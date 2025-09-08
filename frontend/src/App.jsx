import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();
  return token && user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

const Nav = () => {
  const { token, user, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <Link to="/dashboard">Dashboard</Link>}
      {token && user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      <div className="spacer" />
      {token && (
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<div className="container"><div className="card"><div className="card-header">Welcome</div><div className="muted">Bank Info Management</div></div></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </AuthProvider>
  );
}


