import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { createAccount, deleteAccount, listMyAccounts, updateAccount } from '../controllers/accountController.js';

const router = Router();

router.use(authenticate);
router.get('/', listMyAccounts);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;


