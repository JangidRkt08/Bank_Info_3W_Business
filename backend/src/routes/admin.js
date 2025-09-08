import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { listAllAccounts } from '../controllers/adminController.js';

const router = Router();

router.use(authenticate, requireAdmin);
router.get('/accounts', listAllAccounts);

export default router;


