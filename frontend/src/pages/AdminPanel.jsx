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
    <div style={{ padding: 16 }}>
      <h2>Admin: All Bank Accounts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 12 }}>
        <input placeholder="Search all" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
        <input placeholder="Bank name" value={filters.bankName} onChange={(e) => setFilters({ ...filters, bankName: e.target.value })} />
        <input placeholder="IFSC" value={filters.ifsc} onChange={(e) => setFilters({ ...filters, ifsc: e.target.value })} />
        <input placeholder="Username" value={filters.username} onChange={(e) => setFilters({ ...filters, username: e.target.value })} />
        <input placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
      </div>
      <button onClick={load}>Apply Filters</button>

      <div style={{ marginTop: 16 }}>
        {items.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
            <div style={{ fontWeight: 'bold' }}>{item.bankName} - {item.branchName}</div>
            <div>IFSC: {item.ifscCode} | Account: {item.accountNumber}</div>
            <div>Holder: {item.accountHolderName}</div>
            <div>User: {item.user?.username} ({item.user?.email}) [{item.user?.role}]</div>
          </div>
        ))}
      </div>
    </div>
  );
}


