import express from 'express';
import { 
  getAllTaxPayments, 
  addTaxPayment, 
  updateTaxPayment, 
  removeTaxPayment 
} from '../controllers/taxPaymentController.js';

const router = express.Router();

router.get('/', getAllTaxPayments);
router.post('/', addTaxPayment);
router.put('/:id', updateTaxPayment);
router.delete('/:id', removeTaxPayment);

export default router;