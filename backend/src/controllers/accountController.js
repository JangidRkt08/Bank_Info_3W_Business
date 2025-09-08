import BankAccount from '../models/BankAccount.js';
import { bankAccountSchema, parseOrError } from '../utils/validators.js';

export const listMyAccounts = async (req, res) => {
  const accounts = await BankAccount.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(accounts);
};

export const createAccount = async (req, res) => {
  const parsed = parseOrError(bankAccountSchema, req.body);
  if (!parsed.ok) return res.status(400).json({ message: parsed.message });
  const account = await BankAccount.create({ ...parsed.data, user: req.user.id });
  res.status(201).json(account);
};

export const updateAccount = async (req, res) => {
  const parsed = parseOrError(bankAccountSchema, req.body);
  if (!parsed.ok) return res.status(400).json({ message: parsed.message });
  const updated = await BankAccount.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    parsed.data,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Account not found' });
  res.json(updated);
};

export const deleteAccount = async (req, res) => {
  const deleted = await BankAccount.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Account not found' });
  res.json({ message: 'Deleted' });
};


