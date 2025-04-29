import express from 'express';
import { getInventoryOrders, addInventoryOrder } from '../controllers/inventoryOrderController.js';

const router = express.Router();

router.get('/orders', getInventoryOrders);
router.post('/orders', addInventoryOrder);

export default router;