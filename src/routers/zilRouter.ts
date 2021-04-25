import { Router } from 'express';
import ZilController from '../controllers/zilController';

const router = Router();
const zilController = new ZilController();

router.get('/pools', zilController.getPool);
router.get('/tokens', zilController.getTokens);

export default router;
