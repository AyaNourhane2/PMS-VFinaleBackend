import express from 'express';
import { 
  getAllPayments, 
  addPayment, 
  removePayment 
} from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', getAllPayments);
router.post('/', addPayment);
router.delete('/:id', removePayment);

export default router;