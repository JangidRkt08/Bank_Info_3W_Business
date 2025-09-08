import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

const empty = { ifscCode: '', branchName: '', bankName: '', accountNumber: '', accountHolderName: '' };

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    const res = await api.get('/accounts');
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/accounts/${editingId}`, form);
      } else {
        await api.post('/accounts', form);
      }
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({ ifscCode: item.ifscCode, branchName: item.branchName, bankName: item.bankName, accountNumber: item.accountNumber, accountHolderName: item.accountHolderName });
  };

  const remove = async (id) => {
    await api.delete(`/accounts/${id}`);
    await load();
  };

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">My Bank Accounts</div>
        <form onSubmit={submit} className="form-grid" style={{ maxWidth: 920 }}>
          <input placeholder="IFSC Code" value={form.ifscCode} onChange={(e) => setForm({ ...form, ifscCode: e.target.value })} />
          <input placeholder="Branch Name" value={form.branchName} onChange={(e) => setForm({ ...form, branchName: e.target.value })} />
          <input placeholder="Bank Name" value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} />
          <input placeholder="Account Number" value={form.accountNumber} onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} />
          <input placeholder="Account Holder Name" value={form.accountHolderName} onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })} />
          <div className="form-actions">
            {error && <div className="error" style={{ marginRight: 8 }}>{error}</div>}
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Account</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty); }} className="btn btn-secondary">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="list">
        {items.map((item) => (
          <div key={item._id} className="card">
            <div className="card-header">{item.bankName} <span className="muted">- {item.branchName}</span></div>
            <div className="muted">IFSC: {item.ifscCode}</div>
            <div className="muted">Account: {item.accountNumber} | Holder: {item.accountHolderName}</div>
            <div className="item-actions" style={{ marginTop: 8 }}>
              <button onClick={() => edit(item)} className="btn btn-secondary">Edit</button>
              <button onClick={() => remove(item._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


