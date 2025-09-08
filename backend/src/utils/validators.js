import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const bankAccountSchema = z.object({
  ifscCode: z.string().trim().min(1),
  branchName: z.string().trim().min(1),
  bankName: z.string().trim().min(1),
  accountNumber: z.string().trim().min(1),
  accountHolderName: z.string().trim().min(1),
});

export const parseOrError = (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = result.error.issues.map(i => `${i.path.join('.')} ${i.message}`).join(', ');
    return { ok: false, message: msg };
  }
  return { ok: true, data: result.data };
};


