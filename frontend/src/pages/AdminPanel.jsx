import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ q: '', bankName: '', ifsc: '', username: '', email: '' });

  const load = async () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v));
    const res = await api.get('/admin/accounts', { params });
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">Admin: All Bank Accounts</div>
        <div className="grid cols-3" style={{ marginBottom: 12 }}>
          <input placeholder="Search all" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
          <input placeholder="Bank name" value={filters.bankName} onChange={(e) => setFilters({ ...filters, bankName: e.target.value })} />
          <input placeholder="IFSC" value={filters.ifsc} onChange={(e) => setFilters({ ...filters, ifsc: e.target.value })} />
          <input placeholder="Username" value={filters.username} onChange={(e) => setFilters({ ...filters, username: e.target.value })} />
          <input placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
          <button onClick={load} className="btn btn-primary">Apply Filters</button>
        </div>
      </div>

      <div className="list">
        {items.map((item) => (
          <div key={item._id} className="card">
            <div className="card-header">{item.bankName} <span className="muted">- {item.branchName}</span></div>
            <div className="muted">IFSC: {item.ifscCode} | Account: {item.accountNumber}</div>
            <div className="muted">Holder: {item.accountHolderName}</div>
            <div className="muted">User: {item.user?.username} ({item.user?.email}) [{item.user?.role}]</div>
          </div>
        ))}
      </div>
    </div>
  );
}


