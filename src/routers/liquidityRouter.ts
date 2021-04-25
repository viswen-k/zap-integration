import { Router } from 'express';
import LiquidityController from '../controllers/liquidityController';

const router = Router();
const liquidityController = new LiquidityController();

router.get('/list', liquidityController.get);

export default router;
