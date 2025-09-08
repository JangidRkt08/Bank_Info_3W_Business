import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    ifscCode: { type: String, required: true, trim: true },
    branchName: { type: String, required: true, trim: true },
    bankName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    accountHolderName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

bankAccountSchema.index({ bankName: 1, ifscCode: 1 });

export default mongoose.model('BankAccount', bankAccountSchema);


