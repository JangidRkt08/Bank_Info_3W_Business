import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema, registerSchema, parseOrError } from '../utils/validators.js';

const issueToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const parsed = parseOrError(registerSchema, req.body);
  if (!parsed.ok) return res.status(400).json({ message: parsed.message });
  const { username, email, password } = parsed.data;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const role = email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase() ? 'admin' : 'user';
    const user = await User.create({ username, email, password: hash, role });
    const token = issueToken(user);
    res.status(201).json({ token, user: { id: user._id, username, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const parsed = parseOrError(loginSchema, req.body);
  if (!parsed.ok) return res.status(400).json({ message: parsed.message });
  const { email, password } = parsed.data;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = issueToken(user);
    res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};


