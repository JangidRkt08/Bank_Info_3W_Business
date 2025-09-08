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
    <div style={{ padding: 16 }}>
      <h2>My Bank Accounts</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 640, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <input placeholder="IFSC Code" value={form.ifscCode} onChange={(e) => setForm({ ...form, ifscCode: e.target.value })} />
        <input placeholder="Branch Name" value={form.branchName} onChange={(e) => setForm({ ...form, branchName: e.target.value })} />
        <input placeholder="Bank Name" value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} />
        <input placeholder="Account Number" value={form.accountNumber} onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} />
        <input placeholder="Account Holder Name" value={form.accountHolderName} onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })} />
        <div style={{ gridColumn: '1 / -1' }}>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <button type="submit">{editingId ? 'Update' : 'Add'} Account</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty); }} style={{ marginLeft: 8 }}>Cancel</button>}
        </div>
      </form>

      <div style={{ marginTop: 24 }}>
        {items.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8, display: 'grid', gap: 4 }}>
            <div><strong>{item.bankName}</strong> - {item.branchName}</div>
            <div>IFSC: {item.ifscCode}</div>
            <div>Account: {item.accountNumber} | Holder: {item.accountHolderName}</div>
            <div>
              <button onClick={() => edit(item)}>Edit</button>
              <button onClick={() => remove(item._id)} style={{ marginLeft: 8 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


