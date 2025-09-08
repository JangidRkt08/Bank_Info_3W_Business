import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ username, email, password });
      nav('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <div className="card-header">Create an account</div>
        <form onSubmit={onSubmit} className="grid">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          {error && <div className="error">{error}</div>}
          <div>
            <button type="submit" className="btn btn-primary">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}


