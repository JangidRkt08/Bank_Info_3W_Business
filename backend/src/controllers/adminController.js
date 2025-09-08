import BankAccount from '../models/BankAccount.js';
import User from '../models/User.js';

export const listAllAccounts = async (req, res) => {
  const { q, bankName, ifsc, username, email } = req.query;

  const userFilter = {};
  if (username) userFilter.username = new RegExp(username, 'i');
  if (email) userFilter.email = new RegExp(email, 'i');

  let userIds;
  if (Object.keys(userFilter).length) {
    const users = await User.find(userFilter).select('_id');
    userIds = users.map((u) => u._id);
  }

  const filter = {};
  if (userIds) filter.user = { $in: userIds };
  if (bankName) filter.bankName = new RegExp(bankName, 'i');
  if (ifsc) filter.ifscCode = new RegExp(ifsc, 'i');
  if (q) {
    filter.$or = [
      { bankName: new RegExp(q, 'i') },
      { ifscCode: new RegExp(q, 'i') },
      { branchName: new RegExp(q, 'i') },
      { accountHolderName: new RegExp(q, 'i') },
      { accountNumber: new RegExp(q, 'i') },
    ];
  }

  const results = await BankAccount.find(filter)
    .populate('user', 'username email role')
    .sort({ createdAt: -1 });

  res.json(results);
};


