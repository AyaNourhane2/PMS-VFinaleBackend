import express from 'express';
import { 
  getAllInvoices, 
  addInvoice, 
  updateInvoice, 
  removeInvoice 
} from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/', getAllInvoices);
router.post('/', addInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', removeInvoice);

export default router;